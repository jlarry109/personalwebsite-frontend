<template>
  <span class="animated-counter">{{ displayValue }}</span>
</template>

<script>
export default {
  name: 'AnimatedCounter',
  props: {
    value: {
      type: Number,
      required: true
    },
    duration: {
      type: Number,
      default: 1000
    },
    suffix: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      displayValue: 0,
      startTime: null,
      animationId: null
    }
  },
  mounted() {
    this.startAnimation()
  },
  methods: {
    startAnimation() {
      this.startTime = performance.now()
      this.animate()
    },
    animate() {
      const currentTime = performance.now()
      const elapsed = currentTime - this.startTime
      const progress = Math.min(elapsed / this.duration, 1)
      
      // Easing function for smooth animation
      const easeOut = 1 - Math.pow(1 - progress, 3)
      this.displayValue = Math.floor(this.value * easeOut) + this.suffix
      
      if (progress < 1) {
        this.animationId = requestAnimationFrame(this.animate)
      }
    }
  },
  beforeUnmount() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId)
    }
  }
}
</script>

<style scoped>
.animated-counter {
  font-weight: 600;
  color: #6366f1;
}
</style>