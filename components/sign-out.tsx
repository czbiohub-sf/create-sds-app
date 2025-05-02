import { signOut } from "@/auth";
import { Button } from "@czi-sds/components";

export function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <Button type="submit" sdsType="secondary" sdsStyle="rounded">
        Sign Out
      </Button>
    </form>
  );
}
