<template>
  <BaseTab title="Personal Information">
    <template v-if="loading">
      <div class="fade-in">Loading...</div>
    </template>
    <template v-else-if="error">
      <div class="error fade-in">{{ error }}</div>
    </template>
    <template v-else>
			<img src="@/assets/hq1-hero-2550px.jpg" alt="Jones Larry" class="office-img" />
      <div class="personal-details fade-in">
        <p><strong class="label">Name:</strong> {{ personalInfo.firstName }} {{ personalInfo.lastName }}</p>
        <p><strong class="label">Email:</strong> <a :href="'mailto:' + personalInfo.email">{{ personalInfo.email }}</a></p>
        <p><strong class="label">Phone:</strong> {{ personalInfo.phone }}</p>
        <p><strong class="label">Address:</strong> {{ personalInfo.address }}</p>
        <p class="bio"><strong class="label">Bio:</strong> {{ personalInfo.bio }}</p>
        <p v-if="personalInfo.linkedinUrl">
          <strong class="label">LinkedIn:</strong>
          <a :href="personalInfo.linkedinUrl" target="_blank">{{ personalInfo.linkedinUrl }}</a>
        </p>
        <p v-if="personalInfo.githubUrl">
          <strong class="label">GitHub:</strong>
          <a :href="personalInfo.githubUrl" target="_blank">{{ personalInfo.githubUrl }}</a>
        </p>
        <p v-if="personalInfo.websiteUrl">
          <strong class="label">Website:</strong>
          <a :href="personalInfo.websiteUrl" target="_blank">{{ personalInfo.websiteUrl }}</a>
        </p>
      </div>
    </template>
  </BaseTab>
</template>

<script>
import axios from "axios";
import BaseTab from "@/components/BaseTab.vue";

export default {
  components: { BaseTab },
  data() {
    return {
      personalInfo: {},
      loading: false,
      error: null,
    };
  },
  methods: {
    async fetchPersonalInfo() {
      this.loading = true;
      try {
        const response = await axios.get("https://me-api.joneslarry.com/api/personal-info");
        this.personalInfo = response.data;
      } catch (err) {
        this.error = "Failed to load personal information.";
      } finally {
        this.loading = false;
      }
    },
  },
  mounted() {
    this.fetchPersonalInfo();
  },
};
</script>

<style scoped>
/* Fade-in animation for smooth loading */
.fade-in {
  opacity: 0;
  transform: translateY(10px);
  animation: fadeInUp 0.6s ease-out forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Layout Styling */
.office-img {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 45px; 
}
.personal-details {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

p {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.9); 
  line-height: 1.6;
}


.label {
  color: #ffffff;
  font-weight: bold;
}

.bio {
  font-style: italic;
}


a {
  color: #1db8ff !important;
  text-decoration: none;
  font-weight: bold;
  visibility: visible !important;
  opacity: 1 !important;
  transition: color 0.3s ease;
}


a:hover {
  text-decoration: underline;
  color: #ffcc00; 
}

.error {
  color: red;
  text-align: center;
  font-size: 18px;
}
</style>
