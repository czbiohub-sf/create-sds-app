import { signOut } from "@/auth";
import { StyledButton } from "@/app/style";

export function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <StyledButton type="submit" sdsType="secondary" sdsStyle="rounded">
        Sign Out
      </StyledButton>
    </form>
  );
}
