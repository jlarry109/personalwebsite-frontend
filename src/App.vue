<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<template>
  <header>
    <div class="container">
      <img alt="Cat image" class="logo" src="@/assets/hq1-hero-2550px.jpg" />

      <h1>Welcome to My Personal Website</h1>
      <p>Explore my projects, skills, and experiences.</p>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  padding: 40px 20px;
  background: linear-gradient(135deg, #f9f9f9, #e3f2fd);
  border-bottom: 3px solid #64b5f6;
}

.container {
  max-width: 600px;
}

.logo {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #64b5f6;
  margin-bottom: 20px;
}

h1 {
  font-size: 28px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

p {
  font-size: 18px;
  color: #555;
  margin: 0;
}
</style>
