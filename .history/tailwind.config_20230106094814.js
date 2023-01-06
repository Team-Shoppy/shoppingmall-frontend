/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: '#008d62',
      },
      backgroundImage: {
        banner: `url('../public/images/banner11.jpeg')`,
        banner1: `url('../public/images/banner22.jpeg')`,
        
        
      },
    },
  },
  plugins: [],
};