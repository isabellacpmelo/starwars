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
            <div ref="endOfList"></div>
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
      reachedEnd: false,
    }
  },
  computed: {
    people() {
      return this.allData
    },
  },
  async mounted() {
    const options = {
      rootMargin: '0px',
      threshold: 1.0,
    }
    this.observer = new IntersectionObserver(this.handleIntersection, options)
    this.observer.observe(this.$refs.endOfList)
    await this.fetchData(`https://swapi.dev/api/people/?page=${this.page}`)
  },
  beforeDestroy() {
    if (this.observer) {
      this.observer.disconnect()
    }
  },
  methods: {
    async fetchData(url) {
      try {
        this.loading = true
        const res = await fetch(url)
        const data = await res.json()
        this.allData = this.allData.concat(data.results)
        if (!data.next) {
          this.reachedEnd = true
          this.observer.disconnect()
        }
        this.loading = false
      } catch (error) {
        console.log(error)
        this.loading = false
      }
    },
    handleIntersection(entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !this.loading && !this.reachedEnd) {
          this.page++
          this.fetchData(`https://swapi.dev/api/people/?page=${this.page}`)
        }
      })
    },
  },
}
</script>
