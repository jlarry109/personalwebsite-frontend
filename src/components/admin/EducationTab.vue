<template>
  <div class="education-tab">
    <h2>Education</h2>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <ul v-else>
      <li v-for="edu in educationList" :key="edu.id" class="education-item">
        <h3>{{ edu.degree }} at {{ edu.schoolName }}</h3>
        <p>{{ edu.startYear }} - {{ edu.endYear ? edu.endYear : 'Present' }}</p>
        <div v-if="isAdmin" class="admin-actions">
          <button @click="editEducation(edu)">Update</button>
          <button @click="deleteEducation(edu.id)" class="delete-btn">Delete</button>
        </div>
      </li>
    </ul>

    <div v-if="isAdmin" class="admin-section">
      <button @click="toggleForm">{{ showForm ? 'Cancel' : (editingEducation ? 'Edit Education' : 'Add Education') }}</button>
      <div v-if="showForm">
        <h3>{{ editingEducation ? 'Edit Education' : 'Add Education' }}</h3>
        <form @submit.prevent="editingEducation ? updateEducation() : addEducation()">
          <input v-model="formEducation.schoolName" placeholder="School Name" required />
          <input v-model="formEducation.degree" placeholder="Degree" required />
          <input type="number" v-model="formEducation.startYear" placeholder="Start Year" required />
          <input type="number" v-model="formEducation.endYear" placeholder="End Year (Optional)" />
          <button type="submit">{{ editingEducation ? 'Update Education' : 'Add Education' }}</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      educationList: [],
      loading: true,
      error: null,
      isAdmin: true, // Update dynamically based on user role
      showForm: false,
      editingEducation: null,
      formEducation: {
        schoolName: '',
        degree: '',
        startYear: '',
        endYear: '',
      },
    };
  },
  mounted() {
    this.fetchEducation();
  },
  methods: {
    async fetchEducation() {
      try {
        const response = await fetch("http://me-api.joneslarry.com/api/education");
        if (!response.ok) {
          throw new Error("Failed to fetch education records");
        }
        this.educationList = await response.json();
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
    async addEducation() {
      try {
        const response = await fetch("http://me-api.joneslarry.com/api/admin/education", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(this.formEducation),
        });
        if (!response.ok) {
          throw new Error("Failed to add education");
        }
        this.fetchEducation();
        this.resetForm();
      } catch (err) {
        this.error = err.message;
      }
    },
    async updateEducation() {
      try {
				
        // const response = await fetch(`http://localhost:8080/api/admin/education/${this.editingEducation.id}`, {
		const response = await fetch(`http://me-api.joneslarry.com/api/admin/education/${this.editingEducation.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(this.formEducation),
        });
        if (!response.ok) {
          throw new Error("Failed to update education");
        }
        this.fetchEducation();
        this.resetForm();
      } catch (err) {
        this.error = err.message;
      }
    },
    async deleteEducation(id) {
      if (!confirm("Are you sure you want to delete this education record?")) return;
      try {
        const response = await fetch(`http://me-api.joneslarry.com/api/admin/education/${id}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error("Failed to delete education");
        }
        this.fetchEducation();
      } catch (err) {
        this.error = err.message;
      }
    },
    editEducation(edu) {
      this.editingEducation = edu;
      this.formEducation = { ...edu };
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
      this.editingEducation = null;
      this.formEducation = { schoolName: '', degree: '', startYear: '', endYear: '' };
    },
  },
};
</script>

<style scoped>
.education-tab {
  padding: 20px;
}
.education-item {
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
input, button {
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
