"use client";

import { Button } from "@czi-sds/components";
import { mockLoginAction } from "@/app/lib/actions";

interface MockSignInButtonProps {
  userId: string;
}

export default function MockSignInButton({ userId }: MockSignInButtonProps) {
  return (
    <form action={mockLoginAction.bind(null, userId)}>
      <Button type="submit" sdsType="secondary" sdsStyle="rounded">
        Log in as {userId}
      </Button>
    </form>
  );
}
