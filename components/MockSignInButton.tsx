"use client";

import { signIn } from "next-auth/react";
import { StyledButton } from "@/app/style"; // Assuming style imports from app/style

interface MockSignInButtonProps {
  userId: string;
}

export default function MockSignInButton({ userId }: MockSignInButtonProps) {
  const handleSignIn = () => {
    signIn("credentials", { userId, redirect: true });
  };

  return (
    <StyledButton onClick={handleSignIn} sdsType="secondary" sdsStyle="rounded">
      Log in as {userId}
    </StyledButton>
  );
}
