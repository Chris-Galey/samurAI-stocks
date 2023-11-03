/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      transparent: "transparant",
      current: "currentColor",
      bgColor: "#f1f5f9", //slate 100
      buttonColor: "#2563eb", //blue 600
      secondaryColor: "#fafafa", //neutral 50
      textColor: "#0a0a0a", //neutral 950
    },
  },
  plugins: [],
};
