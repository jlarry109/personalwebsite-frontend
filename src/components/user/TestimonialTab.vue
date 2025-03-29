<template>
  <BaseTab title="Testimonials">
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
  </BaseTab>
</template>

<script>
import axios from "axios";
import BaseTab from "@/components/BaseTab.vue";

export default {
  components: { BaseTab },
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
        const response = await axios.get("https://me-api.joneslarry.com/api/testimonial");
        this.testimonials = response.data;
      } catch (err) {
        this.error = "Failed to load testimonials.";
      } finally {
        this.loading = false;
      }
    },
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString();
    },
  },
  mounted() {
    this.fetchTestimonials();
  },
};
</script>

<style scoped>
.testimonial-list {
  list-style: none;
  padding: 0;
}
.testimonial-item {
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding: 15px 0;
}
blockquote {
  font-style: italic;
  margin: 0;
  color: rgba(255, 255, 255, 0.9); 
}
.author {
  font-size: 14px;
  margin-top: 5px;
  color: #fff; 
}
.date {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
  margin-top: 3px;
}
.error {
  color: red;
}
</style>
