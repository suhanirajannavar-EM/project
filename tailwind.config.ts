import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: "#fbf8f0",
          100: "#f5edd9",
          200: "#ead9b0",
          300: "#dcc07e",
          400: "#cfa555",
          500: "#c08f3a",
          600: "#a87330",
          700: "#87582a",
          800: "#6f4728",
          900: "#5c3c24",
          950: "#351f12",
        },
        charcoal: {
          50: "#f6f6f6",
          100: "#e7e7e7",
          200: "#d1d1d1",
          300: "#b0b0b0",
          400: "#888888",
          500: "#6d6d6d",
          600: "#5d5d5d",
          700: "#4f4f4f",
          800: "#454545",
          900: "#3d3d3d",
          950: "#1a1a1a",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #c08f3a 0%, #ead9b0 50%, #c08f3a 100%)",
        "dark-gradient": "linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
