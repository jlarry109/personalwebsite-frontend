<template>
  <div 
    :class="[
      'glassmorphism-card',
      `intensity-${intensity}`,
      { 'hover-effect': hoverEffect }
    ]"
    :style="cardStyle"
  >
    <div class="glass-overlay"></div>
    <div class="content">
      <slot />
    </div>
    <div class="border-glow"></div>
  </div>
</template>

<script>
export default {
  name: 'GlassmorphismCard',
  props: {
    intensity: {
      type: String,
      default: 'medium',
      validator: value => ['light', 'medium', 'heavy'].includes(value)
    },
    hoverEffect: {
      type: Boolean,
      default: true
    },
    backgroundColor: {
      type: String,
      default: 'rgba(255, 255, 255, 0.1)'
    },
    borderColor: {
      type: String,
      default: 'rgba(255, 255, 255, 0.2)'
    }
  },
  computed: {
    cardStyle() {
      return {
        '--bg-color': this.backgroundColor,
        '--border-color': this.borderColor
      }
    }
  }
}
</script>

<style scoped>
.glassmorphism-card {
  position: relative;
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.intensity-light {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.intensity-medium {
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}

.intensity-heavy {
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
}

.glass-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.1) 0%, 
    rgba(255, 255, 255, 0.05) 50%, 
    rgba(255, 255, 255, 0.1) 100%
  );
  pointer-events: none;
}

.content {
  position: relative;
  z-index: 2;
  padding: 24px;
}

.border-glow {
  position: absolute;
  top: -1px;
  left: -1px;
  right: -1px;
  bottom: -1px;
  background: linear-gradient(45deg, 
    rgba(99, 102, 241, 0.3), 
    rgba(139, 92, 246, 0.3), 
    rgba(6, 182, 212, 0.3)
  );
  border-radius: 16px;
  opacity: 0;
  transition: opacity 0.4s ease;
  z-index: -1;
}

.glassmorphism-card.hover-effect:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.glassmorphism-card.hover-effect:hover .border-glow {
  opacity: 1;
}

.glassmorphism-card.hover-effect:hover .glass-overlay {
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.15) 0%, 
    rgba(255, 255, 255, 0.08) 50%, 
    rgba(255, 255, 255, 0.15) 100%
  );
}

/* Dark mode support */
.dark .glassmorphism-card {
  --bg-color: rgba(15, 23, 42, 0.3);
  --border-color: rgba(51, 65, 85, 0.3);
}

.dark .glass-overlay {
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.05) 0%, 
    rgba(255, 255, 255, 0.02) 50%, 
    rgba(255, 255, 255, 0.05) 100%
  );
}

.dark .glassmorphism-card.hover-effect:hover .glass-overlay {
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.08) 0%, 
    rgba(255, 255, 255, 0.04) 50%, 
    rgba(255, 255, 255, 0.08) 100%
  );
}

@media (prefers-reduced-motion: reduce) {
  .glassmorphism-card {
    transition: none;
  }
  
  .glassmorphism-card.hover-effect:hover {
    transform: none;
  }
}
</style>