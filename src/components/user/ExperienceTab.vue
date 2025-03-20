<template>
  <div class="experience">
    <h2>Work Experience</h2>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <ul v-else>
      <li v-for="exp in experiences" :key="exp.id" class="experience-item">
        <h3>{{ exp.position }} at {{ exp.companyName }}</h3>
        <p>{{ formatDate(exp.startDate) }} - {{ exp.endDate ? formatDate(exp.endDate) : 'Present' }}</p>
        <p>{{ exp.description }}</p>
        <ul>
          <li v-for="detail in exp.details" :key="detail.id">{{ detail.taskDescription }}</li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      experiences: [],
      loading: false,
      error: null,
    };
  },
  methods: {
    async fetchExperiences() {
      this.loading = true;
      try {
        const response = await axios.get("http://me-api.joneslarry.com/api/experience");
        this.experiences = response.data;
      } catch (err) {
        this.error = "Failed to load work experience.";
      } finally {
        this.loading = false;
      }
    },
    formatDate(dateString) {
      const options = { year: "numeric", month: "long" };
      return new Date(dateString).toLocaleDateString(undefined, options);
    }
  },
  mounted() {
    this.fetchExperiences();
  },
};
</script>

<style scoped>
.experience {
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
