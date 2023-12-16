/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#d75413",
        secondary: "#202123",
        tertiary: "#87878a",
      },
    },
  },
  plugins: [],
};
