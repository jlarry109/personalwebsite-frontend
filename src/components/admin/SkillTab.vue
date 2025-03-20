<template>
  <div class="skill-tab">
    <h2>Skills</h2>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <ul v-else>
      <li v-for="skill in skills" :key="skill.id" class="skill-item">
        <span>{{ skill.skillName }} - {{ skill.proficiencyLevel }}</span>
        <div v-if="isAdmin" class="admin-actions">
          <button @click="editSkill(skill)">Update</button>
          <button @click="deleteSkill(skill.id)" class="delete-btn">Delete</button>
        </div>
      </li>
    </ul>

    <div v-if="isAdmin" class="admin-section">
      <button @click="toggleForm">{{ showForm ? 'Cancel' : (editingSkill ? 'Edit Skill' : 'Add Skill') }}</button>
      <div v-if="showForm">
        <h3>{{ editingSkill ? 'Edit Skill' : 'Add Skill' }}</h3>
        <form @submit.prevent="editingSkill ? updateSkill() : addSkill()">
          <input v-model="formSkill.skillName" placeholder="Skill Name" required />
          <select v-model="formSkill.proficiencyLevel" required>
            <option v-for="level in proficiencyLevels" :key="level" :value="level">
              {{ level }}
            </option>
          </select>
          <button type="submit">{{ editingSkill ? 'Update Skill' : 'Add Skill' }}</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      skills: [],
      loading: true,
      error: null,
      isAdmin: true, // Update dynamically based on user role
      showForm: false,
      editingSkill: null,
      proficiencyLevels: ["BEGINNER", "INTERMEDIATE", "ADVANCED", "EXPERT"], // Match `ProficiencyLevel` Enum
      formSkill: {
        skillName: "",
        proficiencyLevel: "BEGINNER",
      },
    };
  },
  mounted() {
    this.fetchSkills();
  },
  methods: {
    async fetchSkills() {
      try {
        const response = await fetch("http://me-api.joneslarry.com/api/skills");
        if (!response.ok) throw new Error("Failed to fetch skills");
        this.skills = await response.json();
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
    async addSkill() {
      try {
        const response = await fetch("http://me-api.joneslarry.com/api/admin/skills", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(this.formSkill),
        });
        if (!response.ok) throw new Error("Failed to add skill");
        this.fetchSkills();
        this.resetForm();
      } catch (err) {
        this.error = err.message;
      }
    },
    async updateSkill() {
      try {
        const response = await fetch(`http://me-api.joneslarry.com/api/admin/skills/${this.editingSkill.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(this.formSkill),
        });
        if (!response.ok) throw new Error("Failed to update skill");
        this.fetchSkills();
        this.resetForm();
      } catch (err) {
        this.error = err.message;
      }
    },
    async deleteSkill(id) {
      if (!confirm("Are you sure you want to delete this skill?")) return;
      try {
        const response = await fetch(`http://me-api.joneslarry.com/api/admin/skills/${id}`, {
          method: "DELETE",
        });
        if (!response.ok) throw new Error("Failed to delete skill");
        this.fetchSkills();
      } catch (err) {
        this.error = err.message;
      }
    },
    editSkill(skill) {
      this.editingSkill = skill;
      this.formSkill = { ...skill };
      this.showForm = true;
    },
    toggleForm() {
      this.showForm = !this.showForm;
      if (!this.showForm) this.resetForm();
    },
    resetForm() {
      this.showForm = false;
      this.editingSkill = null;
      this.formSkill = { skillName: "", proficiencyLevel: "BEGINNER" };
    },
  },
};
</script>

<style scoped>
.skill-tab {
  padding: 20px;
}
.skill-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
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
  display: flex;
  gap: 10px;
}
input, select, button {
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
