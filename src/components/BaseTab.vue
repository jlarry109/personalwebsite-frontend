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
  max-width: 900px;
  margin: auto;
  padding: 40px 20px;
  color: #fff;
  text-align: center;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

@media (max-width: 768px) {
  .base-tab {
    padding: 20px 10px;
  }
  
  .tab-title {
    font-size: 32px;
  }
}

.tab-title {
  font-size: 48px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #fff;
}

.divider {
  height: 4px;
  background-color: aquamarine;
  width: 60%;
  margin: auto;
  border-radius: 2px;
  margin-bottom: 20px;
}
</style>
