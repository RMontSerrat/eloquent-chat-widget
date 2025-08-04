/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/eloquent-chat-widget/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        'geist': ['Geist', 'sans-serif'],
        'erode': ['Erode', 'serif'],
      },
      colors: {
        primary: '#6f33b7',
        'primary-dark': '#5c2a9a',
      }
    },
  },
  plugins: [],
}