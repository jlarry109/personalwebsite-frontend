<template>
  <BaseTab title="Education">
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
      <ul class="edu-list">
        <li v-for="edu in educationHistory" :key="edu.id">
          <div class="edu-card">
            <h3>{{ edu.schoolName }}</h3>
            <p><strong>Degree:</strong> {{ edu.degree }}</p>
            <p><strong>Years Attended:</strong> {{ edu.startYear }} - {{ edu.endYear }}</p>
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
      educationHistory: [],
      loading: false,
      error: null,
    };
  },
  methods: {
    async fetchEducationHistory() {
      this.loading = true;
      try {
        const response = await axios.get("https://me-api.joneslarry.com/api/education");
        this.educationHistory = response.data;
      } catch (err) {
        this.error = "Failed to load education history.";
      } finally {
        this.loading = false;
      }
    },
  },
  mounted() {
    this.fetchEducationHistory();
  },
};
</script>

<style scoped>
.edu-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 0;
}

.edu-card {
  background: white;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;
}

.edu-card:hover {
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
