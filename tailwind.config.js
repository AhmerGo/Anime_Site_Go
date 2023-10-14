/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      fontFamily : {
        poppins : ['"Poppins"', 'sans-serif'],
        quicksand : ['"Quicksand"', 'sans-serif'],
        greatvibes : ['"Great Vibes"', 'cursive'],
        monts : ['"Montserrat Alternates"', 'sans-serif'],
        monoton : [ '"monoton"' , 'cursive'],
        rubik : ['"Rubik Glitch"', 'cursive']
      },
      colors: {
        main: '#12141E',
        submain : '#00FFA3',
        rare : '#35F3FF',
        rare2 : '#848484',
        rare3 : '#65D1FF',
      },
      backgroundImage: {
        'bgimg': "url('/src/assets/fr5.png')",
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
      }
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
}
