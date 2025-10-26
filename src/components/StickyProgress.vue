<template>
  <div class="sticky-progress" :class="{ visible: isVisible }">
    <div class="progress-bar">
      <div class="progress-fill" :style="{ width: `${progress}%` }"></div>
    </div>
    <div class="progress-text">{{ Math.round(progress) }}%</div>
  </div>
</template>

<script>
export default {
  name: 'StickyProgress',
  data() {
    return {
      progress: 0,
      isVisible: false
    }
  },
  mounted() {
    window.addEventListener('scroll', this.updateProgress, { passive: true })
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.updateProgress)
  },
  methods: {
    updateProgress() {
      const scrollTop = window.pageYOffset
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      this.progress = Math.min((scrollTop / docHeight) * 100, 100)
      this.isVisible = scrollTop > 100
    }
  }
}
</script>

<style scoped>
.sticky-progress {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  z-index: var(--z-sticky);
  opacity: 0;
  transform: translateY(-100%);
  transition: all 0.3s ease;
}

.sticky-progress.visible {
  opacity: 1;
  transform: translateY(0);
}

.progress-bar {
  height: 100%;
  background: rgba(255, 255, 255, 0.2);
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #6366f1, #8b5cf6, #06b6d4);
  transition: width 0.1s ease;
  position: relative;
}

.progress-fill::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 20px;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3));
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% { transform: translateX(-20px); }
  100% { transform: translateX(20px); }
}

.progress-text {
  position: absolute;
  right: var(--space-md);
  top: 50%;
  transform: translateY(-50%);
  font-size: var(--text-xs);
  color: white;
  font-weight: 600;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}
</style>