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
          DEFAULT: "#14532d",
          light: "#1b5e3f",
          hover: "#166534",
          dark: "#0f3f22",
        },
        accent: {
          DEFAULT: "#a3e635",
          light: "#bef264",
          dark: "#84cc16",
        },
        tint: "#eef7ee",
        dark: "#111827",
        medium: "#6b7280",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
