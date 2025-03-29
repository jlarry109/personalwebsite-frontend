<template>
  <BaseTab title="About Me">
    <div class="about-me">
      <!-- Profile Image -->
      <img src="@/assets/cat.jpeg" alt="Jones Larry" class="profile-img" />

      <!-- About Text -->
      <div class="about-text">
        <p>
          Greetings! I am <strong>Jones Larry</strong>, an Engineer specializing in <strong>Software and AI systems</strong> at Amazon. 
					I graduated from Duke University, where I developed a passion for solving complex problems through technology. 
        </p>
		<p>
			Currently, I work on building scalable AI systems that drive impactful solutions.
			When I'm not coding, I enjoy exploring the latest in AI, contributing to open-source projects, and spending time outdoors.
		</p>
        <p>
          Feel free to reach out if you’d like to connect or collaborate!
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

.about-text strong {
  color: white; /* Ensures bold text remains visible */
  font-weight: bold; 
}

</style>
