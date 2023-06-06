import { defineStyleConfig } from "@chakra-ui/react";

const buttonTheme = defineStyleConfig({
  defaultProps: {
    fontWeight: "bold",
    colorScheme: "primary",
  },
});

export default buttonTheme;
