<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterView } from "vue-router";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import LoadingSplash from "@/components/LoadingSplash.vue";
import DarkModeToggle from "@/components/DarkModeToggle.vue";
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
  <LoadingSplash />
  <DarkModeToggle />
  <Header />
  <main>
    <RouterView />
  </main>
  <Footer />
</template>

<style>
@import "@/assets/css/main.css";

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1;
}
</style>
