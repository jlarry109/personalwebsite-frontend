<template>
  <div v-show="isLoading" class="loading-progress">
    <div class="progress-bar" :style="{ width: progress + '%' }"></div>
  </div>
</template>

<script>
export default {
  name: 'LoadingProgress',
  data() {
    return {
      isLoading: false,
      progress: 0
    }
  },
  mounted() {
    this.startLoading();
  },
  methods: {
    startLoading() {
      this.isLoading = true;
      this.progress = 0;
      
      // Simulate loading progress
      const interval = setInterval(() => {
        if (this.progress < 90) {
          this.progress += Math.random() * 15;
        }
      }, 100);
      
      // Complete loading when page is fully loaded
      window.addEventListener('load', () => {
        this.progress = 100;
        setTimeout(() => {
          this.isLoading = false;
          clearInterval(interval);
        }, 300);
      });
      
      // Fallback to complete loading after 3 seconds
      setTimeout(() => {
        if (this.isLoading) {
          this.progress = 100;
          setTimeout(() => {
            this.isLoading = false;
            clearInterval(interval);
          }, 300);
        }
      }, 3000);
    }
  }
}
</script>

<style scoped>
.loading-progress {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  z-index: 9999;
  background: rgba(255, 255, 255, 0.1);
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #60a5fa, #a78bfa, #ec4899);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  transition: width 0.3s ease;
  border-radius: 0 2px 2px 0;
  box-shadow: 0 0 10px rgba(96, 165, 250, 0.5);
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
</style>