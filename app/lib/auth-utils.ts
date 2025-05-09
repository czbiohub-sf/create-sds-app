import { createHash } from "crypto";
import { NextResponse } from "next/server";

export const COOKIE_CONFIG = {
  AUTH_TOKEN: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24, // 1 day
    path: "/",
    sameSite: "lax" as const,
  },
  OAUTH_STATE: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 10, // 10 minutes
    path: "/",
    sameSite: "lax" as const,
  },
};

export const UI_CONFIG = {
  POPUP: {
    width: 600,
    height: 700,
  },
  DEFAULT_PROFILE_IMAGE:
    "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg",
};

export function createCodeChallenge(verifier: string): string {
  const hash = createHash("sha256").update(verifier).digest("base64");
  return hash.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

export function createAuthResponse(
  title: string,
  message: string,
  status = 200,
) {
  return new NextResponse(
    `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${title}</title>
      </head>
      <body>
        <script>
          window.opener.postMessage('${message}', window.location.origin);
          window.close();
        </script>
      </body>
    </html>
  `,
    {
      headers: {
        "Content-Type": "text/html",
      },
      status,
    },
  );
}
