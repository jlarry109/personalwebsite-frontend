<template>
  <div class="skeleton-container">
    <div v-if="type === 'card'" class="skeleton-card">
      <div class="skeleton-image"></div>
      <div class="skeleton-content">
        <div class="skeleton-line title"></div>
        <div class="skeleton-line subtitle"></div>
        <div class="skeleton-line"></div>
        <div class="skeleton-line short"></div>
      </div>
    </div>
    
    <div v-else-if="type === 'timeline'" class="skeleton-timeline">
      <div class="skeleton-dot"></div>
      <div class="skeleton-timeline-content">
        <div class="skeleton-line title"></div>
        <div class="skeleton-line subtitle"></div>
        <div class="skeleton-line"></div>
      </div>
    </div>
    
    <div v-else-if="type === 'skill'" class="skeleton-skill">
      <div class="skeleton-line title"></div>
      <div class="skeleton-progress"></div>
    </div>
    
    <div v-else class="skeleton-text">
      <div class="skeleton-line" v-for="n in lines" :key="n" :class="{ short: n === lines }"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SkeletonLoader',
  props: {
    type: {
      type: String,
      default: 'text',
      validator: (value) => ['text', 'card', 'timeline', 'skill'].includes(value)
    },
    lines: {
      type: Number,
      default: 3
    }
  }
}
</script>

<style scoped>
.skeleton-container {
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

.skeleton-line {
  height: 16px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 4px;
  margin-bottom: 12px;
}

.skeleton-line.title {
  height: 20px;
  width: 70%;
}

.skeleton-line.subtitle {
  height: 14px;
  width: 50%;
}

.skeleton-line.short {
  width: 60%;
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.skeleton-card {
  background: #ffffff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.08);
  margin-bottom: 24px;
}

.skeleton-image {
  height: 200px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

.skeleton-content {
  padding: 24px;
}

.skeleton-timeline {
  display: flex;
  gap: 20px;
  margin-bottom: 40px;
}

.skeleton-dot {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  flex-shrink: 0;
}

.skeleton-timeline-content {
  flex: 1;
  padding-top: 8px;
}

.skeleton-skill {
  background: #ffffff;
  padding: 24px;
  border-radius: 16px;
  margin-bottom: 16px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.08);
}

.skeleton-progress {
  height: 10px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 6px;
  margin-top: 16px;
}

.dark .skeleton-line,
.dark .skeleton-image,
.dark .skeleton-dot,
.dark .skeleton-progress {
  background: linear-gradient(90deg, #374151 25%, #4b5563 50%, #374151 75%);
  background-size: 200% 100%;
}

.dark .skeleton-card,
.dark .skeleton-skill {
  background: #1e293b;
}
</style>