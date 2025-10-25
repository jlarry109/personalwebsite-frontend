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
      <div class="testimonial-list">
        <AnimatedCard 
          v-for="(testimonial, index) in testimonials" 
          :key="testimonial.id"
          category="testimonial"
          :delay="index * 150"
          class="testimonial-item">
          <div class="testimonial-content">
            <blockquote>
              <p>{{ testimonial.message }}</p>
            </blockquote>
            <div class="author">
              <strong>{{ testimonial.name }}</strong> - {{ testimonial.role }}, {{ testimonial.organization }}
            </div>
            <div class="date">{{ formatDate(testimonial.submittedAt) }}</div>
          </div>
        </AnimatedCard>
      </div>
    </div>
  </BaseTab>
</template>

<script>
import BaseTab from "@/components/BaseTab.vue";
import AnimatedCard from "@/components/AnimatedCard.vue";

export default {
  components: { BaseTab, AnimatedCard },
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
        const response = await fetch(`${import.meta.env.BASE_URL}data/testimonials.json`);
        this.testimonials = await response.json();
      } catch (err) {
        this.error = "Failed to load testimonials.";
        console.error('Testimonials error:', err);
      } finally {
        this.loading = false;
      }
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short' 
      });
    },
  },
  mounted() {
    this.fetchTestimonials();
  },
};
</script>

<style scoped>
.testimonial-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.testimonial-item {
  margin-bottom: 0;
}

.testimonial-content {
  padding: 24px;
  color: #333;
}
blockquote {
  font-style: italic;
  margin: 0 0 10px 0;
  color: #333;
}
.author {
  font-size: 14px;
  margin-top: 5px;
  color: #333;
}

.author strong {
  color: #333;
  font-weight: bold;
}
.date {
  font-size: 12px;
  color: #666;
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
