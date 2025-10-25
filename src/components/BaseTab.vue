<template>
  <div class="base-tab">
    <h1 class="tab-title">{{ title }}</h1>
    <div class="divider"></div>
    <slot></slot> <!-- Each tab will define its own content here -->
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.base-tab {
  max-width: 800px;
  margin: 32px auto;
  padding: 48px;
  color: #1f2937;
  text-align: left;
  font-family: Inter, -apple-system, BlinkMacSystemFont, sans-serif;
  background: linear-gradient(135deg, #ffffff 0%, #fefefe 100%);
  border-radius: 20px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.04);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  opacity: 0;
  transform: translateY(20px);
  animation: slideInUp 0.6s ease-out 0.2s forwards;
}

@keyframes slideInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.base-tab:hover {
  transform: translateY(-4px) scale(1.01);
  box-shadow: 0 25px 50px -10px rgba(0, 0, 0, 0.18), 0 12px 20px -4px rgba(0, 0, 0, 0.12);
  border-color: #cbd5e1;
}

.base-tab::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #6366f1, #8b5cf6, #06b6d4);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.base-tab:hover::before {
  opacity: 1;
}

@media (max-width: 768px) {
  .base-tab {
    margin: 16px;
    padding: 32px 24px;
  }
  
  .tab-title {
    font-size: 28px;
  }
}

.tab-title {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 32px;
  color: #111827;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 16px;
  line-height: 1.2;
  letter-spacing: -0.025em;
}

.divider {
  display: none;
}

.base-tab::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  height: 1px;
  background: linear-gradient(90deg, transparent, #e5e7eb, transparent);
}
</style>
