<template>
  <BaseTab title="About Me">
    <div class="about-me">
      <!-- Profile Image -->
      <img src="@/assets/cat.jpeg" alt="Jones Larry" class="profile-img" />

      <!-- About Text -->
      <div class="about-text">
        <p>
          Greetings! I am <strong>Jones Larry</strong>, a passionate graduate student dedicated to 
          exploring the intersections of <strong>[Your Field of Study]</strong>. This digital space 
          serves as a window into my academic pursuits, research endeavors, and my evolving scholarly journey.
        </p>
        <p>
          My curiosity drives me to understand and contribute to <strong>[Your Research Areas]</strong>. 
          Here, you'll find insights into my projects, publications, and the collaborative discussions that 
          shape my academic path.
        </p>
        <p>Best regards,</p>
      </div>
    </div>
  </BaseTab>
</template>

<script>
import BaseTab from "@/components/BaseTab.vue";

export default {
  components: { BaseTab }
};
</script>

<style scoped>
.about-me {
  display: flex;
  flex-direction: column; /* Stacks image above text */
  align-items: center; 
  text-align: center;
}

.about-text {
  flex: 1; /* Ensure text takes remaining space */
}

.profile-img {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 45px; /* Add space below the image */
}

</style>
