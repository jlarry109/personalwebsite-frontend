<template>
  <div class="project-tab">
    <h2>Projects</h2>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else>
      <div v-for="project in projects" :key="project.id" class="project-card">
        <h3>{{ project.title }}</h3>
        <p>{{ project.description }}</p>
        <p><strong>Date Created:</strong> {{ formatDate(project.dateCreated) }}</p>
        <p v-if="project.githubLink">
          <strong>GitHub:</strong> 
          <a :href="project.githubLink" target="_blank">{{ project.githubLink }}</a>
        </p>
        <p v-if="project.liveDemoLink">
          <strong>Live Demo:</strong> 
          <a :href="project.liveDemoLink" target="_blank">{{ project.liveDemoLink }}</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      projects: [],
      loading: false,
      error: null,
    };
  },
  methods: {
    async fetchProjects() {
      this.loading = true;
      try {
        const response = await axios.get("http://me-api.joneslarry.com/api/project");
        this.projects = response.data;
      } catch (err) {
        this.error = "Failed to load projects.";
      } finally {
        this.loading = false;
      }
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString();
    },
  },
  mounted() {
    this.fetchProjects();
  },
};
</script>

<style scoped>
.project-tab {
  max-width: 800px;
  margin: auto;
  padding: 20px;
}
.project-card {
  background: #f8f9fa;
  padding: 15px;
  margin: 10px 0;
  border-radius: 8px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
}
h3 {
  margin-bottom: 5px;
}
p {
  margin: 5px 0;
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
