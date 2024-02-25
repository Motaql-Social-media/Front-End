const purgecss = require("@fullhuman/postcss-purgecss")({
  content: ["./src/**/*.html", "./src/**/*.vue", "./src/**/*.jsx", "./src/**/*.tsx"],
  defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
  // Configure PurgeCSS to remove unused Tailwind CSS classes and obfuscate class names.
  // Set mode to 'all' to remove all unused classes and obfuscate class names.
  mode: "all",
})

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#40e5da",
        lightBorder: "#F3F4F6",
        darkBorder: "#262626",
        lightHover: "#e5e5e5",
        darkHover: "#0a0a0a",
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

  plugins: [...(process.env.NODE_ENV === "production" ? [purgecss] : [])],
}
