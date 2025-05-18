"use client";

import { AppProgressProvider as ProgressProvider } from "@bprogress/next";

const BProgressProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProgressProvider
      height="4px"
      color="#ffffff"
      options={{ showSpinner: false }}
      shallowRouting
      startOnLoad
    >
      {children}
    </ProgressProvider>
  );
};

export default BProgressProvider;
