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
        'gray-medium': '#999999',
        'yellow': '#FFFF00'
      },
      fontFamily:{
        Pacifico: ["Pacifico", "cursive"],
        Outfit: ["Outfit", "sans-serif"],
      },
      textShadow: {
        sm: '1px 1px 2px rgba(0, 0, 0, 0.25)',
        md: '2px 2px 4px rgba(0, 0, 0, 0.25)',
        lg: '3px 3px 6px rgba(0, 0, 0, 0.25)',
        xl: '4px 4px 8px rgba(0, 0, 0, 0.25)',
      }
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.text-shadow-sm': {
          textShadow: '1px 1px 2px rgba(0, 0, 0, 0.25)',
        },
        '.text-shadow-md': {
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.25)',
        },
        '.text-shadow-lg': {
          textShadow: '3px 3px 6px rgba(0, 0, 0, 0.25)',
        },
        '.text-shadow-xl': {
          textShadow: '4px 4px 8px rgba(0, 0, 0, 0.25)',
        },
        '.text-shadow-none': {
          textShadow: 'none',
        },
      };

      addUtilities(newUtilities, ['responsive', 'hover']);
    }
  ],
}