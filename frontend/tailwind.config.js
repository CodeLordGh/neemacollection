/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {    
    extend: {
      colors: {
        'white': '#FFFFFF',
        'pink': '#FA61D0',
        'black': '#000000',
        'gray': '#333333',
        'gray-light': '#F6EDF3',
        'off-white': '#FAF9F6',
        'light-pink': '#FCA0E3',
        'gray-medium': '#999999'
      },
      fontFamily:{
        Pacifico: ["Pacifico", "cursive"],
        Outfit: ["Outfit", "sans-serif"],
      },
    },
  },
  plugins: [],
}