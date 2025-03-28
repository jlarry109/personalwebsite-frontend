<template>
  <section ref="intro" :class="{ hidden: isHidden }">
    <h1>Welcome</h1>
  </section>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
  setup() {
    const intro = ref(null);
    const isHidden = ref(false);

    onMounted(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          isHidden.value = !entry.isIntersecting;
        },
        { threshold: 0.2 }
      );

      if (intro.value) observer.observe(intro.value);
    });

    return { intro, isHidden };
  }
};
</script>

<style scoped>
.hidden {
  opacity: 0;
  transition: opacity 0.5s ease;
}
</style>
