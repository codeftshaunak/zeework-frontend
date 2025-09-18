import { createSystem, defaultConfig, defineConfig, defineSlotRecipe } from "@chakra-ui/react";

// Define alert slot recipe for custom styling
const alertSlotRecipe = defineSlotRecipe({
  slots: ["title", "description", "container", "icon", "spinner"],
  base: {
    container: {
      border: "1px solid",
      borderColor: "gray.300",
      fontWeight: "normal",
      fontSize: "15px",
      fontFamily: "poppins",
      _dark: {
        borderColor: "gray.600",
        background: "gray.800",
      },
    },
  },
  variants: {
    status: {
      warning: {
        container: {
          color: "yellow.500",
          bg: "#FDF2DB",
        },
      },
      error: {
        container: {
          color: "red.500",
          bg: "#FFE5E4",
        },
      },
      success: {
        container: {
          color: "green.500",
          bg: "#D4F9E7",
        },
      },
      info: {
        container: {
          color: "blue.500",
          bg: "#EAF0FA",
        },
      },
    },
  },
  defaultVariants: {
    status: "success",
  },
});

// Function to generate shades of a color
const generateColorScheme = (color) => {
  const lighten = (col, factor) => {
    return col.map((val) => Math.min(255, val + (255 - val) * factor));
  };

  const darken = (col, factor) => {
    return col.map((val) => val * (1 - factor));
  };

  const hexToRgb = (hex) => {
    return hex.match(/[A-Za-z0-9]{2}/g).map((v) => parseInt(v, 16));
  };

  const rgbToHex = (r, g, b) => {
    return (
      "#" +
      [r, g, b]
        .map((val) => Math.round(val).toString(16).padStart(2, "0"))
        .join("")
    );
  };

  const baseColor = hexToRgb(color);

  return {
    50: rgbToHex(...lighten(baseColor, 0.9)),
    100: rgbToHex(...lighten(baseColor, 0.8)),
    200: rgbToHex(...lighten(baseColor, 0.6)),
    300: rgbToHex(...lighten(baseColor, 0.4)),
    400: rgbToHex(...lighten(baseColor, 0.2)),
    500: color,
    600: rgbToHex(...darken(baseColor, 0.1)),
    700: rgbToHex(...darken(baseColor, 0.2)),
    800: rgbToHex(...darken(baseColor, 0.4)),
    900: rgbToHex(...darken(baseColor, 0.6)),
  };
};

// Primary color
const primaryColor = "#22c55e";

// Generate color scheme
const primaryScheme = generateColorScheme(primaryColor);

// Create custom config
const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        primary: {
          50: { value: primaryScheme[50] },
          100: { value: primaryScheme[100] },
          200: { value: primaryScheme[200] },
          300: { value: primaryScheme[300] },
          400: { value: primaryScheme[400] },
          500: { value: primaryScheme[500] },
          600: { value: primaryScheme[600] },
          700: { value: primaryScheme[700] },
          800: { value: primaryScheme[800] },
          900: { value: primaryScheme[900] },
        },
      },
    },
    slotRecipes: {
      alert: alertSlotRecipe,
    },
  },
});

// Create the system
const theme = createSystem(defaultConfig, config);

export default theme;
