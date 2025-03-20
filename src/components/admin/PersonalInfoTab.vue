<template>
  <div class="personal-info-tab">
    <h2>Personal Information</h2>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else>
      <p><strong>Name:</strong> {{ personalInfo.firstName }} {{ personalInfo.lastName }}</p>
      <p><strong>Email:</strong> {{ personalInfo.email }}</p>
      <p><strong>Phone:</strong> {{ personalInfo.phone }}</p>
      <p><strong>Address:</strong> {{ personalInfo.address }}</p>
      <p><strong>Bio:</strong> {{ personalInfo.bio }}</p>
      <p><strong>LinkedIn:</strong> <a :href="personalInfo.linkedinUrl" target="_blank">{{ personalInfo.linkedinUrl }}</a></p>
      <p><strong>GitHub:</strong> <a :href="personalInfo.githubUrl" target="_blank">{{ personalInfo.githubUrl }}</a></p>
      <p><strong>Website:</strong> <a :href="personalInfo.websiteUrl" target="_blank">{{ personalInfo.websiteUrl }}</a></p>
      
      <div v-if="isAdmin" class="admin-section">
        <button @click="toggleForm">{{ showForm ? 'Cancel' : 'Edit Personal Info' }}</button>
        <div v-if="showForm">
          <h3>Edit Personal Information</h3>
          <form @submit.prevent="updatePersonalInfo">
            <input v-model="formPersonalInfo.firstName" placeholder="First Name" required />
            <input v-model="formPersonalInfo.lastName" placeholder="Last Name" required />
            <input v-model="formPersonalInfo.email" placeholder="Email" required />
            <input v-model="formPersonalInfo.phone" placeholder="Phone" />
            <input v-model="formPersonalInfo.address" placeholder="Address" />
            <textarea v-model="formPersonalInfo.bio" placeholder="Bio" required></textarea>
            <input v-model="formPersonalInfo.linkedinUrl" placeholder="LinkedIn URL" />
            <input v-model="formPersonalInfo.githubUrl" placeholder="GitHub URL" />
            <input v-model="formPersonalInfo.websiteUrl" placeholder="Website URL" />
            <button type="submit">Update</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      personalInfo: {},
      loading: true,
      error: null,
      isAdmin: true, // Update dynamically based on user role
      showForm: false,
      formPersonalInfo: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        bio: '',
        linkedinUrl: '',
        githubUrl: '',
        websiteUrl: '',
      },
    };
  },
  mounted() {
    this.fetchPersonalInfo();
  },
  methods: {
    async fetchPersonalInfo() {
      try {
        const response = await fetch("http://me-api.joneslarry.com/api/personal-info");
        if (!response.ok) {
          throw new Error("Failed to fetch personal info");
        }
        this.personalInfo = await response.json();
        this.formPersonalInfo = { ...this.personalInfo };
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
    async updatePersonalInfo() {
      try {
        const response = await fetch("http://me-api.joneslarry.com/api/admin/personal-info", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(this.formPersonalInfo),
        });
        if (!response.ok) {
          throw new Error("Failed to update personal info");
        }
        this.fetchPersonalInfo();
        this.showForm = false;
      } catch (err) {
        this.error = err.message;
      }
    },
    toggleForm() {
      this.showForm = !this.showForm;
    },
  },
};
</script>

<style scoped>
.personal-info-tab {
  padding: 20px;
}
.admin-section {
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #aaa;
  border-radius: 8px;
  background-color: #f9f9f9;
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
.error {
  color: red;
}
</style>
