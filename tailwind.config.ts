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
        enoch: {
          primary: "#3b82f6",
          dark: "#1e3a8a",
          accent: "#ef4444",
          sabbath: "#f59e0b",
          bg: "#ffffff",
          muted: "#94a3b8",
        },
      },
    },
  },
  plugins: [],
};
export default config;
