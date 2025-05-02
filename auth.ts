import NextAuth from "next-auth";
import Okta from "next-auth/providers/okta";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Okta],
});
