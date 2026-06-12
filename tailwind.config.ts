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
        background: "#1C1C1E",
        primary: "#2C2C2E",
        secondary: "#3A3A3C",
        accent: "#0A84FF",
        text: "#FFFFFF",
        "text-secondary": "#8E8E93",
        danger: "#FF3B30",
        warning: "#FF9500",
        success: "#34C759",
        info: "#007AFF",
        critical: "#FF3B30",
        high: "#FF9500",
        medium: "#FFCC00",
        low: "#34C759",
        "metric-card-default": "#1e2130",
        "metric-card-danger": "#2d1515",
        "metric-card-warning": "#2d2510",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-in-out",
      },
    },
  },
  plugins: [],
};
export default config;
