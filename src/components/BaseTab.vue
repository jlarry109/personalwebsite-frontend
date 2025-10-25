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
  background: #ffffff;
  border-radius: 16px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  position: relative;
}

.base-tab:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.15), 0 8px 16px -4px rgba(0, 0, 0, 0.1);
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
