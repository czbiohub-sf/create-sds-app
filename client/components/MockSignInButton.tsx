"use client";

import { signIn } from "next-auth/react";
import { Button } from "@czi-sds/components";

interface MockSignInButtonProps {
  userId: string;
}

export default function MockSignInButton({ userId }: MockSignInButtonProps) {
  const handleSignIn = () => {
    signIn("credentials", { userId, redirect: true });
  };

  return (
    <Button onClick={handleSignIn} sdsType="secondary" sdsStyle="rounded">
      Log in as {userId}
    </Button>
  );
}
