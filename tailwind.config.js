/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {
      backgroundImage: {
        'hero-pattern': "url('assets/img/home-background.jpg')",
      },
      fontFamily: {
        'star-wars': ['Star Wars', 'sans-serif'],
      },
    },
  },
  plugins: [],
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
