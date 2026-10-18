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
        obsidian: "#090B0D",
        abyss: "#111416",
        ink: "#171B1F",
        gold: {
          DEFAULT: "#C7A45A",
          light: "#E6D2A0",
          dark: "#9A7B36",
        },
        ivory: "#F7F5EF",
        mist: "#A8AEB0",
        moss: {
          DEFAULT: "#5F9E6E",
          light: "#A8D8A0",
          deep: "#1E3A2A",
          glow: "#2E6B43",
        },
        teal: {
          DEFAULT: "#2E6F72",
          deep: "#123638",
        },
        // Legacy aliases kept for graceful fallback
        black: { DEFAULT: "#090B0D" },
        muted: { DEFAULT: "#8B9297", dark: "#6B7280" },
        warm: { white: "#F7F5EF" },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "Times New Roman", "serif"],
      },
      letterSpacing: {
        editorial: "0.28em",
      },
      maxWidth: {
        site: "1400px",
      },
      transitionTimingFunction: {
        luxe: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
