<template>
  <div 
    :class="[
      'animated-card',
      `category-${category}`,
      { 'is-visible': isVisible }
    ]"
    :style="{ animationDelay: `${delay}ms` }"
    ref="cardRef"
  >
    <slot />
    <div class="card-glow"></div>
  </div>
</template>

<script>
export default {
  name: 'AnimatedCard',
  props: {
    category: {
      type: String,
      default: 'default',
      validator: (value) => ['web', 'business', 'mobile', 'education', 'experience', 'certification', 'skill', 'testimonial', 'default'].includes(value)
    },
    delay: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      isVisible: false
    }
  },
  mounted() {
    this.observeCard()
  },
  methods: {
    observeCard() {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              this.isVisible = true
              observer.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.1 }
      )
      
      if (this.$refs.cardRef) {
        observer.observe(this.$refs.cardRef)
      }
    }
  }
}
</script>

<style scoped>
.animated-card {
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.08);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  cursor: pointer;
  opacity: 0;
  transform: translateY(40px);
}

.animated-card.is-visible {
  animation: fadeInUp 0.8s ease-out forwards;
}

.animated-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 25px 35px -10px rgba(0, 0, 0, 0.12), 0 10px 15px -3px rgba(0, 0, 0, 0.08);
}

.animated-card:hover .card-glow {
  opacity: 0.15;
}

.card-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
  border-radius: 16px;
}

/* Category Colors */
.category-web {
  border-left: 4px solid #3b82f6;
}
.category-web .card-glow {
  background: radial-gradient(circle at center, rgba(59, 130, 246, 0.4) 0%, transparent 70%);
}

.category-business {
  border-left: 4px solid #10b981;
}
.category-business .card-glow {
  background: radial-gradient(circle at center, rgba(16, 185, 129, 0.4) 0%, transparent 70%);
}

.category-mobile {
  border-left: 4px solid #8b5cf6;
}
.category-mobile .card-glow {
  background: radial-gradient(circle at center, rgba(139, 92, 246, 0.4) 0%, transparent 70%);
}

.category-education {
  border-left: 4px solid #f59e0b;
}
.category-education .card-glow {
  background: radial-gradient(circle at center, rgba(245, 158, 11, 0.4) 0%, transparent 70%);
}

.category-experience {
  border-left: 4px solid #ef4444;
}
.category-experience .card-glow {
  background: radial-gradient(circle at center, rgba(239, 68, 68, 0.4) 0%, transparent 70%);
}

.category-certification {
  border-left: 4px solid #06b6d4;
}
.category-certification .card-glow {
  background: radial-gradient(circle at center, rgba(6, 182, 212, 0.4) 0%, transparent 70%);
}

.category-skill {
  border-left: 4px solid #84cc16;
}
.category-skill .card-glow {
  background: radial-gradient(circle at center, rgba(132, 204, 22, 0.4) 0%, transparent 70%);
}

.category-testimonial {
  border-left: 4px solid #ec4899;
}
.category-testimonial .card-glow {
  background: radial-gradient(circle at center, rgba(236, 72, 153, 0.4) 0%, transparent 70%);
}

.category-default .card-glow {
  background: radial-gradient(circle at center, rgba(107, 114, 128, 0.4) 0%, transparent 70%);
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Dark mode support */
.dark .animated-card {
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  border-color: #334155;
}

.dark .animated-card:hover {
  box-shadow: 0 25px 35px -10px rgba(0, 0, 0, 0.3), 0 10px 15px -3px rgba(0, 0, 0, 0.2);
}

@media (prefers-reduced-motion: reduce) {
  .animated-card {
    animation: none !important;
    transform: none !important;
    opacity: 1;
  }
  
  .animated-card:hover {
    transform: none;
  }
}
</style>