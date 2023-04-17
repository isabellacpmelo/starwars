<template>
  <div>
    <h1>Star Wars</h1>
    <ul>
      <li v-for="person in people" :key="person.name">
        {{ person.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
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
