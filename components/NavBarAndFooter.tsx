import { NavigationHeader, NavigationFooter } from "@czi-sds/components";
import { getCurrentUser } from "@/app/lib/actions";

export async function NavBar() {
  const user = await getCurrentUser();
  const loggedIn = user !== null;

  return (
    <NavigationHeader
      title="Placeholder Site Title"
      // Due to some React bugs,
      // I can't put custom components in the buttons array yet
      // without getting errors
      buttons={[
        {
          sdsType: "secondary",
          children: loggedIn ? `Welcome, ${user?.name}` : "Not signed in",
        },
      ]}
    />
  );
}

export function Footer() {
  return <NavigationFooter title="Placeholder Site Title" />;
}
