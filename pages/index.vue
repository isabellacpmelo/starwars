<template>
  <section>
    <BackgroundSection bg-class="bg-hero-pattern" class="bg-cover min-h-screen">
      <template #content>
        <div class="justify-between flex flex-col fit-submenu">
          <div
            class="pt-8 lg:pt-12 xl:pt-36 pb-6 lg:pb-0 my-6 lg:mt-0 lg:mb-0 border-b border-solid border-gray-700 border-opacity-20"
          >
            <h1 class="text-7xl font-medium text-white">Star Wars</h1>
          </div>
        </div>
      </template>
    </BackgroundSection>
    <h1>Star Wars</h1>
    <ul>
      <li v-for="person in people" :key="person.name">
        {{ person.name }}
      </li>
    </ul>
  </section>
</template>

<script>
import BackgroundSection from '../components/BackgroundSection.vue'

export default {
  name: 'IndexPage',
  components: {
    BackgroundSection,
  },
  data() {
    return {
      allData: [],
    }
  },
  async fetch() {
    await this.fetchData('https://swapi.dev/api/people')
  },
  computed: {
    people() {
      const people = this.allData
      return people
    },
  },
  methods: {
    async fetchData(url) {
      const res = await fetch(url)
      const data = await res.json()
      this.allData = this.allData.concat(data.results)

      if (data.next) {
        // if there is a next page, fetch it
        await this.fetchData(data.next)
      }
    },
  },
}
</script>
