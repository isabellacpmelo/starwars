<template>
  <section>
    <hero-section
      hero-image="bg-hero-pattern"
      :title="name.toLocaleLowerCase()"
    >
      <template #heroContent>
        <div class="flex flex-col md:flex-row items-center justify-between">
          <nuxt-link to="/">
            <button
              class="bg-banana-yellow text-gray-950 font-mono font-bold py-2 px-4 rounded-lg mb-4 md:mb-0"
            >
              Back
            </button>
          </nuxt-link>
          <div class="w-full md:w-1/2 px-8">
            <img
              :src="personImage"
              :alt="name"
              :title="name"
              class="w-full h-auto rounded-lg border border-gray-900"
            />
          </div>
          <div class="w-full md:w-1/2 px-8 mt-4 md:mt-0">
            <ul class="text-banana-yellow font-mono text-lg md:text-2xl">
              <li><span class="font-extrabold">Name:</span> {{ name }}</li>
              <li><span class="font-extrabold">Height: </span> {{ height }}</li>
              <li><span class="font-extrabold">Mass: </span>{{ mass }}</li>
              <li>
                <span class="font-extrabold">Hair Color: </span>{{ hairColor }}
              </li>
              <li>
                <span class="font-extrabold">Skin Color: </span>{{ skinColor }}
              </li>
              <li>
                <span class="font-extrabold">Eye Color:</span> {{ eyeColor }}
              </li>
              <li>
                <span class="font-extrabold">Birth Year: {{ birthYear }} </span>
              </li>
              <li><span class="font-extrabold">Gender: </span>{{ gender }}</li>
              <li>
                <span class="font-extrabold">Homeworld:</span> {{ homeworld }}
              </li>
              <li>
                <span class="font-extrabold">Films: </span
                >{{ replaceMovies(films.toString()) }}
              </li>
              <li>
                <span class="font-extrabold">Species: </span
                >{{ replaceMovies(species.toString()) }}
              </li>
              <li>
                <span class="font-extrabold">Vehicles: </span
                >{{ replaceMovies(vehicles.toString()) }}
              </li>
              <li>
                <span class="font-extrabold">Starships: </span
                >{{ replaceMovies(starships.toString()) }}
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
      loading: false,
    }
  },
  computed: {
    slug() {
      return this.$route.params.slug
    },
    personImage() {
      return `https://raw.githubusercontent.com/isabellacpmelo/starwars/main/assets/img/people/${this.slug}.jpeg`
    },
  },
  async mounted() {
    try {
      this.loading = true
      const res = await fetch(
        `https://swapi.dev/api/people/?search=${this.slug}`
      )
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
      this.loading = false
      const homeworldRes = await fetch(person.homeworld)
      const homeworldData = await homeworldRes.json()
      this.homeworld = homeworldData.name

      const filmsData = []
      for (const film of person.films) {
        const filmRes = await fetch(film)
        const filmData = await filmRes.json()
        filmsData.push(filmData.title)
      }
      this.films = filmsData

      const speciesData = []
      if (person.species.length > 0) {
        for (const specie of person.species) {
          const specieRes = await fetch(specie)
          const specieData = await specieRes.json()
          speciesData.push(specieData.name)
        }
        this.species = speciesData
      } else {
        this.species = 'Human'
      }

      const vehiclesData = []
      if (person.vehicles.length > 0) {
        for (const vehicle of person.vehicles) {
          const vehicleRes = await fetch(vehicle)
          const vehicleData = await vehicleRes.json()
          vehiclesData.push(vehicleData.name)
        }
        this.vehicles = vehiclesData
      } else {
        this.vehicles = 'n/a'
      }

      const starshipsData = []
      if (person.starships.length > 0) {
        for (const starship of person.starships) {
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
