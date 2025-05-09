"use client";
import {
  SDSLightAppTheme,
  SDSDarkAppTheme,
  makeThemeOptions,
} from "@czi-sds/components";
import { createTheme, CssBaseline, useMediaQuery } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { ReactNode } from "react";

export type ThemeMode = "light" | "dark";

const updateTheme = (themeMode: ThemeMode) => {
  const baseTheme = themeMode === "light" ? SDSLightAppTheme : SDSDarkAppTheme;

  const themeOptions = baseTheme;

  const appTheme = makeThemeOptions(themeOptions, themeMode);
  return createTheme(appTheme, {
    cssVariables: true,
  });
};

// CustomThemeProvider component to wrap your app
export const CustomThemeProvider = ({ children }: { children: ReactNode }) => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = updateTheme(prefersDarkMode ? "dark" : "light");

  if (!theme) {
    return <>{children}</>;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
