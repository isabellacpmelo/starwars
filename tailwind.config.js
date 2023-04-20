/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {
      backgroundImage: {
        'hero-pattern': "url('assets/img/home-background.png')",
      },
      fontFamily: {
        'star-wars': ['Star Wars', 'sans-serif'],
        'star-wars-secondary': ['Star Wars Secondary', 'sans-serif'],
      },
      colors: {
        'banana-yellow': '#FFE81F',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
  purge: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  variants: {
    extend: {},
  },
}
