<template>
  <div 
    ref="revealContainer"
    :class="[
      'smooth-reveal',
      `reveal-${direction}`,
      { 'is-visible': isVisible }
    ]"
    :style="{ 
      animationDelay: `${delay}ms`,
      animationDuration: `${duration}ms`
    }"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'SmoothReveal',
  props: {
    direction: {
      type: String,
      default: 'up',
      validator: value => ['up', 'down', 'left', 'right', 'fade', 'scale', 'rotate'].includes(value)
    },
    delay: {
      type: Number,
      default: 0
    },
    duration: {
      type: Number,
      default: 800
    },
    threshold: {
      type: Number,
      default: 0.1
    },
    triggerOnce: {
      type: Boolean,
      default: true
    },
    stagger: {
      type: Boolean,
      default: false
    },
    staggerDelay: {
      type: Number,
      default: 100
    }
  },
  data() {
    return {
      isVisible: false,
      observer: null
    }
  },
  mounted() {
    this.initObserver()
    
    if (this.stagger) {
      this.initStaggerAnimation()
    }
  },
  beforeUnmount() {
    if (this.observer) {
      this.observer.disconnect()
    }
  },
  methods: {
    initObserver() {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              this.isVisible = true
              
              if (this.triggerOnce) {
                this.observer.unobserve(entry.target)
              }
            } else if (!this.triggerOnce) {
              this.isVisible = false
            }
          })
        },
        {
          threshold: this.threshold,
          rootMargin: '0px 0px -50px 0px'
        }
      )
      
      this.observer.observe(this.$refs.revealContainer)
    },
    
    initStaggerAnimation() {
      // Find all child elements that should be staggered
      const children = this.$refs.revealContainer.children
      
      Array.from(children).forEach((child, index) => {
        child.style.animationDelay = `${this.delay + (index * this.staggerDelay)}ms`
        child.classList.add('stagger-item')
      })
    }
  }
}
</script>

<style scoped>
.smooth-reveal {
  opacity: 0;
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Direction-based initial states */
.reveal-up {
  transform: translateY(40px);
}

.reveal-down {
  transform: translateY(-40px);
}

.reveal-left {
  transform: translateX(40px);
}

.reveal-right {
  transform: translateX(-40px);
}

.reveal-fade {
  transform: none;
}

.reveal-scale {
  transform: scale(0.8);
}

.reveal-rotate {
  transform: rotate(-10deg) scale(0.8);
}

/* Visible states */
.smooth-reveal.is-visible {
  opacity: 1;
  transform: translateY(0) translateX(0) scale(1) rotate(0);
}

/* Stagger animation for child elements */
.stagger-item {
  opacity: 0;
  transform: translateY(20px);
  animation: staggerFadeIn 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

@keyframes staggerFadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Enhanced animations for different directions */
.reveal-up.is-visible {
  animation: slideInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

.reveal-down.is-visible {
  animation: slideInDown 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

.reveal-left.is-visible {
  animation: slideInLeft 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

.reveal-right.is-visible {
  animation: slideInRight 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

.reveal-fade.is-visible {
  animation: fadeIn 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

.reveal-scale.is-visible {
  animation: scaleIn 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

.reveal-rotate.is-visible {
  animation: rotateIn 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInDown {
  from {
    opacity: 0;
    transform: translateY(-40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(40px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(-40px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes rotateIn {
  from {
    opacity: 0;
    transform: rotate(-10deg) scale(0.8);
  }
  to {
    opacity: 1;
    transform: rotate(0) scale(1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .smooth-reveal,
  .stagger-item {
    animation: none !important;
    transition: none !important;
    opacity: 1 !important;
    transform: none !important;
  }
}
</style>