import { extendTheme } from "@chakra-ui/react";

import buttonTheme from "./components/Button";
import cardTheme from "./components/Card";
import boxTheme from "./components/Box";

const theme = extendTheme({
  colors: {
    transparent: "transparent",
    primary: {
      100: "#ffffff",
      150: "#ddefff",
      200: "#cad9f7",
      300: "#95b4ee",
      400: "#618ee6",
      500: "#2c69dd",
      600: "#1c4dab",
      700: "#123372",
      800: "#091a39",
      900: "#000000",
    },
    secondary: {
      100: "#ffffff",
      200: "#fdecba",
      300: "#fbd975",
      400: "#f8c631",
      500: "#dba507",
      600: "#a47c05",
      700: "#6e5303",
      800: "#372902",
      900: "#000000",
    },
    text: {
      onPrimary: "#ffffff",
      onSecondary: "#ffffff",
    },
  },
  components: {
    Button: buttonTheme,
    Box: boxTheme,
    Card: cardTheme,
  },
  styles: {
    global: () => ({
      body: {
        bg: "primary.150", //change this for page background color
      },
    }),
  },
});

export default theme;
