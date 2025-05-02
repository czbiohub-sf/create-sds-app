import { Colors } from "@czi-sds/components";

const lightModeColors: Partial<Colors> = {
  blue: {
    50: "#00A0DD",
    75: "#00A0DD",
    100: "#00A0DD",
    200: "#00A0DD",
    300: "#00A0DD",
    400: "#0D7CB5",
    500: "#0D7CB5",
    600: "#065B86",
    700: "#065B86",
    800: "#002F47",
    900: "#002F47",
  },
};

const darkModeColors: Partial<Colors> = {
  blue: {
    50: "#002F47",
    75: "#002F47",
    100: "#065B86",
    200: "#065B86",
    300: "#0D7CB5",
    400: "#0D7CB5",
    500: "#00A0DD",
    600: "#00A0DD",
    700: "#00A0DD",
    800: "#00A0DD",
    900: "#00A0DD",
  },
};

export const lightModeBiohubOverrides = {
  colors: lightModeColors,
};

export const darkModeBiohubOverrides = {
  colors: darkModeColors,
};
