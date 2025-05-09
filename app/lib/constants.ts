export const OKTA_CLIENT_ID = process.env.AUTH_OKTA_ID!;
export const OKTA_CLIENT_SECRET = process.env.AUTH_OKTA_SECRET!;
export const OKTA_ISSUER = process.env.AUTH_OKTA_ISSUER!;
export const OKTA_CALLBACK_URL = process.env.NEXT_PUBLIC_URL
  ? `${process.env.NEXT_PUBLIC_URL}/api/auth/callback`
  : "http://localhost:3000/api/auth/callback";
export const JWT_SECRET = process.env.JWT_SECRET || "development-jwt-secret";
