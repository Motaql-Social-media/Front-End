/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#40e5da",
      },
      boxShadow: {
        card: "0px 0px 80px -20px #40e5da",
      },
    },
  },
  plugins: [],
};
