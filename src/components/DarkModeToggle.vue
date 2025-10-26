<template>
  <button @click="toggleDarkMode" class="dark-mode-toggle" :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'">
    <span class="toggle-icon">{{ isDark ? '☀️' : '🌙' }}</span>
  </button>
</template>

<script>
import { useDarkMode } from '@/composables/useDarkMode.js';

export default {
  setup() {
    const { isDark, toggleDarkMode } = useDarkMode();
    
    return {
      isDark,
      toggleDarkMode
    };
  }
};
</script>

<style scoped>
.dark-mode-toggle {
  position: fixed;
  top: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  background: #6366f1;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
  transition: all 0.3s ease;
  z-index: 1001;
}

.dark-mode-toggle:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 20px rgba(99, 102, 241, 0.4);
}

.toggle-icon {
  transition: transform 0.3s ease;
}

.dark-mode-toggle:hover .toggle-icon {
  transform: rotate(180deg);
}
</style>