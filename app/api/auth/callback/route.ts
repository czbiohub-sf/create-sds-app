import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import {
  OKTA_CLIENT_ID,
  OKTA_CLIENT_SECRET,
  OKTA_CALLBACK_URL,
  OKTA_ISSUER,
  JWT_SECRET,
} from "@/app/lib/constants";
import * as jose from "jose";
import {
  createAuthResponse,
  COOKIE_CONFIG,
  UI_CONFIG,
} from "@/app/lib/auth-utils";

const AUTH_ERROR_PREFIX = "AUTH_ERROR";
const AUTH_ERROR_TITLE = "Authentication Error";
const AUTH_ERROR_MESSAGES = {
  MISSING_CODE: `${AUTH_ERROR_PREFIX}:missing_code`,
  INVALID_STATE: `${AUTH_ERROR_PREFIX}:invalid_state`,
  TOKEN_EXCHANGE_FAILED: `${AUTH_ERROR_PREFIX}:token_exchange_failed`,
  SERVER_ERROR: `${AUTH_ERROR_PREFIX}:server_error`,
};

export async function GET(request: NextRequest) {
  try {
    const cookieStore = cookies();
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get("code");
    const state = searchParams.get("state");
    const error = searchParams.get("error");
    const errorDescription = searchParams.get("error_description");

    console.log("OAuth Callback Parameters:", {
      code: code ? "present" : "missing",
      state: state ? "present" : "missing",
      error,
      errorDescription,
      savedState: cookieStore.get("oauth_state")?.value ? "present" : "missing",
      codeVerifier: cookieStore.get("code_verifier")?.value
        ? "present"
        : "missing",
    });

    if (error) {
      console.error("OAuth error:", error, errorDescription);
      return createAuthResponse("Authentication Cancelled", "AUTH_CANCELLED");
    }

    const savedState = cookieStore.get("oauth_state")?.value;
    const codeVerifier = cookieStore.get("code_verifier")?.value;

    if (!code) {
      console.error("Missing authorization code");
      return createAuthResponse(
        AUTH_ERROR_TITLE,
        AUTH_ERROR_MESSAGES.MISSING_CODE,
      );
    }

    if (!state || !savedState || state !== savedState) {
      console.error("Invalid state parameter");
      return createAuthResponse(
        AUTH_ERROR_TITLE,
        AUTH_ERROR_MESSAGES.INVALID_STATE,
      );
    }

    const tokenResponse = await fetch(`${OKTA_ISSUER}/v1/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      body: new URLSearchParams({
        code: code,
        client_id: OKTA_CLIENT_ID,
        client_secret: OKTA_CLIENT_SECRET,
        redirect_uri: OKTA_CALLBACK_URL,
        grant_type: "authorization_code",
        code_verifier: codeVerifier || "",
      }),
    });

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.text();
      console.error("Error obtaining token:", errorData);
      return createAuthResponse(
        AUTH_ERROR_TITLE,
        AUTH_ERROR_MESSAGES.TOKEN_EXCHANGE_FAILED,
      );
    }

    const tokenData = await tokenResponse.json();
    const idToken = tokenData.id_token;

    const claims = jose.decodeJwt(idToken);

    const user = {
      id: claims.sub as string,
      name: claims.name as string,
      email: claims.email as string,
      picture: (claims.picture as string) || UI_CONFIG.DEFAULT_PROFILE_IMAGE,
    };

    const secret = new TextEncoder().encode(JWT_SECRET);
    const token = await new jose.SignJWT({ user })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("24h")
      .sign(secret);

    cookieStore.set("auth-token", token, COOKIE_CONFIG.AUTH_TOKEN);

    cookieStore.delete("oauth_state");
    cookieStore.delete("code_verifier");

    return createAuthResponse("Authentication Successful", "AUTH_SUCCESS");
  } catch (error) {
    console.error("Error in authentication callback:", error);
    return createAuthResponse(
      AUTH_ERROR_TITLE,
      AUTH_ERROR_MESSAGES.SERVER_ERROR,
      500,
    );
  }
}
