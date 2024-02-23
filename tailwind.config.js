/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#40e5da",
        lightBorder: "#F3F4F6",
        darkBorder: "#262626",
      },
      boxShadow: {
        card: "0px 0px 80px -20px #40e5da",
      },
      screens: {
        xs: "475px",
        xxs: "400px",
        smallSidebar: "max-width: 200px",
      },
    },
  },
  plugins: [],
};
