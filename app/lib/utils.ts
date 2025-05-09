/**
 * Generates a random string of specified length using characters
 * that are URL-safe (for use in PKCE and OAuth state)
 */
export function generateRandomString(length: number): string {
  const charset =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
  let result = "";
  const values = new Uint8Array(length);
  crypto.getRandomValues(values);

  for (let i = 0; i < length; i++) {
    result += charset[values[i] % charset.length];
  }

  return result;
}
