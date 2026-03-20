module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#8c2bee",
        "charcoal": "#191022",
        "panel-dark": "#191022",
        "surface-dark": "#191022",
        "surface-light": "#f7f6f8",
        "sidebar-light": "#f7f6f8",
        "card-white": "#ffffff",
        "border-light": "#e2e8f0",
        "card-dark": "#231236",
        "border-dark": "#3a2a54",
        "background-light": "#f7f6f8",
        "background-dark": "#191022",
        "accent-blue": "#3b82f6",
        "accent-green": "#10b981",
        "accent-yellow": "#f59e0b"
      },
      fontFamily: {
        "display": ["Lexend", "sans-serif"]
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "2xl": "1rem",
        "full": "9999px"
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
