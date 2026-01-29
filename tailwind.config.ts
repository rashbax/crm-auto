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
          DEFAULT: "#005BFF",
          soft: "#E6F0FF",
        },
        bg: {
          DEFAULT: "#F5F7FA",
        },
        card: {
          bg: "#ffffff",
        },
        text: {
          main: "#111827",
          muted: "#6B7280",
        },
        border: {
          soft: "#E5E7EB",
        },
        danger: "#EF4444",
        success: "#10B981",
      },
    },
  },
  plugins: [],
};
export default config;
