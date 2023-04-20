<template>
  <div
    class="w-72 md:w-96 md:h-64 p-4 bg-gray-950 border border-banana-yellow rounded-lg shadow"
  >
    <nuxt-link :to="`/${character.name.replaceAll(' ', '%20')}`">
      <img
        class="rounded-lg border border-gray-900 w-full h-40 object-cover"
        :src="`https://raw.githubusercontent.com/isabellacpmelo/starwars/main/assets/img/people/${character.name.replaceAll(
          ' ',
          '%20'
        )}.jpeg`"
        :alt="character.name"
        :title="character.name"
      />
    </nuxt-link>

    <div class="px-4 pt-4 pb-2 flex justify-between">
      <nuxt-link :to="`/${character.name.replaceAll(' ', '%20')}`">
        <h2
          class="text-center md:text-2xl text-banana-yellow font-star-wars-secondary"
        >
          {{ character.name.toLocaleLowerCase() }}
        </h2>
      </nuxt-link>
      <star-favorite :is-favorite="isFavorite" @click="toggleFavorite" />
    </div>
  </div>
</template>

<script>
import StarFavorite from './StarFavorite'

export default {
  name: 'PersonCard',
  components: {
    StarFavorite,
  },
  props: {
    character: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      localcharacter: {},
    }
  },
  computed: {
    isFavorite() {
      return this.localcharacter.isFavorite
    },
  },
  watch: {
    isChecked: {
      immediate: true,
      handler(newValue) {
        if (newValue) {
          const favorites = JSON.parse(localStorage.getItem('favorites')) || {}
          if (
            favorites[this.character.name] &&
            favorites[this.character.name].isFavorite
          ) {
            this.localcharacter.isFavorite = true
          } else {
            this.localcharacter.isFavorite = false
          }
        }
      },
    },
  },
  created() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || {}
    this.localcharacter = Object.assign({}, this.character, {
      isFavorite: favorites[this.character.name]
        ? favorites[this.character.name].isFavorite
        : false,
    })
  },

  methods: {
    toggleFavorite() {
      this.localcharacter.isFavorite = !this.localcharacter.isFavorite
      const favorites = JSON.parse(localStorage.getItem('favorites')) || {}

      const characterName = this.localcharacter.name
      const isAlreadySaved = !!favorites[characterName]

      if (this.localcharacter.isFavorite && !isAlreadySaved) {
        favorites[characterName] = this.localcharacter
      } else if (!this.localcharacter.isFavorite && isAlreadySaved) {
        delete favorites[characterName]
      }
      localStorage.setItem('favorites', JSON.stringify(favorites))
    },
  },
}
</script>
