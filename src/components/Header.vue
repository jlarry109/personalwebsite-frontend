<template>
  <header id="header">
    <router-link to="/" class="logo">Jones Larry</router-link>
    <h1>Welcome to My Personal Website</h1>
    <p>Explore my projects, skills, and experiences.</p>
  </header>
  
  <nav id="nav">
	<ul class="links">
	      <li><router-link to="/" active-class="active">Home</router-link></li>
	      <li><router-link to="/thoughts" active-class="active">Thoughts</router-link></li>
	      <li><router-link to="/elements" active-class="active">Elements</router-link></li>
	</ul>
    
    <ul class="icons">
      <li><a href="#" class="icon brands fa-twitter"><i class="fab fa-twitter"></i></a></li>
      <li><a href="#" class="icon brands fa-facebook-f"><i class="fab fa-facebook-f"></i></a></li>
      <li><a href="#" class="icon brands fa-instagram"><i class="fab fa-instagram"></i></a></li>
      <li><a href="#" class="icon brands fa-github"><i class="fab fa-github"></i></a></li>
    </ul>
  </nav>
</template>

<script setup>
</script>

<style scoped>
@import "@/assets/css/main.css";
</style>

<style scoped>
#header {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 20px;
  box-sizing: border-box;
}

.links {
  display: flex;
  gap: 20px;
  list-style: none;
  padding: 0;
}

.icons {
  display: flex;
  gap: 15px;
  list-style: none;
  padding: 0;
}
</style>
