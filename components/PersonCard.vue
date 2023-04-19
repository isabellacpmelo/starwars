<template>
  <div
    class="w-72 md:w-96 p-4 bg-gray-950 border border-banana-yellow rounded-lg shadow"
  >
    <nuxt-link :to="`/${personName}`">
      <img
        class="rounded-lg border border-gray-900"
        :src="`https://raw.githubusercontent.com/isabellacpmelo/starwars/main/assets/img/people/${personName.replaceAll(
          ' ',
          '%20'
        )}.jpeg`"
        :alt="personName"
        :title="personName"
      />
    </nuxt-link>

    <div class="pt-4 pb-2">
      <nuxt-link :to="`/${personName}`">
        <h2
          class="text-center md:text-2xl text-banana-yellow font-star-wars-secondary"
        >
          {{ personName.toLocaleLowerCase() }}
        </h2>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PersonCard',
  props: {
    personName: {
      type: String,
      default: 'Luke Skywalker',
    },
    personSlug: {
      type: String,
      default: 'luke-skywalker',
    },
  },
}
</script>
