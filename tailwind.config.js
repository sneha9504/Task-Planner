// tailwind.config.js
module.exports = {
  content: [
    "./src/app/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("tw-animate-css")],
}
