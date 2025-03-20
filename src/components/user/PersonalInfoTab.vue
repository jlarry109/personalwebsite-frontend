<template>
  <div class="personal-info">
    <h2>Personal Information</h2>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else>
      <p><strong>Name:</strong> {{ personalInfo.firstName }} {{ personalInfo.lastName }}</p>
      <p><strong>Email:</strong> {{ personalInfo.email }}</p>
      <p><strong>Phone:</strong> {{ personalInfo.phone }}</p>
      <p><strong>Address:</strong> {{ personalInfo.address }}</p>
      <p><strong>Bio:</strong> {{ personalInfo.bio }}</p>
      <p>
        <strong>LinkedIn:</strong>
        <a :href="personalInfo.linkedinUrl" target="_blank">{{ personalInfo.linkedinUrl }}</a>
      </p>
      <p>
        <strong>GitHub:</strong>
        <a :href="personalInfo.githubUrl" target="_blank">{{ personalInfo.githubUrl }}</a>
      </p>
      <p>
        <strong>Website:</strong>
        <a :href="personalInfo.websiteUrl" target="_blank">{{ personalInfo.websiteUrl }}</a>
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
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
        const response = await axios.get("http://me-api.joneslarry.com/api/personal-info");
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
.personal-info {
  max-width: 800px;
  margin: auto;
  padding: 20px;
}
p {
  margin: 8px 0;
}
a {
  color: #007bff;
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
.error {
  color: red;
}
</style>
