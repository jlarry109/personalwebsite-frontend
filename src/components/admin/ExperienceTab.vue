<template>
  <div class="experience-tab">
    <h2>Experience</h2>
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
        <div v-if="isAdmin" class="admin-actions">
          <button @click="editExperience(exp)">Update</button>
          <button @click="deleteExperience(exp.id)" class="delete-btn">Delete</button>
        </div>
      </li>
    </ul>

    <div v-if="isAdmin" class="admin-section">
      <button @click="toggleForm">{{ showForm ? 'Cancel' : (editingExperience ? 'Edit Experience' : 'Add Experience') }}</button>
      <div v-if="showForm">
        <h3>{{ editingExperience ? 'Edit Experience' : 'Add Experience' }}</h3>
        <form @submit.prevent="editingExperience ? updateExperience() : addExperience()">
          <input v-model="formExperience.companyName" placeholder="Company Name" required />
          <input v-model="formExperience.position" placeholder="Position" required />
          <input type="date" v-model="formExperience.startDate" required />
          <input type="date" v-model="formExperience.endDate" />
          <textarea v-model="formExperience.description" placeholder="Description" required></textarea>
          
          <h4>Experience Details</h4>
          <div v-for="(detail, index) in formExperience.details" :key="index" class="detail-entry">
            <input v-model="formExperience.details[index]" placeholder="Detail" required />
            <button type="button" @click="removeDetail(index)">Remove</button>
          </div>
          <button type="button" @click="addDetail">Add Detail</button>
          
          <button type="submit">{{ editingExperience ? 'Update Experience' : 'Add Experience' }}</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      experiences: [],
      loading: true,
      error: null,
      isAdmin: true, // Update dynamically based on user role
      showForm: false,
      editingExperience: null,
      formExperience: {
        companyName: '',
        position: '',
        startDate: '',
        endDate: '',
        description: '',
        details: [''],
      },
    };
  },
  mounted() {
    this.fetchExperiences();
  },
  methods: {
    async fetchExperiences() {
      try {
        const response = await fetch("http://me-api.joneslarry.com/api/experience");
        if (!response.ok) {
          throw new Error("Failed to fetch experiences");
        }
        this.experiences = await response.json();
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
    async addExperience() {
      try {
        const response = await fetch("http://me-api.joneslarry.com/api/admin/experience", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(this.formExperience),
        });
        if (!response.ok) {
          throw new Error("Failed to add experience");
        }
        this.fetchExperiences();
        this.resetForm();
      } catch (err) {
        this.error = err.message;
      }
    },
    async updateExperience() {
      try {
        const response = await fetch(`http://me-api.joneslarry.com/api/admin/experience/${this.editingExperience.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(this.formExperience),
        });
        if (!response.ok) {
          throw new Error("Failed to update experience");
        }
        this.fetchExperiences();
        this.resetForm();
      } catch (err) {
        this.error = err.message;
      }
    },
    async deleteExperience(id) {
      if (!confirm("Are you sure you want to delete this experience?")) return;
      try {
        const response = await fetch(`http://me-api.joneslarry.com/api/admin/experience/${id}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error("Failed to delete experience");
        }
        this.fetchExperiences();
      } catch (err) {
        this.error = err.message;
      }
    },
    editExperience(exp) {
      this.editingExperience = exp;
      this.formExperience = { ...exp, details: [...exp.details] };
      this.showForm = true;
    },
    toggleForm() {
      if (this.showForm) {
        this.resetForm();
      } else {
        this.showForm = true;
      }
    },
    resetForm() {
      this.showForm = false;
      this.editingExperience = null;
      this.formExperience = { companyName: '', position: '', startDate: '', endDate: '', description: '', details: [''] };
    },
    addDetail() {
      this.formExperience.details.push('');
    },
    removeDetail(index) {
      this.formExperience.details.splice(index, 1);
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString();
    },
  },
};
</script>

<style scoped>
.experience-tab {
  padding: 20px;
}
.experience-item {
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
.detail-entry {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>
