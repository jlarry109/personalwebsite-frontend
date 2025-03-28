<template>
  <div>
    <button @click="toggleNav" class="nav-toggle">
      {{ isOpen ? "Close" : "Menu" }}
    </button>
    <div v-if="isOpen" class="nav-panel">
      <nav>
        <a href="#home" v-scrolly>Home</a>
        <a href="#about" v-scrolly>About</a>
        <a href="#contact" v-scrolly>Contact</a>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false
    };
  },
  methods: {
    toggleNav() {
      this.isOpen = !this.isOpen;
    }
  }
};
</script>

<style scoped>
.nav-toggle {
  position: fixed;
  top: 10px;
  right: 10px;
  background: black;
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
}
.nav-panel {
  position: fixed;
  right: 0;
  top: 0;
  width: 250px;
  height: 100%;
  background: white;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.3);
}
</style>
