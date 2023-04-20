<template>
  <div
    class="w-72 md:w-96 md:h-80 p-4 bg-gray-950 border border-banana-yellow rounded-lg shadow"
  >
    <nuxt-link :to="`/${person.name.replaceAll(' ', '%20')}`">
      <img
        class="rounded-lg border border-gray-900"
        :src="`https://raw.githubusercontent.com/isabellacpmelo/starwars/main/assets/img/people/${person.name.replaceAll(
          ' ',
          '%20'
        )}.jpeg`"
        :alt="person.name"
        :title="person.name"
      />
    </nuxt-link>

    <div class="px-4 pt-4 pb-2 flex justify-between">
      <nuxt-link :to="`/${person.name.replaceAll(' ', '%20')}`">
        <h2
          class="text-center md:text-2xl text-banana-yellow font-star-wars-secondary"
        >
          {{ person.name.toLocaleLowerCase() }}
        </h2>
      </nuxt-link>
      <star-favorite
        :is-favorite="isFavorite"
        @toggle-favorite="toggleFavorite"
      />
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
    person: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    isFavorite() {
      return this.person.isFavorite
    },
  },
  methods: {
    toggleFavorite() {
      this.$emit('update:person', this.person)
    },
  },
}
</script>
