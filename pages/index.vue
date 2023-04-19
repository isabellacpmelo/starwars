<template>
  <section>
    <HeroSection
      hero-image="bg-hero-pattern"
      title="Star Wars <br /> Catalogue"
      subtitle="Escolha um dos persornagens abaixo para saber mais"
    >
      <template #heroContent>
        <div>
          <div class="md:flex md:flex-wrap max-h-[50vh] overflow-y-auto">
            <div
              v-for="(person, index) in people"
              :key="index"
              class="w-1/3 p-4"
            >
              <a href="#">
                <PersonCard :person-name="person.name" />
              </a>
            </div>
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
