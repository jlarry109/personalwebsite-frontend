<script setup lang="ts">
import { RouterView } from "vue-router";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";  
</script>

<template>
  <Header />
  <RouterView />
  <Footer />
</template>

<style>
@import "@/assets/css/main.css";

html, body {
  height: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

RouterView {
  flex-grow: 1;
}

Footer {
  width: 100%;
}
</style>
