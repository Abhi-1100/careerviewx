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
        "surface-dark": "#0f0a1e",
        "card-dark": "#1a142e",
        "border-dark": "#2d264a",
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