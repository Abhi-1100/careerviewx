module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#8b5cf6",
        "charcoal": "#0f0d15",
        "panel-dark": "#16131c",
      },
      fontFamily: {
        "display": ["Lexend", "sans-serif"]
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}