<template>
  <div class="skeleton-container" :class="[animation]">
    <div v-if="type === 'card'" class="skeleton-card">
      <div class="skeleton-image"></div>
      <div class="skeleton-content">
        <div class="skeleton-line title"></div>
        <div class="skeleton-line subtitle"></div>
        <div class="skeleton-line"></div>
        <div class="skeleton-line short"></div>
        <div class="skeleton-actions">
          <div class="skeleton-button"></div>
          <div class="skeleton-button small"></div>
        </div>
      </div>
    </div>
    
    <div v-else-if="type === 'profile'" class="skeleton-profile">
      <div class="skeleton-avatar large"></div>
      <div class="skeleton-content">
        <div class="skeleton-line title"></div>
        <div class="skeleton-line subtitle"></div>
        <div class="skeleton-line"></div>
        <div class="skeleton-tags">
          <div v-for="n in 3" :key="n" class="skeleton-tag"></div>
        </div>
      </div>
    </div>
    
    <div v-else-if="type === 'list'" class="skeleton-list">
      <div v-for="n in count" :key="n" class="skeleton-list-item" :style="{ animationDelay: `${n * 100}ms` }">
        <div class="skeleton-avatar"></div>
        <div class="skeleton-content">
          <div class="skeleton-line title"></div>
          <div class="skeleton-line"></div>
        </div>
        <div class="skeleton-icon"></div>
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
    
    <div v-else-if="type === 'grid'" class="skeleton-grid">
      <div v-for="n in count" :key="n" class="skeleton-grid-item" :style="{ animationDelay: `${n * 50}ms` }">
        <div class="skeleton-image small"></div>
        <div class="skeleton-line title short"></div>
        <div class="skeleton-line"></div>
      </div>
    </div>
    
    <div v-else class="skeleton-text">
      <div class="skeleton-line" v-for="n in lines" :key="n" :class="{ short: n === lines }" :style="{ animationDelay: `${n * 50}ms` }"></div>
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
      validator: (value) => ['text', 'card', 'timeline', 'skill', 'profile', 'list', 'grid'].includes(value)
    },
    animation: {
      type: String,
      default: 'shimmer',
      validator: (value) => ['shimmer', 'pulse', 'wave'].includes(value)
    },
    lines: {
      type: Number,
      default: 3
    },
    count: {
      type: Number,
      default: 3
    }
  }
}
</script>

<style scoped>
/* Animation Types */
.skeleton-container.shimmer .skeleton-line,
.skeleton-container.shimmer .skeleton-image,
.skeleton-container.shimmer .skeleton-dot,
.skeleton-container.shimmer .skeleton-progress,
.skeleton-container.shimmer .skeleton-avatar,
.skeleton-container.shimmer .skeleton-button,
.skeleton-container.shimmer .skeleton-tag,
.skeleton-container.shimmer .skeleton-icon {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

.skeleton-container.pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.skeleton-container.wave {
  position: relative;
  overflow: hidden;
}

.skeleton-container.wave::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  transform: translateX(-100%);
  animation: wave 1.6s infinite;
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

@keyframes wave {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

/* Base Elements */
.skeleton-line {
  height: 16px;
  background: #e9ecef;
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

/* Card Skeleton */
.skeleton-card {
  background: #ffffff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.08);
  margin-bottom: 24px;
}

.skeleton-image {
  height: 200px;
  background: #e9ecef;
}

.skeleton-image.small {
  height: 120px;
}

.skeleton-content {
  padding: 24px;
}

.skeleton-actions {
  display: flex;
  gap: 12px;
  margin-top: 16px;
}

.skeleton-button {
  height: 36px;
  width: 100px;
  background: #e9ecef;
  border-radius: 6px;
}

.skeleton-button.small {
  width: 60px;
  height: 32px;
}

/* Profile Skeleton */
.skeleton-profile {
  display: flex;
  gap: 20px;
  padding: 24px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.08);
  margin-bottom: 24px;
}

.skeleton-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #e9ecef;
  flex-shrink: 0;
}

.skeleton-avatar.large {
  width: 80px;
  height: 80px;
}

.skeleton-tags {
  display: flex;
  gap: 8px;
  margin-top: 12px;
}

.skeleton-tag {
  width: 60px;
  height: 24px;
  background: #e9ecef;
  border-radius: 12px;
}

/* List Skeleton */
.skeleton-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.skeleton-list-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  border-radius: 12px;
  background: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.skeleton-list-item .skeleton-content {
  flex: 1;
  padding: 0;
}

.skeleton-icon {
  width: 24px;
  height: 24px;
  background: #e9ecef;
  border-radius: 4px;
}

/* Grid Skeleton */
.skeleton-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.skeleton-grid-item {
  padding: 16px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

/* Timeline Skeleton */
.skeleton-timeline {
  display: flex;
  gap: 20px;
  margin-bottom: 40px;
}

.skeleton-dot {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #e9ecef;
  flex-shrink: 0;
}

.skeleton-timeline-content {
  flex: 1;
  padding-top: 8px;
}

/* Skill Skeleton */
.skeleton-skill {
  background: #ffffff;
  padding: 24px;
  border-radius: 16px;
  margin-bottom: 16px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.08);
}

.skeleton-progress {
  height: 10px;
  background: #e9ecef;
  border-radius: 6px;
  margin-top: 16px;
}

/* Dark Mode */
.dark .skeleton-container.shimmer .skeleton-line,
.dark .skeleton-container.shimmer .skeleton-image,
.dark .skeleton-container.shimmer .skeleton-dot,
.dark .skeleton-container.shimmer .skeleton-progress,
.dark .skeleton-container.shimmer .skeleton-avatar,
.dark .skeleton-container.shimmer .skeleton-button,
.dark .skeleton-container.shimmer .skeleton-tag,
.dark .skeleton-container.shimmer .skeleton-icon {
  background: linear-gradient(90deg, #374151 25%, #4b5563 50%, #374151 75%);
  background-size: 200% 100%;
}

.dark .skeleton-line,
.dark .skeleton-image,
.dark .skeleton-dot,
.dark .skeleton-progress,
.dark .skeleton-avatar,
.dark .skeleton-button,
.dark .skeleton-tag,
.dark .skeleton-icon {
  background: #374151;
}

.dark .skeleton-card,
.dark .skeleton-skill,
.dark .skeleton-profile,
.dark .skeleton-list-item,
.dark .skeleton-grid-item {
  background: #1e293b;
}

/* Responsive */
@media (max-width: 768px) {
  .skeleton-profile {
    flex-direction: column;
    text-align: center;
  }
  
  .skeleton-grid {
    grid-template-columns: 1fr;
  }
}
</style>