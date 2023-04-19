<template>
  <section :class="`w-full ${background} ${py} ${px}`">
    <div :class="`${containerClass} mx-auto`">
      <slot name="content"></slot>
    </div>
  </section>
</template>

<script>
export default {
  name: 'BackgroundSection',
  props: {
    background: {
      type: String,
      default: 'bg-black',
    },
    containerClass: {
      type: String,
      default: 'container',
    },
    py: {
      type: String,
      default: 'py-0',
    },
    px: {
      type: String,
      default: 'px-0',
    },
  },
}
</script>
