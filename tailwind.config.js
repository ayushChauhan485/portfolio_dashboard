/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}', './*.jsx'],
  theme: {
    extend: {
      colors: {
        olive: {
          400: '#a7bf76',
          500: '#8ea55f',
          700: '#6f8247',
          800: '#556B2F',
        },
      },
    },
  },
  plugins: [],
};