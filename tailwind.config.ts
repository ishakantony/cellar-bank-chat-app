import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        chat: {
          base: "#0a0a0a",
          surface: "#171717",
          elevated: "#262626",
          accent: "#14b8a6",
        },
      },
      fontFamily: {
        sans: ["var(--font-plus-jakarta)", "system-ui", "sans-serif"],
      },
      keyframes: {
        "message-in": {
          "0%": { opacity: "0", transform: "translateY(8px) scale(0.98)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "thinking-pulse": {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
        "thinking-dot": {
          "0%, 100%": { opacity: "0.3", transform: "translateY(0)" },
          "50%": { opacity: "1", transform: "translateY(-3px)" },
        },
      },
      animation: {
        "message-in": "message-in 0.25s ease-out forwards",
        "fade-in": "fade-in 0.4s ease-out forwards",
        "thinking-pulse": "thinking-pulse 2s ease-in-out infinite",
        "thinking-dot": "thinking-dot 1.2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
