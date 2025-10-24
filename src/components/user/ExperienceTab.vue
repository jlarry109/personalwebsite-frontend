<template>
  <BaseTab title="Work Experience">
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
    <template v-else>
      <div class="experience-list">
        <div v-for="exp in experiences" :key="exp.id" class="experience-card">
          <h3>{{ exp.position }} at {{ exp.companyName }}</h3>
          <p class="dates">
            {{ formatDate(exp.startDate) }} - {{ exp.endDate ? formatDate(exp.endDate) : "Present" }}
          </p>
          <p class="description">{{ exp.description }}</p>
          <ul class="task-list">
            <li v-for="detail in exp.details" :key="detail.id">
              {{ detail.taskDescription }}
            </li>
          </ul>
        </div>
      </div>
    </template>
  </BaseTab>
</template>

<script>
import BaseTab from "@/components/BaseTab.vue";

export default {
  components: { BaseTab },
  data() {
    return {
      experiences: [],
      loading: false,
      error: null,
    };
  },
  methods: {
    fetchExperiences() {
      this.loading = true;
      try {
        this.experiences = JSON.parse(import.meta.env.VITE_EXPERIENCE || '[]');
      } catch (err) {
        this.error = "Failed to load work experience.";
        console.error('Experience error:', err);
      } finally {
        this.loading = false;
      }
    },
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString();
    },
  },
  mounted() {
    this.fetchExperiences();
  },
};
</script>

<style scoped>
.experience-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.experience-card {
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;
}

.experience-card:hover {
  transform: translateY(-3px);
}

h3 {
  margin: 0;
  font-size: 20px;
  color: #333;
}

.dates {
  font-size: 14px;
  color: #777;
  margin-bottom: 10px;
}

.description {
  font-size: 16px;
  color: #555;
  line-height: 1.5;
}

.task-list {
  list-style: none;
  padding: 0;
  margin-top: 10px;
}

.task-list li {
  font-size: 14px;
  color: #444;
  padding-left: 15px;
  position: relative;
}

.task-list li::before {
  content: "•";
  color: #007bff;
  position: absolute;
  left: 0;
  font-size: 16px;
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
