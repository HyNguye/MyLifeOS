/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
    
      fontFamily: {
        writeByHand: ['Parisienne'],
        vintage: ['"Press Start 2P"','sans-serif']
      },
      backgroundColor: {
        vintagePaper: ['#F6EEE0'],
        old: ['#CDCDCD'],
        brownLayout: ['#835d3d'],
        shopDesLayout: ['#7f4a49']
      },
      width:{
        utility: ['400px'],
        app: ['800px']
      },
      height:{
        utility: ['400px']
      },
      maxHeight:{
        fitScreen: ['782px']
      },
      maxWidth:{
        app: ['800px']
      },
      minWidth:{
        utility: ['400px']
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}