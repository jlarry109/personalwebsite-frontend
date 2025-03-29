<template>
  <BaseTab title="Certifications">
    <template v-if="loading">
      <div class="skeleton-loader">
        <div class="skeleton-text"></div>
        <div class="skeleton-text short"></div>
        <div class="skeleton-text"></div>
      </div>
    </template>
    <template v-else-if="error">
      <div class="error">
        <span>{{ error }}</span>
        <button @click="error = null">×</button>
      </div>
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
        const response = await axios.get("https://me-api.joneslarry.com/api/certification");
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

.skeleton-loader {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 15px;
}

.skeleton-text {
  width: 100%;
  height: 15px;
  background: linear-gradient(90deg, #f3f3f3, #e0e0e0, #f3f3f3);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

.skeleton-text.short {
  width: 60%;
}

@keyframes loading {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

.error {
  background: #ffdddd;
  color: red;
  padding: 10px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.error button {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}
</style>
