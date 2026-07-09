import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0052cc",
          dark: "#003e9f",
        },
        pink: {
          DEFAULT: "#b74aa8",
        },
        yellow: {
          DEFAULT: "#ffd84d",
        },
        orange: {
          DEFAULT: "#f5a400",
        },
        cream: {
          DEFAULT: "#fff4df",
        },
        text: {
          DEFAULT: "#080808",
        },
        muted: {
          DEFAULT: "#686868",
        },
        border: {
          DEFAULT: "#e6e6e6",
        },
        background: "#ffffff",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Arial", "sans-serif"],
        display: ["var(--font-display)", "Arial", "sans-serif"],
      },
      boxShadow: {
        premium: "0 16px 28px rgba(0, 0, 0, 0.14)",
      },
      animation: {
        ticker: "ticker 30s linear infinite",
      },
      keyframes: {
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
