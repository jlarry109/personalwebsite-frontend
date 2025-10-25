<template>
  <div class="carousel-container">
    <div class="carousel-wrapper" @mouseenter="pauseAutoplay" @mouseleave="resumeAutoplay">
      <div class="carousel-track" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
        <div v-for="(image, index) in images" :key="index" class="carousel-slide">
          <img :src="getImageUrl(image)" :alt="`Screenshot ${index + 1}`" />
        </div>
      </div>
      
      <button v-if="images.length > 1" @click="prevSlide" class="carousel-btn prev">‹</button>
      <button v-if="images.length > 1" @click="nextSlide" class="carousel-btn next">›</button>
      
      <div v-if="images.length > 1" class="carousel-dots">
        <button 
          v-for="(_, index) in images" 
          :key="index"
          @click="goToSlide(index)"
          :class="['dot', { active: currentIndex === index }]">
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImageCarousel',
  props: {
    images: {
      type: Array,
      required: true
    },
    autoplay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 4000
    }
  },
  data() {
    return {
      currentIndex: 0,
      autoplayTimer: null
    }
  },
  mounted() {
    if (this.autoplay && this.images.length > 1) {
      this.startAutoplay()
    }
  },
  beforeUnmount() {
    this.stopAutoplay()
  },
  methods: {
    nextSlide() {
      this.currentIndex = (this.currentIndex + 1) % this.images.length
    },
    prevSlide() {
      this.currentIndex = this.currentIndex === 0 ? this.images.length - 1 : this.currentIndex - 1
    },
    goToSlide(index) {
      this.currentIndex = index
    },
    startAutoplay() {
      this.autoplayTimer = setInterval(this.nextSlide, this.interval)
    },
    stopAutoplay() {
      if (this.autoplayTimer) {
        clearInterval(this.autoplayTimer)
        this.autoplayTimer = null
      }
    },
    pauseAutoplay() {
      this.stopAutoplay()
    },
    resumeAutoplay() {
      if (this.autoplay && this.images.length > 1) {
        this.startAutoplay()
      }
    },
    getImageUrl(image) {
      return `${import.meta.env.BASE_URL}${image}`
    }
  }
}
</script>

<style scoped>
.carousel-container {
  width: 100%;
  height: 200px;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
}

.carousel-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
}

.carousel-track {
  display: flex;
  width: 100%;
  height: 100%;
  transition: transform 0.5s ease;
}

.carousel-slide {
  min-width: 100%;
  height: 100%;
}

.carousel-slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.carousel-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 2;
}

.carousel-btn:hover {
  background: rgba(0, 0, 0, 0.8);
  transform: translateY(-50%) scale(1.1);
}

.carousel-btn.prev {
  left: 10px;
}

.carousel-btn.next {
  right: 10px;
}

.carousel-dots {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 2;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: all 0.3s ease;
}

.dot.active {
  background: white;
  transform: scale(1.2);
}
</style>