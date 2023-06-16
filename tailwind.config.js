/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/flowbite-react/**/*.js",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "gray-dark": "#2c2c2ca9",
        brand: "#1DB954",
        black: "#0F0F0F",
        white: "#F1F1F1",
        "gray-350": "#303030",
        "gray-hover": "#3D3D3D",
        "gray-light": "#AAAAAA",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
