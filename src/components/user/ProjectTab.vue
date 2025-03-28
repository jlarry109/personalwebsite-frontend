<template>
  <BaseTab title="Projects">
    <template #default>
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
      projects: [],
      loading: false,
      error: null,
    };
  },
  methods: {
    async fetchProjects() {
      this.loading = true;
      try {
        const response = await axios.get("https://me-api.joneslarry.com/api/project");
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
.project-card {
  background: #f8f9fa;
  color: #333;
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
 color: #1100ff !important;
 text-decoration: none;
 font-weight: bold;
 visibility: visible !important;
 opacity: 1 !important;
 transition: color 0.3s ease;
}
a:hover {
  text-decoration: underline;
  color: #ffcc00;
}
.error {
  color: red;
}
</style>
