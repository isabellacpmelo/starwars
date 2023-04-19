<template>
  <div>
    <h1>Página do Slug: {{ slug }}</h1>
  </div>
</template>

<script>
export default {
  computed: {
    slug() {
      return this.$route.params.slug
    },
  },
}
</script>
