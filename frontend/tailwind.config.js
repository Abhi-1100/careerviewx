module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#8b5cf6",
        "charcoal": "#1e293b",
        "panel-dark": "#16131c",
        "surface-dark": "#0f0a1e",
        "surface-light": "#f8fafc",
        "sidebar-light": "#f1f5f9",
        "card-white": "#ffffff",
        "border-light": "#e2e8f0",
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
