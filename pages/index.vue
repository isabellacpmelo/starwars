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
                <person-card
                  :person="person"
                  :is-favorite="person.isFavorite"
                  @toggle-favorite="updateFavorite(index)"
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
      favorites: [], // adicionando a propriedade 'favorites' com um valor inicial vazio
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
    this.loadFavorites()
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
        data.results.forEach((person) => {
          this.allData.push({ name: person.name, isFavorite: false })
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
    updateFavorite(index) {
      this.allData[index].isFavorite = !this.allData[index].isFavorite
      this.saveFavorites()
    },
    saveFavorites() {
      const favorites = this.allData.filter((person) => person.isFavorite)
      localStorage.setItem('favorites', JSON.stringify(favorites))
    },
    loadFavorites() {
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
      this.favorites = Array.isArray(favorites)
        ? favorites
        : Object.values(favorites)
      this.allData.forEach((person) => {
        person.isFavorite = this.favorites.some(
          (favorite) => favorite.name === person.name
        )
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
