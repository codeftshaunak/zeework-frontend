import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        redHat: ["Red Hat Display", "sans-serif"],
        "cabinet-black": ['"Cabinet Grotesk Black"', "sans-serif"],
        "cabinet-extra": ['"Cabinet Grotesk Extra Bold"', "sans-serif"],
        "cabinet-bold": ['"Cabinet Grotesk Bold"', "sans-serif"],
        "cabinet-normal": ['"Cabinet Grotesk Normal"', "sans-serif"],
        "cabinet-regular": ['"Cabinet Grotesk Regular"', "sans-serif"],
        "geist-black": ['"Geist Black"', "sans-serif"],
        "geist-extra": ['"Geist Ultra Black"', "sans-serif"],
        "geist-bold": ['"Geist Bold"', "sans-serif"],
        "geist-normal": ['"Geist Medium"', "sans-serif"],
        "geist-regular": ['"Geist Regular"', "sans-serif"],
      },
      colors: {
        // Custom colors
        primary: "#22C55E",
        secondary: "#FFFFFF",
        tertiary: "#D1D5DB",

        // Badge colors
        "badge-primary": "#16A34A",
        "badge-secondary": "#7367F0",
        "badge-tertiary": "#FF9A62",

        // Background colors
        "bg-success": "#F0FDF4",
        "papaya-whip": "#ffefd5",
        lavender: "#e6e6fa",
        honeydew: "#f0fff0",
        "misty-rose": "#ffe4e1",
      },
    },
  },
  plugins: [],
};

export default config;