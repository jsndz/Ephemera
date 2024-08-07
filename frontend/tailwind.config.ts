import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        animatedgradient: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
      animation: {
        animatedgradient: "animatedgradient 3s ease infinite",
      },
      colors: {
        WHITE: "#FFFFFF",
        RED: "#EA3A36",
        ORANGE: "#F27D2C",
        BEIGE: "#E8E7D5",
      },
      borderColor: {
        gradient:
          "linear-gradient(319deg, #faff00 0%, #ff1000 37%, #ff6a00 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
