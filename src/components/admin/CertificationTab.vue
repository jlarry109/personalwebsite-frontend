<template>
  <div class="certification-tab">
    <h2>Certifications</h2>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <ul v-else>
      <li v-for="cert in certifications" :key="cert.id" class="cert-item">
        <div>
          <strong>{{ cert.certName }}</strong> - {{ cert.issuingOrg }} ({{ cert.dateEarned }})
          <a v-if="cert.certUrl" :href="cert.certUrl" target="_blank">View Certificate</a>
        </div>
        <div v-if="isAdmin" class="admin-actions">
          <button @click="editCertification(cert)">Update</button>
          <button @click="deleteCertification(cert.id)" class="delete-btn">Delete</button>
        </div>
      </li>
    </ul>

    <div v-if="isAdmin" class="admin-section">
      <button @click="toggleForm">{{ showForm ? 'Cancel' : (editingCert ? 'Edit Certification' : 'Add Certification') }}</button>
      <div v-if="showForm">
        <h3>{{ editingCert ? 'Edit Certification' : 'Add Certification' }}</h3>
        <form @submit.prevent="editingCert ? updateCertification() : addCertification()">
          <input v-model="formCert.certName" placeholder="Certification Name" required />
          <input v-model="formCert.issuingOrg" placeholder="Issuing Organization" required />
          <input type="date" v-model="formCert.dateEarned" required />
          <input v-model="formCert.certUrl" placeholder="Certificate URL" />
          <button type="submit">{{ editingCert ? 'Update' : 'Add' }}</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      certifications: [],
      loading: true,
      error: null,
      isAdmin: true, // Change dynamically based on user role
      showForm: false,
      editingCert: null,
      formCert: {
        certName: "",
        issuingOrg: "",
        dateEarned: "",
        certUrl: "",
      },
    };
  },
  mounted() {
    this.fetchCertifications();
  },
  methods: {
    async fetchCertifications() {
      try {
        const response = await fetch("http://me-api.joneslarry.com/api/certification");
        if (!response.ok) throw new Error("Failed to fetch certifications");
        this.certifications = await response.json();
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
    async addCertification() {
      try {
        const response = await fetch("http://me-api.joneslarry.com/api/admin/certification", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(this.formCert),
        });
        if (!response.ok) throw new Error("Failed to add certification");
        this.fetchCertifications();
        this.resetForm();
      } catch (err) {
        this.error = err.message;
      }
    },
    async updateCertification() {
      try {
        const response = await fetch(`http://me-api.joneslarry.com/api/admin/certification/${this.editingCert.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(this.formCert),
        });
        if (!response.ok) throw new Error("Failed to update certification");
        this.fetchCertifications();
        this.resetForm();
      } catch (err) {
        this.error = err.message;
      }
    },
    async deleteCertification(id) {
      if (!confirm("Are you sure you want to delete this certification?")) return;
      try {
        const response = await fetch(`http://me-api.joneslarry.com/api/admin/certification/${id}`, {
          method: "DELETE",
        });
        if (!response.ok) throw new Error("Failed to delete certification");
        this.fetchCertifications();
      } catch (err) {
        this.error = err.message;
      }
    },
    editCertification(cert) {
      this.editingCert = cert;
      this.formCert = { ...cert };
      this.showForm = true;
    },
    toggleForm() {
      this.showForm = !this.showForm;
      if (!this.showForm) this.resetForm();
    },
    resetForm() {
      this.showForm = false;
      this.editingCert = null;
      this.formCert = { certName: "", issuingOrg: "", dateEarned: "", certUrl: "" };
    },
  },
};
</script>

<style scoped>
.certification-tab {
  padding: 20px;
}
.cert-item {
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
