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
      loading: false,
      page: 1,
    }
  },
  computed: {
    people() {
      return this.allData
    },
  },
  async mounted() {
    await this.fetchData(`https://swapi.dev/api/people/?page=${this.page}`)
  },

  methods: {
    async fetchData(url) {
      try {
        this.loading = true
        const res = await fetch(url)
        const data = await res.json()
        this.allData = this.allData.concat(data.results.slice(0, 20))

        if (data.next) {
          this.page++
          await this.fetchData(
            `https://swapi.dev/api/people/?page=${this.page}`
          )
        } else {
          this.loading = false
        }
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>
