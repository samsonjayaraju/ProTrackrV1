/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#FF6B35", // Vibrant Orange
        secondary: "#9C27B0", // Purple
        accent: "#FFD700", // Yellow
        "background-light": "#FDFBF7", // Off-white
        "background-dark": "#121212", // Dark mode background
        "card-light": "#FFFFFF",
        "card-dark": "#1E1E1E",
        "text-main-light": "#1A1A1A", // Dark
        "text-main-dark": "#F3F4F6",
        "text-secondary-light": "#4B5563", // Gray 600
        "text-secondary-dark": "#9CA3AF",
        "border-light": "#E5E7EB",
        "border-dark": "#374151"
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        sans: ["Outfit", "sans-serif"]
      },
      borderRadius: {
        DEFAULT: "1rem",
        "xl": "1.5rem",
        "2xl": "2rem",
      },
      boxShadow: {
        'hard': '4px 4px 0px 0px rgba(0,0,0,1)',
        'hard-sm': '2px 2px 0px 0px rgba(0,0,0,1)',
        'glow': '0 0 20px rgba(255, 107, 53, 0.3)',
      }
    },
  },
  plugins: [],
}
