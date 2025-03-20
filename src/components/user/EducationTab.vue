<template>
  <div class="education">
    <h2>Education</h2>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <ul v-else>
      <li v-for="edu in educationHistory" :key="edu.id">
        <h3>{{ edu.schoolName }}</h3>
        <p><strong>Degree:</strong> {{ edu.degree }}</p>
        <p><strong>Years Attended:</strong> {{ edu.startYear }} - {{ edu.endYear }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
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
        const response = await axios.get("http://me-api.joneslarry.com/api/education");
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
.education {
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
.error {
  color: red;
}
</style>
