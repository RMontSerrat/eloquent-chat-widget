/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./demo.html",
  ],
  safelist: [
    'bg-primary',
    'bg-primary/90',
    'hover:bg-primary/90',
    'text-primary',
    'border-primary', 
    'ring-primary',
    'focus-visible:ring-primary',
  ],
  theme: {
    extend: {
      fontFamily: {
        'primary': ['Geist', 'sans-serif'],
      },
      colors: {
        primary: '#6f33b7',
        'primary-dark': '#5c2a9a',
      }
    },
  },
}