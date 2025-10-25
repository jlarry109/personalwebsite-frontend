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
      <div class="cert-list">
        <AnimatedCard 
          v-for="(cert, index) in certifications" 
          :key="cert.id"
          category="certification"
          :delay="index * 150"
          class="cert-card">
          <div class="cert-content">
            <h3>{{ cert.certificationName }}</h3>
            <p><strong>Issuing Organization:</strong> {{ cert.issuingOrganization }}</p>
            <p><strong>Date Earned:</strong> {{ formatDate(cert.dateObtained) }}</p>
            <p v-if="cert.certificationUrl">
              <a :href="cert.certificationUrl" target="_blank">View Certification</a>
            </p>
          </div>
        </AnimatedCard>
      </div>
    </template>
  </BaseTab>
</template>

<script>
import BaseTab from "@/components/BaseTab.vue";
import AnimatedCard from "@/components/AnimatedCard.vue";

export default {
  components: { BaseTab, AnimatedCard },
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
        const response = await fetch(`${import.meta.env.BASE_URL}data/certifications.json`);
        this.certifications = await response.json();
      } catch (err) {
        this.error = "Failed to load certifications.";
        console.error('Certifications error:', err);
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
  gap: 24px;
}

.cert-card {
  margin-bottom: 0;
}

.cert-content {
  padding: 20px;
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
