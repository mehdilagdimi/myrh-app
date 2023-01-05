/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors : {
        'custPurple' : '#7F397E',
        'custGray' : '#F6F3EF'
      }
    },
  },
  plugins: [],

}
