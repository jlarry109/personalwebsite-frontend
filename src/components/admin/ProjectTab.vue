<template>
  <div class="project-tab">
    <h2>Projects</h2>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <ul v-else>
      <li v-for="project in projects" :key="project.id" class="project-item">
        <h3>{{ project.title }}</h3>
        <p>{{ project.description }}</p>
        <p><strong>Date Created:</strong> {{ formatDate(project.dateCreated) }}</p>
        <p>
          <a v-if="project.githubLink" :href="project.githubLink" target="_blank">GitHub</a>
          <a v-if="project.liveDemoLink" :href="project.liveDemoLink" target="_blank">Live Demo</a>
        </p>
        <div v-if="isAdmin" class="admin-actions">
          <button @click="editProject(project)">Update</button>
          <button @click="deleteProject(project.id)" class="delete-btn">Delete</button>
        </div>
      </li>
    </ul>

    <div v-if="isAdmin" class="admin-section">
      <button @click="toggleForm">{{ showForm ? 'Cancel' : (editingProject ? 'Edit Project' : 'Add Project') }}</button>
      <div v-if="showForm">
        <h3>{{ editingProject ? 'Edit Project' : 'Add Project' }}</h3>
        <form @submit.prevent="editingProject ? updateProject() : addProject()">
          <input v-model="formProject.title" placeholder="Title" required />
          <textarea v-model="formProject.description" placeholder="Description" required></textarea>
          <input v-model="formProject.githubLink" placeholder="GitHub Link" />
          <input v-model="formProject.liveDemoLink" placeholder="Live Demo Link" />
          <input type="date" v-model="formProject.dateCreated" required />
          <button type="submit">{{ editingProject ? 'Update Project' : 'Add Project' }}</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      projects: [],
      loading: true,
      error: null,
      isAdmin: true, // Update dynamically based on user role
      showForm: false,
      editingProject: null,
      formProject: {
        title: '',
        description: '',
        githubLink: '',
        liveDemoLink: '',
        dateCreated: '',
      },
    };
  },
  mounted() {
    this.fetchProjects();
  },
  methods: {
    async fetchProjects() {
      try {
        const response = await fetch("http://me-api.joneslarry.com/api/projects");
        if (!response.ok) throw new Error("Failed to fetch projects");
        this.projects = await response.json();
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
    async addProject() {
      try {
        const response = await fetch("http://me-api.joneslarry.com/api/admin/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(this.formProject),
        });
        if (!response.ok) throw new Error("Failed to add project");
        this.fetchProjects();
        this.resetForm();
      } catch (err) {
        this.error = err.message;
      }
    },
    async updateProject() {
      try {
        const response = await fetch(`http://me-api.joneslarry.com/api/admin/projects/${this.editingProject.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(this.formProject),
        });
        if (!response.ok) throw new Error("Failed to update project");
        this.fetchProjects();
        this.resetForm();
      } catch (err) {
        this.error = err.message;
      }
    },
    async deleteProject(id) {
      if (!confirm("Are you sure you want to delete this project?")) return;
      try {
        const response = await fetch(`http://me-api.joneslarry.com/api/admin/projects/${id}`, {
          method: "DELETE",
        });
        if (!response.ok) throw new Error("Failed to delete project");
        this.fetchProjects();
      } catch (err) {
        this.error = err.message;
      }
    },
    editProject(project) {
      this.editingProject = project;
      this.formProject = { ...project };
      this.showForm = true;
    },
    toggleForm() {
      this.showForm ? this.resetForm() : (this.showForm = true);
    },
    resetForm() {
      this.showForm = false;
      this.editingProject = null;
      this.formProject = { title: '', description: '', githubLink: '', liveDemoLink: '', dateCreated: '' };
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString();
    },
  },
};
</script>

<style scoped>
.project-tab {
  padding: 20px;
}
.project-item {
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
}
.admin-section {
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #aaa;
  border-radius: 8px;
  background-color: #f9f9f9;
}
.admin-actions {
  margin-top: 10px;
}
input, textarea, button {
  display: block;
  width: 100%;
  margin-bottom: 10px;
  padding: 8px;
}
button {
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}
.delete-btn {
  background-color: #dc3545;
}
.delete-btn:hover {
  background-color: #c82333;
}
.error {
  color: red;
}
</style>
