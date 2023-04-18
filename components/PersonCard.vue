<template>
  <div
    class="max-w-md p-6 bg-gray-950 border border-banana-yellow rounded-lg shadow"
  >
    <img
      class="rounded-lg border border-gray-900"
      src="~/assets/img/home-background.png"
      alt=""
    />
    <div class="p-5">
      <h2 class="mb-2 text-2xl text-center text-banana-yellow">
        {{ personName }}
      </h2>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PersonCard',
  props: {
    personName: {
      type: String,
      default: 'Luke Skywalker',
    },
  },
}
</script>
