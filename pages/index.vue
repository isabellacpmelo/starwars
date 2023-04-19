<template>
  <section>
    <hero-section
      hero-image="bg-hero-pattern"
      title="Star Wars <br /> Catalogue"
      subtitle="Choose a character below and click to learn more"
    >
      <template #heroContent>
        <div>
          <div
            class="md:flex md:flex-wrap justify-center max-h-[50vh] overflow-y-auto"
          >
            <div v-for="(person, index) in people" :key="index" class="p-4">
              <div class="px-4">
                <PersonCard
                  :person-name="person.name"
                  :person-slug="person.slug"
                />
              </div>
            </div>
            <div ref="endOfList"></div>
          </div>
        </div>
      </template>
    </hero-section>
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
    processName(name) {
      // remove accents and convert to lowercase
      let slug = name
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
      // replace spaces with hyphens
      slug = slug.replace(/ /g, '-')
      return slug
    },
    async fetchData(url) {
      try {
        this.loading = true
        const res = await fetch(url)
        const data = await res.json()
        // process each person's name and add to allData array
        data.results.forEach((person) => {
          const slug = this.processName(person.name)
          this.allData.push({ name: person.name, slug })
        })
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

<style>
::-webkit-scrollbar {
  display: none;
  width: 2px; /* Width Scrollbar */
}

::-webkit-scrollbar-track {
  background: #00000000; /* Background color scrollbar */
}

::-webkit-scrollbar-thumb {
  background-color: #ffe81f; /* Scrollbar button color */
  border-radius: 20px;
}
</style>
