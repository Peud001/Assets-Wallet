/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        textPrimary: '#E3E3E3',
        textSecondary: '#C0C0C0',
        textTertiary: '#5B21B6',
        bgDarkPrimary: '#161616',
        bgDarkSecondary: '#090909',
        bgLightSecondary: '#fff'
      }
    },
  },
  plugins: [],
}

