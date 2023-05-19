import {
  extendTheme,
  defineStyleConfig,
  createMultiStyleConfigHelpers,
} from "@chakra-ui/react";
import { cardAnatomy } from "@chakra-ui/anatomy";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(cardAnatomy.keys);

const baseStyle = definePartsStyle({
  // define the part you're going to style
  container: {
    backgroundColor: "primary.500",
  },
  header: {
    color: "text.onPrimary",
  },
  body: {
    color: "text.onPrimary",
  },
  footer: {},
});
const cardTheme = defineMultiStyleConfig({ baseStyle });

const buttonTheme = defineStyleConfig({
  defaultProps: {
    colorScheme: "primary",
    color: "#text.onPrimary",
    fontWeight: "bold",
  },
});

const theme = extendTheme({
  colors: {
    transparent: "transparent",
    primary: {
      100: "#8aacec",
      200: "#729be8",
      300: "#5b8ae5",
      400: "#437ae1",
      500: "#2c69dd",
      600: "#215bcb",
      700: "#1d50b2",
      800: "#194598",
      900: "14397f",
    },
    text: {
      onPrimary: "#ffffff",
    },
  },
  components: {
    Button: buttonTheme,
    Heading: {
      baseStyle: {
        color: "primary.500",
      },
    },
    Card: cardTheme,
  },
});

export default theme;
