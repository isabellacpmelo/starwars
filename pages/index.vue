<template>
  <Tutorial />
</template>

<script>
export default {
  name: 'IndexPage',
  // criar chamada fetch para a api https://swapi.dev/api/
  async fetch() {
    const res = await fetch('https://swapi.dev/api/')
    const data = await res.json()
    return { data }
  },
}
</script>
