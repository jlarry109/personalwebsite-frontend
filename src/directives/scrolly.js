export default {
  mounted(el) {
    el.addEventListener("click", (event) => {
      event.preventDefault();
      const targetId = el.getAttribute("href");
      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  }
};
