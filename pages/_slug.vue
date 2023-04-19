<template>
  <section>
    <hero-section hero-image="bg-hero-pattern" :title="name">
      <template #heroContent>
        <div class="md:flex items-center justify-between">
          <nuxt-link to="/">
            <button
              class="bg-banana-yellow text-gray-950 font-mono font-bold py-2 px-4 rounded-lg"
            >
              Back
            </button>
          </nuxt-link>
          <div class="md:w-1/2 px-8">
            <img
              :src="`https://raw.githubusercontent.com/isabellacpmelo/starwars/main/assets/img/people/${slug}.jpeg`"
              :alt="name"
              :title="name"
              class="w-auto h-44 md:h-96 rounded-lg border border-gray-900"
            />
          </div>
          <div class="text-banana-yellow font-mono text-2xl md:w-1/2 px-8">
            <ul>
              <li><span class="font-bold">Name:</span> {{ name }}</li>
              <li><span class="font-bold">Height: </span> {{ height }}</li>
              <li><span class="font-bold">Mass: </span>{{ mass }}</li>
              <li>
                <span class="font-bold">Hair Color: </span>{{ hairColor }}
              </li>
              <li>
                <span class="font-bold">Skin Color: </span>{{ skinColor }}
              </li>
              <li><span class="font-bold">Eye Color:</span> {{ eyeColor }}</li>
              <li>
                <span class="font-bold">Birth Year: {{ birthYear }} </span>/li>
              </li>

              <li><span class="font-bold">Gender: </span>{{ gender }}</li>
              <li><span class="font-bold">Homeworld:</span> {{ homeworld }}</li>
              <li><span class="font-bold">Films: </span>{{ films }}</li>
              <li><span class="font-bold">Species: </span>{{ species }}</li>
              <li><span class="font-bold">Vehicles: </span>{{ vehicles }}</li>
              <li><span class="font-bold">Starships: </span>{{ starships }}</li>
            </ul>
          </div>
        </div>
      </template>
    </hero-section>
  </section>
</template>
<script>
import HeroSection from '../components/HeroSection'

export default {
  components: {
    HeroSection,
  },
  data() {
    return {
      name: '',
      height: '',
      mass: '',
      hairColor: '',
      skinColor: '',
      eyeColor: '',
      birthYear: '',
      gender: '',
      homeworld: '',
      films: [],
      species: [],
      vehicles: [],
      starships: [],
      loading: false,
    }
  },
  computed: {
    slug() {
      return this.$route.params.slug
    },
    image() {
      // You can add an image URL for the person here
      return ''
    },
  },
  async mounted() {
    await this.fetchData(`https://swapi.dev/api/people/?search=${this.slug}`)
  },
  methods: {
    async fetchData(url) {
      try {
        this.loading = true
        const res = await fetch(url)
        const data = await res.json()
        const person = data.results[0]
        this.name = person.name
        this.height = person.height
        this.mass = person.mass
        this.hairColor = person.hair_color
        this.skinColor = person.skin_color
        this.eyeColor = person.eye_color
        this.birthYear = person.birth_year
        this.gender = person.gender
        this.homeworld = person.homeworld
        this.films = person.films
        this.species = person.species
        this.vehicles = person.vehicles
        this.starships = person.starships
        this.loading = false
      } catch (error) {
        console.log(error)
        this.loading = false
      }
    },
  },
}
</script>
