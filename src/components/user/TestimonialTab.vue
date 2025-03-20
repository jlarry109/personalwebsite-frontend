<template>
  <div class="testimonial-tab">
    <h2>Testimonials</h2>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else>
      <ul class="testimonial-list">
        <li v-for="testimonial in testimonials" :key="testimonial.id" class="testimonial-item">
          <blockquote>
            <p>{{ testimonial.message }}</p>
          </blockquote>
          <div class="author">
            <strong>{{ testimonial.name }}</strong> - {{ testimonial.role }}, {{ testimonial.organization }}
          </div>
          <div class="date">{{ formatDate(testimonial.submittedAt) }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      testimonials: [],
      loading: false,
      error: null,
    };
  },
  methods: {
    async fetchTestimonials() {
      this.loading = true;
      try {
        const response = await axios.get("http://me-api.joneslarry.com/api/testimonial");
        this.testimonials = response.data;
      } catch (err) {
        this.error = "Failed to load testimonials.";
      } finally {
        this.loading = false;
      }
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString();
    },
  },
  mounted() {
    this.fetchTestimonials();
  },
};
</script>

<style scoped>
.testimonial-tab {
  max-width: 700px;
  margin: auto;
  padding: 20px;
}
.testimonial-list {
  list-style: none;
  padding: 0;
}
.testimonial-item {
  border-bottom: 1px solid #ddd;
  padding: 15px 0;
}
blockquote {
  font-style: italic;
  margin: 0;
  color: #444;
}
.author {
  font-size: 14px;
  margin-top: 5px;
  color: #333;
}
.date {
  font-size: 12px;
  color: gray;
  margin-top: 3px;
}
.error {
  color: red;
}
</style>
