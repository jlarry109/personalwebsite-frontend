import { ref, watch } from 'vue';

export function useDarkMode() {
  const isDark = ref(false);

  // Check system preference and localStorage
  const initDarkMode = () => {
    const stored = localStorage.getItem('darkMode');
    if (stored) {
      isDark.value = JSON.parse(stored);
    } else {
      isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    applyDarkMode();
  };

  const toggleDarkMode = () => {
    isDark.value = !isDark.value;
    localStorage.setItem('darkMode', JSON.stringify(isDark.value));
    applyDarkMode();
  };

  const applyDarkMode = () => {
    if (isDark.value) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Watch for system preference changes
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  mediaQuery.addEventListener('change', (e) => {
    if (!localStorage.getItem('darkMode')) {
      isDark.value = e.matches;
      applyDarkMode();
    }
  });

  return {
    isDark,
    toggleDarkMode,
    initDarkMode
  };
}