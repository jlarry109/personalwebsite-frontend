<template>
  <div v-if="isVisible" class="loading-splash">
    <div class="logo-container">
      <img src="/logo3.png" alt="Logo" class="logo" />
      <div class="loading-text">Jones Larry</div>
      <div class="loading-dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isVisible: true
    };
  },
  mounted() {
    // Show splash for 2.5 seconds
    setTimeout(() => {
      this.isVisible = false;
      this.$emit('splash-complete');
    }, 2500);
  }
};
</script>

<style scoped>
.loading-splash {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  animation: fadeOut 0.8s ease-in-out 2s forwards;
}

.loading-splash::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 70%);
  animation: pulse 3s ease-in-out infinite;
}

.logo-container {
  text-align: center;
  animation: slideUp 0.8s ease-out;
}

.logo {
  width: 80px;
  height: 80px;
  margin-bottom: 20px;
  animation: pulse 2s infinite;
}

.loading-text {
  color: white;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
}

.loading-dots {
  display: flex;
  justify-content: center;
  gap: 8px;
}

.loading-dots span {
  width: 8px;
  height: 8px;
  background: white;
  border-radius: 50%;
  animation: bounce 1.4s infinite ease-in-out both;
}

.loading-dots span:nth-child(1) { animation-delay: -0.32s; }
.loading-dots span:nth-child(2) { animation-delay: -0.16s; }

@keyframes fadeOut {
  to { opacity: 0; visibility: hidden; }
}

@keyframes slideUp {
  from { transform: translateY(30px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

@keyframes bounce {
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1); }
}
</style>