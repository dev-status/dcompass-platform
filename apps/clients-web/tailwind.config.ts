import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{ts,tsx,mdx}",
    "../../packages/ui/src/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#f97316",
        secondary: "#1d4ed8"
      }
    }
  },
  plugins: []
};

export default config;
