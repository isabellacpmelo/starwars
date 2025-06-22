# Star Wars Catalogue

<div align="left">
  <a href="https://star-wars-catal.netlify.app/">
    <img height="180em" alt="Star Wars Catalogue" src="https://raw.githubusercontent.com/isabellacpmelo/starwars/main/assets/img/star-wars-catalogue.png" />
  </a>
</div>
</br>
<a href="https://star-wars-catal.netlify.app/">
Click here to access the website
</a>

## About the project

Star Wars Catalogue is a web application that displays an organized collection of characters from the Star Wars universe. Each profile includes an image, name, and a dynamic route with more information, providing an engaging experience for fans of the saga.

The application was built using Nuxt.js for SSR/static generation, combined with Vue 2, TailwindCSS, and PostCSS to deliver a responsive and visually cohesive design.

### Technologies

- [Vue.js 2.7.10](https://vuejs.org/)
- [Nuxt.js 2.15.8](https://nuxtjs.org/)
- [Tailwind 3.3.1](https://tailwindcss.com/)
- [Prettier 2.7.1](https://prettier.io/)
- [Eslint 8.24.0](https://eslint.org/)
- [Postcss 8.4.22](https://postcss.org/)

## Getting Started

### Install dependencies:
```bash
$ npm install
```

### Run development server with hot reload:
```bash
$ npm run dev
```

### Build for production:
```bash
$ npm run build
$ npm run start
```

### Build for production:
```bash
$ npm run generate
```

## Project structure

```
📦starwars
 ┣ 📂assets
 ┃ ┣ 📂css
 ┃ ┃ ┗ 📜tailwind.css
 ┃ ┣ 📂fonts
 ┃ ┃ ┣ 📜Starjedi.ttf
 ┃ ┃ ┗ 📜Starjout.ttf
 ┃ ┗ 📂img
 ┃ ┃ ┣ 📂people
 ┃ ┃ ┃ ┣ 📜Ackbar.jpeg
 ┃ ┃ ┃ ┣ 📜[...].jpeg
 ┃ ┃ ┣ 📜home-background.png
 ┃ ┃ ┗ 📜star-wars-catalogue.png
 ┣ 📂components
 ┃ ┣ 📜BackgroundSection.vue
 ┃ ┣ 📜CharacterCard.vue
 ┃ ┣ 📜HeroSection.vue
 ┃ ┗ 📜StarFavorite.vue
 ┣ 📂pages
 ┃ ┣ 📜index.vue
 ┃ ┗ 📜_slug.vue
 ┣ 📂static
 ┃ ┗ 📜favicon.ico
 ┣ 📂store
 ┃ ┗ 📜README.md
 ┣ 📜.editorconfig
 ┣ 📜.eslintrc.js
 ┣ 📜.gitignore
 ┣ 📜.prettierignore
 ┣ 📜.prettierrc
 ┣ 📜jsconfig.json
 ┣ 📜LICENSE
 ┣ 📜now.json
 ┣ 📜nuxt.config.js
 ┣ 📜package-lock.json
 ┣ 📜package.json
 ┣ 📜README.md
 ┗ 📜tailwind.config.js
```

## Nuxt Directory Highlights
Some key folders and their purposes:

- pages/: Where routing and views are automatically generated.

- components/: Reusable components like CharacterCard, HeroSection.

- assets/: Includes Tailwind config, Star Wars fonts and image library.

- static/: Public files served directly, like favicon.ico.

- store/: Optional Vuex integration.

For detailed explanations, refer to the Nuxt.js documentation: https://v2.nuxt.com/pt/
