import { signIn } from "/auth";
import { Button } from "@czi-sds/components";

export default function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("okta");
      }}
    >
      <Button type="submit" sdsType="primary" sdsStyle="rounded">
        Sign in with Okta
      </Button>
    </form>
  );
}
