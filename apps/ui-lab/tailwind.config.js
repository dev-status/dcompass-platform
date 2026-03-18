/** @type {import("tailwindcss").Config} */
const config = {
  content: ["./src/**/*.{ts,tsx}", "../../packages/ui/src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        dcompass: {
          canvas: "#141219",
          panel: "#2c2838",
          accent: "#8259d0"
        }
      }
    }
  },
  plugins: []
};

module.exports = config;
