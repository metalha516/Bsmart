/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        taobao: {
          orange: '#FF5000',
          red: '#FF0036',
          darkOrange: '#E63E00',
          gold: '#FFC107',
          bg: '#F4F4F4',
          dark: '#1F2937',
          grayText: '#666666'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
