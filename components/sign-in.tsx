import { signIn } from "@/auth";
import { StyledButton } from "@/app/style";

export default function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("okta");
      }}
    >
      <StyledButton type="submit" sdsType="primary" sdsStyle="rounded">
        Sign in with Okta
      </StyledButton>
    </form>
  );
}
