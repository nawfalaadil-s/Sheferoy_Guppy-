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
        // Luxury White-Theme Foundations
        page: "#FAFAF7",
        secondary: "#F0F5F0",
        surface: "#FFFFFF",

        // Primary Brand (Deep Luxury Teal)
        brand: {
          DEFAULT: "#123C3A",
          hover: "#1B514B",
          dark: "#0C2927",
          light: "#E7EFEF",
          muted: "#E0E9E8",
        },
        teal: {
          DEFAULT: "#123C3A",
          hover: "#1B514B",
          dark: "#0C2927",
          light: "#E7EFEF",
          50: "#F4F7F7",
          100: "#E7EFEF",
          500: "#1B514B",
          600: "#123C3A",
          700: "#0C2927",
          800: "#081E1C",
          900: "#051312",
        },

        // Champagne Gold Accent
        gold: {
          DEFAULT: "#D7A94B",
          hover: "#C99A38",
          light: "#FBF5E8",
          dark: "#B8892D",
          border: "#EBD4A5",
        },

        // Natural Charcoal & Muted Slate Typography
        heading: "#263238",
        charcoal: "#263238",
        body: "#5F6B67",
        muted: {
          DEFAULT: "#7C8782",
          dark: "#5F6B67",
          light: "#A4AFA9",
        },

        // Subtle Borders & Dividers
        border: {
          DEFAULT: "#E4E9E4",
          light: "#EEF2EE",
          dark: "#D5DCD5",
        },

        // Semantic Status
        success: {
          DEFAULT: "#347A55",
          light: "#EAF3EE",
          dark: "#255A3E",
        },
        error: {
          DEFAULT: "#B54747",
          light: "#FDF1F1",
          dark: "#8F3333",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "system-ui", "-apple-system", "sans-serif"],
        display: ["var(--font-display)", "Plus Jakarta Sans", "var(--font-sans)", "sans-serif"],
      },
      letterSpacing: {
        editorial: "0.18em",
      },
      maxWidth: {
        site: "1280px",
      },
      transitionTimingFunction: {
        luxe: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      boxShadow: {
        subtle: "0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px -1px rgba(0, 0, 0, 0.03)",
        card: "0 2px 14px -2px rgba(18, 60, 58, 0.05), 0 1px 3px rgba(0, 0, 0, 0.03)",
        "card-hover": "0 16px 36px -8px rgba(18, 60, 58, 0.12), 0 4px 8px -2px rgba(0, 0, 0, 0.03)",
        teal: "0 4px 20px -2px rgba(18, 60, 58, 0.2)",
        gold: "0 4px 20px -2px rgba(215, 169, 75, 0.2)",
      },
    },
  },
  plugins: [],
};

export default config;
