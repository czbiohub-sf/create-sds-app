import NextAuth from "next-auth";
import Okta from "next-auth/providers/okta";
import Credentials from "next-auth/providers/credentials";
import type { Provider } from "next-auth/providers";

// Define mock users
const mockUsers = {
  mockuser1: {
    id: "mockuser1",
    name: "Mock User One",
    email: "mock1@example.com",
  },
  mockuser2: {
    id: "mockuser2",
    name: "Mock User Two",
    email: "mock2@example.com",
  },
  mockuser3: {
    id: "mockuser3",
    name: "Mock User Three",
    email: "mock3@example.com",
  },
};

const providers: Provider[] = [Okta];

// Conditionally add Credentials provider in development
if (process.env.NODE_ENV === "development") {
  providers.push(
    Credentials({
      name: "Mock Login",
      credentials: {
        userId: { label: "User ID", type: "text", placeholder: "mockuser1" },
      },
      async authorize(credentials) {
        // Check if userId exists in mockUsers
        const userId = credentials?.userId as keyof typeof mockUsers;
        if (userId && mockUsers[userId]) {
          // Return the mock user object
          return mockUsers[userId];
        }
        // Return null if user not found
        return null;
      },
    }),
  );
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers,
});
