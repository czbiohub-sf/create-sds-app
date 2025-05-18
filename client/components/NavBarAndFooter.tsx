import { NavigationHeader, NavigationFooter } from "@czi-sds/components";

export async function NavBar() {
  const loggedIn = false;

  return (
    <NavigationHeader
      title="Placeholder Site Title"
      // Due to some React bugs,
      // I can't put custom components in the buttons array yet
      // without getting errors
      buttons={[
        {
          sdsType: "secondary",
          children: loggedIn ? `Welcome, Unimplemented` : "Not signed in",
        },
      ]}
    />
  );
}

export function Footer() {
  return <NavigationFooter title="Placeholder Site Title" />;
}
