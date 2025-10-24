<template>
  <BaseTab title="Testimonials">
    <template v-if="loading">
      <div class="skeleton-loader">
        <div class="skeleton-text"></div>
        <div class="skeleton-text short"></div>
        <div class="skeleton-text"></div>
      </div>
    </template>
    <template v-else-if="error">
      <div class="error">
        <span>{{ error }}</span>
        <button @click="error = null">×</button>
      </div>
    </template>
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
    fetchTestimonials() {
      this.loading = true;
      try {
        this.testimonials = JSON.parse(import.meta.env.VITE_TESTIMONIALS || '[]');
      } catch (err) {
        this.error = "Failed to load testimonials.";
        console.error('Testimonials error:', err);
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

.author strong {
  color: white; /* Ensures bold text remains visible */
  font-weight: bold; 
}
.date {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
  margin-top: 3px;
}

.skeleton-loader {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 15px;
}

.skeleton-text {
  width: 100%;
  height: 15px;
  background: linear-gradient(90deg, #f3f3f3, #e0e0e0, #f3f3f3);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

.skeleton-text.short {
  width: 60%;
}

@keyframes loading {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

.error {
  background: #ffdddd;
  color: red;
  padding: 10px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.error button {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}
</style>
