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
            class="flex justify-start md:justify-center items-center mx-8 my-2"
          >
            <label
              class="bg-black text-banana-yellow font-mono text-xl tracking-wide font-semibold mr-2"
            >
              Only your favorites:
            </label>
            <input
              v-model="onlyFavorites"
              type="checkbox"
              value=""
              class="w-4 h-4 text-yellow-400 bg-gray-100 border-gray-300 rounded focus:ring-yellow-500 dark:focus:ring-yellow-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
          <div
            class="md:flex md:flex-wrap justify-center max-h-[50vh] overflow-y-auto"
          >
            <div v-for="(character, index) in allData" :key="index" class="p-4">
              <div class="px-4">
                <character-card :character="character" />
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
import CharacterCard from '../components/CharacterCard'

export default {
  name: 'IndexPage',
  components: {
    HeroSection,
    CharacterCard,
  },
  data() {
    return {
      allData: [],
      loading: false,
      page: 1,
      onlyFavorites: false,
    }
  },
  watch: {
    onlyFavorites: function (value) {
      if (value) {
        const favoriteData = JSON.parse(localStorage.getItem('favorites')) || {}
        this.allData = favoriteData
      } else {
        this.allData = []
        this.fetchData(`https://swapi.dev/api/people/?page=1`)
      }
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

        data.results.forEach((character) => {
          const favoriteData =
            JSON.parse(localStorage.getItem('favorites')) || []
          const isFavorite =
            Array.isArray(favoriteData) &&
            favoriteData.some((favorite) => favorite.name === character.name)
          this.allData.push({ name: character.name, isFavorite })
        })
        if (!data.next) {
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
        if (entry.isIntersecting && !this.loading) {
          this.page++
          this.fetchData(`https://swapi.dev/api/people/?page=${this.page}`)
        }
      })
    },
  },
}
</script>

<style lang="postcss" scoped>
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

.check-box-class {
  @apply w-6 h-6 rounded;
  background: #ffe81f;
}
</style>
