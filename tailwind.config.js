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
        darkBorder: "#16181c",
        primaryHover: "#31BFB6",
        lightHover: "#e5e5e5",
        darkHover: "#0a0a0a",
        interestedColor: "#e38120",
        businessColor: "#511796",
      },
      boxShadow: {
        card: "0px 0px 80px -20px #40e5da",
      },
      screens: {
        xs: "475px",
        xxs: "400px",
        smallSidebar: "max-width: 200px",
        composeReelFirst: "1064px",
        composeReelSecond: "915px",
        composeReelThird: "808px",
        composeReelFourth: "727px",
        composeReelFifth: "662px",
        composeReelSixth: "597px",
        s570: "570px",
        composeReelEighth: "503px",
        s530: "530px",
        s350: "350px",
        composeReelNinth: "469px",
      },
    },
  },

  plugins: [...(process.env.NODE_ENV === "production" ? [purgecss] : [])],
}
