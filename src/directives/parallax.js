export default {
  beforeMount(el, binding) {
    const intensity = binding.value || 0.25;

    el.__updateParallax = () => {
      const scrollPos = window.scrollY - el.offsetTop;
      el.style.transform = `translateY(${scrollPos * intensity}px)`;
    };

    window.addEventListener("scroll", el.__updateParallax);
    el.__updateParallax();
  },
  unmounted(el) {
    window.removeEventListener("scroll", el.__updateParallax);
  }
};
