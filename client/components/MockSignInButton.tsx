"use client";

import { Button } from "@czi-sds/components";

interface MockSignInButtonProps {
  userId: string;
}

export default function MockSignInButton({ userId }: MockSignInButtonProps) {
  const handleSignIn = () => {
    alert("Unimplemented");
  };

  return (
    <Button onClick={handleSignIn} sdsType="secondary" sdsStyle="rounded">
      Log in as {userId}
    </Button>
  );
}
