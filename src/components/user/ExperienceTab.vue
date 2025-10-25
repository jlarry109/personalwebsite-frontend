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
      <div class="view-controls">
        <button @click="showTimeline = !showTimeline" class="view-toggle">
          {{ showTimeline ? '📋 List View' : '📅 Timeline View' }}
        </button>
      </div>
      
      <TimelineView 
        v-if="showTimeline"
        :items="experiences"
        title="Work Experience"
        :is-experience="true"
        @toggle-view="showTimeline = false"
      />
      
      <ul v-else class="experience-list">
        <li v-for="exp in experiences" :key="exp.id">
          <div class="experience-card">
            <h3>{{ exp.position }} at {{ exp.companyName }}</h3>
            <p class="dates">
              {{ formatDate(exp.startDate) }} - {{ exp.endDate ? formatDate(exp.endDate) : "Present" }}
            </p>
            <p class="description">{{ exp.description }}</p>
          </div>
        </li>
      </ul>
    </template>
  </BaseTab>
</template>

<script>
import BaseTab from "@/components/BaseTab.vue";

import TimelineView from "@/components/TimelineView.vue";

export default {
  components: { BaseTab, TimelineView },
  data() {
    return {
      experiences: [],
      loading: false,
      error: null,
      showTimeline: false,
    };
  },
  methods: {
    async fetchExperiences() {
      this.loading = true;
      try {
        const response = await fetch('./data/experience.json');
        const data = await response.json();
        this.experiences = data.sort((a, b) => {
          const dateA = new Date(a.startDate);
          const dateB = new Date(b.startDate);
          return dateB - dateA;
        });
      } catch (err) {
        this.error = "Failed to load work experience.";
        console.error('Experience error:', err);
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
    this.fetchExperiences();
  },
};
</script>

<style scoped>
.experience-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 0 0 0 20px;
  list-style: disc;
}

.experience-card {
  background: #ffffff;
  padding: 24px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
}

.experience-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

h3 {
  margin: 0;
  font-size: 20px;
  color: #333;
}

.dates {
  font-size: 14px;
  color: #777;
  margin: 5px 0;
}

.description {
  font-size: 16px;
  color: #333;
  line-height: 1.5;
  margin: 5px 0;
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

.view-controls {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 24px;
}

.view-toggle {
  background: #6366f1;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.view-toggle:hover {
  background: #4f46e5;
  transform: translateY(-1px);
}
</style>
