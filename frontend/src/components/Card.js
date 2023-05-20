import { createMultiStyleConfigHelpers } from "@chakra-ui/react";
import { cardAnatomy } from "@chakra-ui/anatomy";
const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(cardAnatomy.keys);

const variants = {
  primary: definePartsStyle({
    container: {
      backgroundColor: "primary.500",
      color: "text.onPrimary",
    },
  }),
  secondary: definePartsStyle({
    container: {
      backgroundColor: "secondary.500",
      color: "text.onSecondary",
    },
  }),
};
const defaultProps = {};
const cardTheme = defineMultiStyleConfig({ variants, defaultProps });

export default cardTheme;
