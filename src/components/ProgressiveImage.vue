<template>
  <div class="progressive-image" :class="{ loaded: imageLoaded }">
    <img
      v-if="placeholder"
      :src="placeholder"
      :alt="alt"
      class="placeholder-image"
      :class="{ hidden: imageLoaded }"
    />
    <img
      :src="src"
      :alt="alt"
      class="main-image"
      :class="{ loaded: imageLoaded }"
      @load="onImageLoad"
      @error="onImageError"
    />
    <div v-if="!imageLoaded && !error" class="loading-overlay">
      <div class="loading-spinner"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProgressiveImage',
  props: {
    src: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      default: null
    },
    alt: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      imageLoaded: false,
      error: false
    }
  },
  methods: {
    onImageLoad() {
      this.imageLoaded = true
      this.error = false
    },
    onImageError() {
      this.error = true
    }
  }
}
</script>

<style scoped>
.progressive-image {
  position: relative;
  overflow: hidden;
  background: #f3f4f6;
}

.placeholder-image,
.main-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.6s ease;
}

.placeholder-image {
  position: absolute;
  top: 0;
  left: 0;
  filter: blur(10px);
  transform: scale(1.1);
}

.placeholder-image.hidden {
  opacity: 0;
}

.main-image {
  opacity: 0;
  filter: blur(5px);
  transform: scale(1.05);
}

.main-image.loaded {
  opacity: 1;
  filter: blur(0);
  transform: scale(1);
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(4px);
}

.loading-spinner {
  width: 32px;
  height: 32px;
  border: 3px solid #e5e7eb;
  border-top: 3px solid #6366f1;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.dark .loading-overlay {
  background: rgba(15, 23, 42, 0.8);
}

.dark .loading-spinner {
  border-color: #374151;
  border-top-color: #6366f1;
}
</style>