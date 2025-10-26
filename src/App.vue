<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterView } from "vue-router";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import LoadingSplash from "@/components/LoadingSplash.vue";
import DarkModeToggle from "@/components/DarkModeToggle.vue";
import ScrollToTop from "@/components/ScrollToTop.vue";
import LoadingProgress from "@/components/LoadingProgress.vue";
import CursorTrail from "@/components/CursorTrail.vue";
import { useFavicon } from "@/composables/useFavicon.js";
import { useDarkMode } from "@/composables/useDarkMode.js";

const { animateFavicon } = useFavicon();
const { initDarkMode } = useDarkMode();

onMounted(() => {
  animateFavicon();
  initDarkMode();
});
</script>

<template>
  <LoadingProgress />
  <LoadingSplash />
  <DarkModeToggle />
  <CursorTrail />
  <Header />
  <main>
    <RouterView v-slot="{ Component, route }">
      <Transition name="page" mode="out-in">
        <component :is="Component" :key="route.path" />
      </Transition>
    </RouterView>
  </main>
  <Footer />
  <ScrollToTop />
</template>

<style>
@import "@/assets/css/main.css";
@import "@/assets/css/animations.css";

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1;
}

/* Page Transitions */
.page-enter-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.page-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.6, 1);
}

.page-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.page-enter-to,
.page-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
