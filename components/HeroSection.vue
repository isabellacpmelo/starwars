<template>
  <section>
    <background-section
      :background="heroImage"
      class="bg-cover min-h-screen"
      py="8"
      px="4"
    >
      <template #content>
        <section class="flex items-center justify-center">
          <div class="container">
            <div
              class="flex flex-col justify-center items-center font-star-wars text-banana-yellow p-6"
            >
              <h1
                class="mb-4 text-4xl md:text-6xl font-medium"
                v-html="title"
              ></h1>
              <p class="my-3 md:text-lg">
                {{ subtitle }}
              </p>
            </div>
            <div>
              <slot name="heroContent"></slot>
            </div>
          </div>
        </section>
      </template>
    </background-section>
  </section>
</template>

<script>
import BackgroundSection from '../components/BackgroundSection'

export default {
  name: 'HeroSection',
  components: {
    BackgroundSection,
  },
  props: {
    heroImage: {
      type: String,
      default: 'bg-hero-pattern',
    },
    title: {
      type: String,
      default: 'Star Wars',
    },
    subtitle: {
      type: String,
      default: '',
    },
  },
}
</script>
