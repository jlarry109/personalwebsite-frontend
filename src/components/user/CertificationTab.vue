<template>
  <div class="certifications">
    <h2>Certifications</h2>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <ul v-else>
      <li v-for="cert in certifications" :key="cert.id">
        <h3>{{ cert.certName }}</h3>
        <p><strong>Issuing Organization:</strong> {{ cert.issuingOrg }}</p>
        <p><strong>Date Earned:</strong> {{ formatDate(cert.dateEarned) }}</p>
        <p>
          <a v-if="cert.certUrl" :href="cert.certUrl" target="_blank">View Certification</a>
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      certifications: [],
      loading: false,
      error: null,
    };
  },
  methods: {
    async fetchCertifications() {
      this.loading = true;
      try {
        const response = await axios.get("http://me-api.joneslarry.com/api/certification");
        this.certifications = response.data;
      } catch (err) {
        this.error = "Failed to load certifications.";
      } finally {
        this.loading = false;
      }
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString();
    },
  },
  mounted() {
    this.fetchCertifications();
  },
};
</script>

<style scoped>
.certifications {
  max-width: 800px;
  margin: auto;
  padding: 20px;
}
ul {
  list-style: none;
  padding: 0;
}
li {
  background: #f9f9f9;
  padding: 15px;
  margin: 10px 0;
  border-radius: 5px;
}
h3 {
  margin: 0;
}
a {
  color: #007bff;
  text-decoration: none;
}
.error {
  color: red;
}
</style>
