<template>
  <section>
    <HeroSection
      hero-image="bg-hero-pattern"
      title="Star Wars"
      subtitle="Escolha um dos persornagens abaixo para saber mais"
    />
    <BackgroundSection
      bg-class="bg-hero-pattern"
      py="0"
      class="bg-cover max-h-screen overflow-y-auto"
    >
      <template #content>
        <h1>Star Wars</h1>
        <ul class="text-banana-yellow">
          <li v-for="person in people" :key="person.name">
            {{ person.name }}
          </li>
        </ul>
      </template>
    </BackgroundSection>
  </section>
</template>

<script>
import BackgroundSection from '../components/BackgroundSection'
import HeroSection from '../components/HeroSection'

export default {
  name: 'IndexPage',
  components: {
    BackgroundSection,
    HeroSection,
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
