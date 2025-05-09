"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import * as jose from "jose";
import { JWT_SECRET } from "./constants";
import { revalidatePath } from "next/cache";

const DEFAULT_PROFILE_IMAGE = "/default-profile.jpg";
const AUTH_COOKIE_NAME = "auth-token";

export type User = {
  id: string;
  name: string;
  email: string;
  picture?: string;
  isMockUser?: boolean;
};

export const mockUsers = {
  mockuser1: {
    id: "mockuser1",
    name: "Mock User One",
    email: "mock1@example.com",
    picture: DEFAULT_PROFILE_IMAGE,
    isMockUser: true,
  },
  mockuser2: {
    id: "mockuser2",
    name: "Mock User Two",
    email: "mock2@example.com",
    picture: DEFAULT_PROFILE_IMAGE,
    isMockUser: true,
  },
  mockuser3: {
    id: "mockuser3",
    name: "Mock User Three",
    email: "mock3@example.com",
    picture: DEFAULT_PROFILE_IMAGE,
    isMockUser: true,
  },
};

export async function getCurrentUser(): Promise<User | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
    if (!token) return null;

    const secret = new TextEncoder().encode(JWT_SECRET);

    try {
      const { payload } = await jose.jwtVerify(token, secret);
      return payload.user as User;
    } catch (jwtError) {
      console.error("JWT verification failed:", jwtError);
      const cookieStore = await cookies();
      cookieStore.delete(AUTH_COOKIE_NAME);
      return null;
    }
  } catch (error) {
    console.error("Error getting current user:", error);
    const cookieStore = await cookies();
    cookieStore.delete(AUTH_COOKIE_NAME);
    return null;
  }
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE_NAME);
  revalidatePath("/");
  redirect("/");
}

export async function mockLoginAction(userId: string) {
  if (process.env.NODE_ENV !== "development") {
    throw new Error("Mock login is only available in development mode");
  }

  const user = mockUsers[userId as keyof typeof mockUsers];
  if (!user) {
    throw new Error("Invalid user ID");
  }

  const secret = new TextEncoder().encode(JWT_SECRET);
  const token = await new jose.SignJWT({ user })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(secret);

  const cookieStore = await cookies();
  cookieStore.set(AUTH_COOKIE_NAME, token, {
    httpOnly: true,
    secure: (process.env.NODE_ENV as string) === "production",
    maxAge: 60 * 60 * 24, // 1 day
    path: "/",
    sameSite: "lax",
  });

  revalidatePath("/");
  redirect("/");
}
