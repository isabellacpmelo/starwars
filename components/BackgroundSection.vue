<template>
  <section :class="`w-full ${bgClass} ${py} ${px}`">
    <div :class="`${containerClass} mx-auto`">
      <slot name="content" />
    </div>
  </section>
</template>

<script>
export default {
  props: {
    bgClass: {
      type: String,
      default: 'bg-white',
    },
    py: {
      type: String,
      default: 'py-16',
    },
    px: {
      type: String,
      default: 'px-6',
    },
    containerClass: {
      type: String,
      default: 'container',
    },
  },
}
</script>
