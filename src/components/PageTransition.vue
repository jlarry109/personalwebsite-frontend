<template>
  <Transition
    :name="transitionName"
    mode="out-in"
    @enter="onEnter"
    @leave="onLeave"
  >
    <slot />
  </Transition>
</template>

<script>
export default {
  name: 'PageTransition',
  props: {
    name: {
      type: String,
      default: 'page'
    },
    stagger: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    transitionName() {
      return this.stagger ? 'stagger' : this.name
    }
  },
  methods: {
    onEnter(el) {
      if (this.stagger) {
        this.staggerElements(el)
      }
    },
    onLeave(el) {
      // Clean up any stagger delays
      const elements = el.querySelectorAll('.animate-stagger')
      elements.forEach(element => {
        element.style.transitionDelay = '0ms'
      })
    },
    staggerElements(el) {
      const elements = el.querySelectorAll('.animate-stagger, .card, .skill-item, .project-card')
      elements.forEach((element, index) => {
        element.style.setProperty('--stagger-delay', `${index * 100}ms`)
        element.classList.add('animate-stagger')
      })
    }
  }
}
</script>

<style scoped>
/* Enhanced page transitions with stagger support */
.page-enter-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.page-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.6, 1);
}

.page-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.stagger-enter-active {
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.stagger-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.stagger-enter-to {
  opacity: 1;
  transform: translateY(0);
}
</style>