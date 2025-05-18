import { auth } from "/auth";
import { NavigationHeader, NavigationFooter } from "@czi-sds/components";

export async function NavBar() {
  const session = await auth();
  const loggedIn = session?.user !== undefined;

  return (
    <NavigationHeader
      title="Placeholder Site Title"
      // Due to some React bugs,
      // I can't put custom components in the buttons array yet
      // without getting errors
      buttons={[
        {
          sdsType: "secondary",
          children: loggedIn
            ? `Welcome, ${session?.user?.name}`
            : "Not signed in",
        },
      ]}
    />
  );
}

export function Footer() {
  return <NavigationFooter title="Placeholder Site Title" />;
}
