<template>
  <section>
    <HeroSection
      hero-image="bg-hero-pattern"
      title="Star Wars <br /> Catalogue"
      subtitle="Escolha um dos persornagens abaixo para saber mais"
    >
      <template #heroContent>
        <div
          ref="cardContainer"
          class="md:flex md:flex-wrap max-h-[50vh] overflow-y-auto"
          @scroll="handleScroll"
        >
          <div v-for="(person, index) in people" :key="index" class="w-1/3 p-4">
            <a href="#">
              <PersonCard :person-name="person.name" />
            </a>
          </div>
        </div>
      </template>
    </HeroSection>
  </section>
</template>

<script>
import HeroSection from '../components/HeroSection'
import PersonCard from '../components/PersonCard'

export default {
  name: 'IndexPage',
  components: {
    HeroSection,
    PersonCard,
  },
  data() {
    return {
      allData: [],
      nextUrl: null,
    }
  },
  async fetch() {
    await this.fetchData('https://swapi.dev/api/people')
  },
  computed: {
    people() {
      return this.allData
    },
  },
  methods: {
    async fetchData(url) {
      const res = await fetch(url)
      const data = await res.json()
      this.allData = this.allData.concat(data.results)
      this.nextUrl = data.next
    },
    handleScroll() {
      const container = this.$refs.cardContainer
      const containerBottom = container.offsetHeight + container.offsetTop
      const windowBottom = window.innerHeight + window.pageYOffset

      if (containerBottom < windowBottom && this.nextUrl !== null) {
        this.fetchData(this.nextUrl)
      }
    },
  },
}
</script>
