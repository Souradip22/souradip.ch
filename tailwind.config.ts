import typography from "@tailwindcss/typography";
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
        primary: {
          //Purple --
          // "50": "#faf5ff",
          // "100": "#f3e8ff",
          // "200": "#e9d5ff",
          // "300": "#d8b4fe",
          // "400": "#c084fc",
          // "500": "#a855f7",
          // "600": "#9333ea",
          // "700": "#7e22ce",
          // "800": "#6b21a8",
          // "900": "#581c87",
          // "950": "#3b0764",
          //Fuchsia --
          // "50": "#fdf4ff",
          // "100": "#fae8ff",
          // "200": "#f5d0fe",
          // "300": "#f0abfc",
          // "400": "#e879f9",
          // "500": "#d946ef",
          // "600": "#c026d3",
          // "700": "#a21caf",
          // "800": "#86198f",
          // "900": "#701a75",
          // "950": "#4a044e",
          //Lime --
          // "50": "#f7fee7",
          // "100": "#ecfccb",
          // "200": "#d9f99d",
          // "300": "#bef264",
          // "400": "#a3e635",
          // "500": "#84cc16",
          // "600": "#65a30d",
          // "700": "#4d7c0f",
          // "800": "#3f6212",
          // "900": "#365314",
          // "950": "#1a2e05",
          // Green --
          "50": "#f0fdf4",
          "100": "#dcfce7",
          "200": "#bbf7d0",
          "300": "#86efac",
          "400": "#4ade80",
          "500": "#22c55e",
          "600": "#16a34a",
          "700": "#15803d",
          "800": "#166534",
          "900": "#14532d",
          "950": "#052e16",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      typography: (theme: (path: string) => string) => ({
        DEFAULT: {
          css: {
            color: theme("colors.neutral.600"),
            letterSpacing: "-0.01em",
            a: {
              color: theme("colors.primary.500"),
              transition: "color 0.2s ease",
              "&:hover": {
                color: theme("colors.primary.600"),
              },
            },
            "h1, h2, h3, h4, h5, h6": {
              fontWeight: theme("fontWeight.semibold"),
              letterSpacing: "-0.02em",
            },
            pre: {
              padding: theme("spacing.6"),
              backgroundColor: theme("colors.neutral.900"),
              borderWidth: 1,
              borderColor: theme("colors.neutral.800"),
              borderRadius: theme("borderRadius.lg"),
            },
          },
        },
        invert: {
          css: {
            color: theme("colors.neutral.400"),
          },
        },
      }),
    },
  },
  plugins: [typography],
};
export default config;
