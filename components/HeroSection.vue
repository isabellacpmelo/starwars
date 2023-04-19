<template>
  <section>
    <BackgroundSection
      :bg-class="heroImage"
      class="bg-cover min-h-screen"
      py="16"
    >
      <template #content>
        <section class="flex items-center justify-center">
          <div class="container">
            <div
              class="flex flex-col justify-center items-center font-star-wars text-banana-yellow p-8"
            >
              <h1
                class="mb-6 text-5xl md:text-8xl font-medium"
                v-html="title"
              ></h1>
              <p class="my-6 md:text-xl">
                {{ subtitle }}
              </p>
            </div>
            <div>
              <slot name="heroContent" />
            </div>
          </div>
        </section>
      </template>
    </BackgroundSection>
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
      default: 'Escolha um dos persornagens abaixo para saber mais',
    },
  },
}
</script>
