<template>
  <BaseTab title="Education">
    <template v-if="loading">Loading...</template>
    <template v-else-if="error">
      <div class="error">{{ error }}</div>
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

.error {
  color: red;
  text-align: center;
  font-size: 18px;
}
</style>
