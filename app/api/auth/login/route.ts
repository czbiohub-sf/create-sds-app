import { NextResponse } from "next/server";
import {
  OKTA_CLIENT_ID,
  OKTA_ISSUER,
  OKTA_CALLBACK_URL,
} from "@/app/lib/constants";
import { generateRandomString } from "@/app/lib/utils";
import { createCodeChallenge, COOKIE_CONFIG } from "@/app/lib/auth-utils";

export async function GET() {
  const state = generateRandomString(32);

  const codeVerifier = generateRandomString(64);
  const codeChallenge = createCodeChallenge(codeVerifier);

  console.log("OAuth Login Parameters:", {
    clientId: OKTA_CLIENT_ID,
    redirectUri: OKTA_CALLBACK_URL,
    state,
    codeChallenge,
  });

  const response = NextResponse.redirect(
    `${OKTA_ISSUER}/v1/authorize?` +
      `response_type=code&` +
      `client_id=${OKTA_CLIENT_ID}&` +
      `redirect_uri=${encodeURIComponent(OKTA_CALLBACK_URL)}&` +
      `scope=openid%20email%20profile&` +
      `state=${state}&` +
      `code_challenge=${codeChallenge}&` +
      `code_challenge_method=S256`,
  );

  response.cookies.set("oauth_state", state, COOKIE_CONFIG.OAUTH_STATE);
  response.cookies.set(
    "code_verifier",
    codeVerifier,
    COOKIE_CONFIG.OAUTH_STATE,
  );

  return response;
}
