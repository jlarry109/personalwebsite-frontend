<template>
  <div 
    ref="parallaxContainer" 
    class="parallax-container"
    :style="parallaxStyle"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'ParallaxContainer',
  props: {
    speed: {
      type: Number,
      default: 0.5
    },
    direction: {
      type: String,
      default: 'vertical',
      validator: value => ['vertical', 'horizontal'].includes(value)
    }
  },
  data() {
    return {
      scrollY: 0,
      scrollX: 0
    }
  },
  computed: {
    parallaxStyle() {
      const translateY = this.direction === 'vertical' ? this.scrollY * this.speed : 0
      const translateX = this.direction === 'horizontal' ? this.scrollX * this.speed : 0
      return {
        transform: `translate3d(${translateX}px, ${translateY}px, 0)`
      }
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll, { passive: true })
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      this.scrollY = window.pageYOffset
      this.scrollX = window.pageXOffset
    }
  }
}
</script>

<style scoped>
.parallax-container {
  will-change: transform;
}
</style>