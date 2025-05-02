import { Button } from "@czi-sds/components";
import SignIn from "@/components/sign-in";
import { SignOut } from "@/components/sign-out";
import { auth } from "@/auth";
import MockSignInButton from "@/components/MockSignInButton";

export default async function Home() {
  const session = await auth();

  return (
    <main className="flex flex-col items-center justify-between p-24 bg-sds-gray-100 text-sds-gray-900 dark:bg-sds-gray-800 dark:text-sds-gray-100">
      <div className="z-10 w-full max-w-5xl items-center justify-between text-sm lg:flex">
        <p className="relative m-0 p-sds-l">
          Get started by editing&nbsp;
          <code className="font-bold font-sds-code">app/page.tsx</code>
        </p>
        <p className="relative m-0 p-sds-l">
          Session: {JSON.stringify(session)}
        </p>
      </div>

      <div className="relative flex place-items-center gap-sds-l flex-wrap justify-center items-center max-md:flex-col max-md:py-16 max-md:pb-24 my-16">
        <Button
          sdsType="primary"
          sdsStyle="icon"
          sdsSize="large"
          icon="DNA"
          style={{ margin: 0 }}
        />

        <Button sdsType="primary" sdsStyle="rounded">
          Primary Rounded
        </Button>

        <Button sdsType="primary" sdsStyle="square">
          Primary Square
        </Button>

        <Button sdsType="primary" sdsStyle="minimal">
          Primary Minimal
        </Button>

        <SignIn />
        <SignOut />
        {process.env.NODE_ENV === "development" && (
          <>
            <MockSignInButton userId="mockuser1" />
            <MockSignInButton userId="mockuser2" />
            <MockSignInButton userId="mockuser3" />
          </>
        )}
      </div>

      <div className="mb-32 grid grid-cols-1 max-md:mb-[120px] max-md:max-w-[320px] max-md:text-center md:grid-cols-2 lg:grid-cols-4 md:max-w-5xl w-full md:text-left gap-sds-m lg:mb-0">
        <a
          href="https://sds.czi.design"
          target="_blank"
          rel="noopener noreferrer"
          className="group block p-sds-l rounded-xl border border-transparent transition-colors duration-200 hover:bg-sds-gray-100 hover:border-sds-gray-300 dark:hover:bg-sds-gray-200 dark:hover:border-sds-gray-400 max-md:px-sds-xxl max-md:py-sds-l"
        >
          <h2 className="font-semibold mb-sds-m text-sds-header-l-600-wide max-md:mb-sds-s">
            SDS Docs{" "}
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-sds-xxs">
              -&gt;
            </span>
          </h2>
          <p className="m-0 opacity-60 text-sds-body-s-400-narrow leading-sds-body-s max-w-[30ch]">
            Find in-depth information about Science Design System (SDS) features
            and API.
          </p>
        </a>

        <a
          href="https://nextjs.org/docs"
          target="_blank"
          rel="noopener noreferrer"
          className="group block p-sds-l rounded-xl border border-transparent transition-colors duration-200 hover:bg-sds-gray-100 hover:border-sds-gray-300 dark:hover:bg-sds-gray-200 dark:hover:border-sds-gray-400 max-md:px-sds-xxl max-md:py-sds-l"
        >
          <h2 className="font-semibold mb-sds-m text-sds-header-l-600-wide max-md:mb-sds-s">
            Next.js Docs{" "}
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-sds-xxs">
              -&gt;
            </span>
          </h2>
          <p className="m-0 opacity-60 text-sds-body-s-400-narrow leading-sds-body-s max-w-[30ch]">
            Learn about Next.js features and API
          </p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
          className="group block p-sds-l rounded-xl border border-transparent transition-colors duration-200 hover:bg-sds-gray-100 hover:border-sds-gray-300 dark:hover:bg-sds-gray-200 dark:hover:border-sds-gray-400 max-md:px-sds-xxl max-md:py-sds-l"
        >
          <h2 className="font-semibold mb-sds-m text-sds-header-l-600-wide max-md:mb-sds-s">
            Learn Next.js{" "}
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-sds-xxs">
              -&gt;
            </span>
          </h2>
          <p className="m-0 opacity-60 text-sds-body-s-400-narrow leading-sds-body-s max-w-[30ch]">
            Learn about Next.js in an interactive course with&nbsp;quizzes!
          </p>
        </a>

        <a
          href="https://czi.atlassian.net/wiki/spaces/SI/pages/2050621483/Happy+Path+Intro"
          target="_blank"
          rel="noopener noreferrer"
          className="group block p-sds-l rounded-xl border border-transparent transition-colors duration-200 hover:bg-sds-gray-100 hover:border-sds-gray-300 dark:hover:bg-sds-gray-200 dark:hover:border-sds-gray-400 max-md:px-sds-xxl max-md:py-sds-l"
        >
          <h2 className="font-semibold mb-sds-m text-sds-header-l-600-wide max-md:mb-sds-s">
            Deploy{" "}
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-sds-xxs">
              -&gt;
            </span>
          </h2>
          <p className="m-0 opacity-60 text-sds-body-s-400-narrow leading-sds-body-s max-w-[30ch]">
            Learn about how to use Happy to deploy your app
          </p>
        </a>
      </div>
    </main>
  );
}
