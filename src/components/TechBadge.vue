<template>
  <div class="tech-badge" :style="{ '--tech-color': technology.color }">
    <span class="tech-icon">{{ technology.icon }}</span>
    <span class="tech-name">{{ technology.name }}</span>
  </div>
</template>

<script>
export default {
  name: 'TechBadge',
  props: {
    technology: {
      type: Object,
      required: true,
      validator: (tech) => tech.name && tech.icon && tech.color
    }
  }
}
</script>

<style scoped>
.tech-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  color: #374151;
  transition: all 0.3s ease;
  backdrop-filter: blur(4px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.tech-badge:hover {
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border-color: var(--tech-color);
  background: rgba(255, 255, 255, 0.95);
}

.tech-icon {
  font-size: 14px;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
}

.tech-name {
  white-space: nowrap;
}

.dark .tech-badge {
  background: rgba(30, 41, 59, 0.9);
  color: #e2e8f0;
  border-color: rgba(255, 255, 255, 0.1);
}

.dark .tech-badge:hover {
  background: rgba(30, 41, 59, 0.95);
}
</style>