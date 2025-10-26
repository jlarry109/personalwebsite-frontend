<template>
  <div 
    v-show="showButton" 
    class="scroll-to-top"
    @click="scrollToTop"
    :class="{ visible: showButton }"
  >
    <div class="progress-ring">
      <svg class="progress-circle" width="50" height="50">
        <circle
          class="progress-circle-bg"
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke="rgba(255,255,255,0.2)"
          stroke-width="3"
        />
        <circle
          class="progress-circle-fill"
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke="url(#gradient)"
          stroke-width="3"
          stroke-linecap="round"
          :stroke-dasharray="circumference"
          :stroke-dashoffset="dashOffset"
          transform="rotate(-90 25 25)"
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#60a5fa"/>
            <stop offset="100%" style="stop-color:#a78bfa"/>
          </linearGradient>
        </defs>
      </svg>
    </div>
    <i class="fas fa-arrow-up"></i>
  </div>
</template>

<script>
export default {
  name: 'ScrollToTop',
  data() {
    return {
      showButton: false,
      scrollProgress: 0,
      circumference: 2 * Math.PI * 20
    }
  },
  computed: {
    dashOffset() {
      return this.circumference - (this.scrollProgress / 100) * this.circumference;
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      this.scrollProgress = (scrollTop / scrollHeight) * 100;
      this.showButton = scrollTop > 300;
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }
}
</script>

<style scoped>
.scroll-to-top {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 50px;
  height: 50px;
  background: rgba(30, 41, 59, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1000;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0;
  transform: translateY(20px) scale(0.8);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.scroll-to-top.visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.scroll-to-top:hover {
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

.progress-ring {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.progress-circle {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.progress-circle-fill {
  transition: stroke-dashoffset 0.1s ease;
}

.scroll-to-top i {
  color: white;
  font-size: 1rem;
  z-index: 1;
  transition: transform 0.3s ease;
}

.scroll-to-top:hover i {
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .scroll-to-top {
    bottom: 1rem;
    right: 1rem;
    width: 45px;
    height: 45px;
  }
  
  .scroll-to-top i {
    font-size: 0.875rem;
  }
}
</style>