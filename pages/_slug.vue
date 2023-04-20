<template>
  <section>
    <hero-section
      hero-image="bg-hero-pattern"
      :title="name.toLocaleLowerCase()"
    >
      <template #heroContent>
        <div class="flex flex-col md:flex-row items-center justify-between">
          <div class="w-full md:w-1/2 px-8">
            <nuxt-link to="/">
              <button
                class="bg-banana-yellow text-gray-950 font-mono font-bold py-2 px-4 rounded-lg my-2 md:mb-0"
              >
                Back
              </button>
            </nuxt-link>
            <img
              :src="characterImage"
              :alt="name"
              :title="name"
              class="w-full h-auto rounded-lg border border-gray-900 mt-6"
            />
          </div>
          <div class="w-full md:w-1/2 px-8 my-4 md:my-0">
            <ul class="text-banana-yellow font-mono capitalize md:text-lg">
              <li class="pb-1">
                <span class="font-extrabold">Name: </span> {{ name }}
              </li>
              <li class="pb-1">
                <span class="font-extrabold">Height: </span> {{ height }}
              </li>
              <li class="pb-1">
                <span class="font-extrabold">Mass: </span> {{ mass }}
              </li>
              <li class="pb-1">
                <span class="font-extrabold">Hair Color: </span> {{ hairColor }}
              </li>
              <li class="pb-1">
                <span class="font-extrabold">Skin Color: </span> {{ skinColor }}
              </li>
              <li class="pb-1">
                <span class="font-extrabold">Eye Color: </span> {{ eyeColor }}
              </li>
              <li class="pb-1">
                <span class="font-extrabold">Birth Year: </span> {{ birthYear }}
              </li>
              <li class="pb-1">
                <span class="font-extrabold">Gender: </span> {{ gender }}
              </li>
              <li class="pb-1">
                <span class="font-extrabold">Homeworld: </span>
                {{ homeworld }}
              </li>
              <li class="pb-1">
                <span class="font-extrabold">Films: </span>
                {{ replaceMovies(films.toString()) }}
              </li>
              <li class="pb-1">
                <span class="font-extrabold">Species: </span>
                {{ replaceMovies(species.toString()) }}
              </li>
              <li class="pb-1">
                <span class="font-extrabold"> Vehicles: </span>
                {{ replaceMovies(vehicles.toString()) }}
              </li>
              <li>
                <span class="font-extrabold"> Starships: </span>
                {{ replaceMovies(starships.toString()) }}
              </li>
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
    }
  },
  head() {
    return {
      title: `${this.name} | Star Wars`,
    }
  },
  computed: {
    slug() {
      return this.$route.params.slug
    },
    characterImage() {
      return `https://raw.githubusercontent.com/isabellacpmelo/starwars/main/assets/img/people/${this.slug}.jpeg`
    },
  },
  async mounted() {
    try {
      const res = await fetch(
        `https://swapi.dev/api/people/?search=${this.slug}`
      )
      const data = await res.json()
      const character = data.results[0]
      this.name = character.name
      this.height = character.height
      this.mass = character.mass
      this.hairColor = character.hair_color
      this.skinColor = character.skin_color
      this.eyeColor = character.eye_color
      this.birthYear = character.birth_year
      this.gender = character.gender
      const homeworldRes = await fetch(character.homeworld)
      const homeworldData = await homeworldRes.json()
      this.homeworld = homeworldData.name

      const filmsData = []
      for (const film of character.films) {
        const filmRes = await fetch(film)
        const filmData = await filmRes.json()
        filmsData.push(filmData.title)
      }
      this.films = filmsData

      const speciesData = []
      if (character.species.length > 0) {
        for (const specie of character.species) {
          const specieRes = await fetch(specie)
          const specieData = await specieRes.json()
          speciesData.push(specieData.name)
        }
        this.species = speciesData
      } else {
        this.species = 'Human'
      }

      const vehiclesData = []
      if (character.vehicles.length > 0) {
        for (const vehicle of character.vehicles) {
          const vehicleRes = await fetch(vehicle)
          const vehicleData = await vehicleRes.json()
          vehiclesData.push(vehicleData.name)
        }
        this.vehicles = vehiclesData
      } else {
        this.vehicles = 'n/a'
      }

      const starshipsData = []
      if (character.starships.length > 0) {
        for (const starship of character.starships) {
          const starshipRes = await fetch(starship)
          const starshipData = await starshipRes.json()
          starshipsData.push(starshipData.name)
        }
        this.starships = starshipsData
      } else {
        this.starships = 'n/a'
      }
    } catch (error) {
      console.error(error)
    }
  },
  methods: {
    replaceMovies(text) {
      return text.replace(/\[|\]|"/g, '')
    },
  },
}
</script>
