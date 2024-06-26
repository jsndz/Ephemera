import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        WHITE: "#FFFFFF",
        RED: "#EA3A36",
        ORANGE: "#F27D2C",
      },
    },
  },
  plugins: [],
};
export default config;
