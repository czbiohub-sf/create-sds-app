"use client";

import { Button } from "@czi-sds/components";
import { logoutAction } from "@/app/lib/actions";

export function SignOut() {
  return (
    <form action={logoutAction}>
      <Button type="submit" sdsType="secondary" sdsStyle="rounded">
        Sign out
      </Button>
    </form>
  );
}
