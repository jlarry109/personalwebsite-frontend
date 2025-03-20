<template>
  <div class="testimonial-tab">
    <h2>Testimonials</h2>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <ul v-else>
      <li v-for="testimonial in testimonials" :key="testimonial.id" class="testimonial-item">
        <div class="testimonial-content">
          <p class="message">"{{ testimonial.message }}"</p>
          <p class="author">
            - {{ testimonial.name }}, {{ testimonial.role }} @ {{ testimonial.organization }}
          </p>
          <p class="date">{{ formatDate(testimonial.submittedAt) }}</p>
        </div>
        <div v-if="isAdmin" class="admin-actions">
          <button @click="editTestimonial(testimonial)">Update</button>
          <button @click="deleteTestimonial(testimonial.id)" class="delete-btn">Delete</button>
        </div>
      </li>
    </ul>

    <div v-if="isAdmin" class="admin-section">
      <button @click="toggleForm">{{ showForm ? 'Cancel' : (editingTestimonial ? 'Edit Testimonial' : 'Add Testimonial') }}</button>
      <div v-if="showForm">
        <h3>{{ editingTestimonial ? 'Edit Testimonial' : 'Add Testimonial' }}</h3>
        <form @submit.prevent="editingTestimonial ? updateTestimonial() : addTestimonial()">
          <input v-model="formTestimonial.name" placeholder="Name" required />
          <input v-model="formTestimonial.role" placeholder="Role" required />
          <input v-model="formTestimonial.organization" placeholder="Organization" required />
          <textarea v-model="formTestimonial.message" placeholder="Message" required></textarea>
          <button type="submit">{{ editingTestimonial ? 'Update' : 'Add' }}</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      testimonials: [],
      loading: true,
      error: null,
      isAdmin: true, // Change dynamically based on user role
      showForm: false,
      editingTestimonial: null,
      formTestimonial: {
        name: "",
        message: "",
        role: "",
        organization: "",
      },
    };
  },
  mounted() {
    this.fetchTestimonials();
  },
  methods: {
    async fetchTestimonials() {
      try {
        const response = await fetch("http://me-api.joneslarry.com/api/testimonials");
        if (!response.ok) throw new Error("Failed to fetch testimonials");
        this.testimonials = await response.json();
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
    async addTestimonial() {
      try {
        const response = await fetch("http://me-api.joneslarry.com/api/admin/testimonials", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(this.formTestimonial),
        });
        if (!response.ok) throw new Error("Failed to add testimonial");
        this.fetchTestimonials();
        this.resetForm();
      } catch (err) {
        this.error = err.message;
      }
    },
    async updateTestimonial() {
      try {
        const response = await fetch(`http://me-api.joneslarry.com/api/admin/testimonials/${this.editingTestimonial.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(this.formTestimonial),
        });
        if (!response.ok) throw new Error("Failed to update testimonial");
        this.fetchTestimonials();
        this.resetForm();
      } catch (err) {
        this.error = err.message;
      }
    },
    async deleteTestimonial(id) {
      if (!confirm("Are you sure you want to delete this testimonial?")) return;
      try {
        const response = await fetch(`hhttp://me-api.joneslarry.com/api/admin/testimonials/${id}`, {
          method: "DELETE",
        });
        if (!response.ok) throw new Error("Failed to delete testimonial");
        this.fetchTestimonials();
      } catch (err) {
        this.error = err.message;
      }
    },
    editTestimonial(testimonial) {
      this.editingTestimonial = testimonial;
      this.formTestimonial = { ...testimonial };
      this.showForm = true;
    },
    toggleForm() {
      this.showForm = !this.showForm;
      if (!this.showForm) this.resetForm();
    },
    resetForm() {
      this.showForm = false;
      this.editingTestimonial = null;
      this.formTestimonial = { name: "", message: "", role: "", organization: "" };
    },
    formatDate(date) {
      return new Date(date).toLocaleString();
    },
  },
};
</script>

<style scoped>
.testimonial-tab {
  padding: 20px;
}
.testimonial-item {
  border-bottom: 1px solid #ddd;
  padding: 15px;
}
.message {
  font-style: italic;
}
.author {
  font-weight: bold;
  margin-top: 5px;
}
.date {
  font-size: 0.8rem;
  color: gray;
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
