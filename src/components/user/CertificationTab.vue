<template>
  <BaseTab title="Certifications">
    <template v-if="loading">Loading...</template>
    <template v-else-if="error">
      <div class="error">{{ error }}</div>
    </template>
    <template v-else>
      <ul class="cert-list">
        <li v-for="cert in certifications" :key="cert.id">
          <div class="cert-card">
            <h3>{{ cert.certName }}</h3>
            <p><strong>Issuing Organization:</strong> {{ cert.issuingOrg }}</p>
            <p><strong>Date Earned:</strong> {{ formatDate(cert.dateEarned) }}</p>
            <p v-if="cert.certUrl">
              <a :href="cert.certUrl" target="_blank">View Certification</a>
            </p>
          </div>
        </li>
      </ul>
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
.cert-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 0;
}

.cert-card {
  background: white;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;
}

.cert-card:hover {
  transform: translateY(-3px);
}

h3 {
  margin: 0;
  font-size: 20px;
  color: #333;
}

p {
  margin: 5px 0;
  font-size: 16px;
  color: #555;
}

a {
  color: #007bff;
  text-decoration: none;
  font-weight: bold;
}

a:hover {
  text-decoration: underline;
}

.error {
  color: red;
  text-align: center;
  font-size: 18px;
}
</style>
