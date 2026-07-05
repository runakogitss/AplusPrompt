import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#17201b",
        moss: "#496a57",
        mint: "#dff3e7",
        clay: "#b96f4b",
        gold: "#f1bf5b",
        paper: "#fbfaf6"
      },
      boxShadow: {
        soft: "0 18px 60px rgba(23,32,27,0.10)"
      }
    }
  },
  plugins: []
};

export default config;
