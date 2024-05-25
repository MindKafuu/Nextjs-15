import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
    screens: {
      mobile: { min: "300px", max: "769px" },
      tablet: { min: "769px", max: "1367px" },
      desktop: { min: "1367px", max: "1920px" },
    },
  },
  plugins: [],
};
export default config;
