<template>
  <BaseTab title="Education">
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
        :items="educationHistory"
        title="Education"
        :is-experience="false"
        @toggle-view="showTimeline = false"
      />
      
      <ul v-else class="edu-list">
        <li v-for="edu in educationHistory" :key="edu.id">
          <div class="edu-card">
            <h3>{{ edu.schoolName }}</h3>
            <p><strong>Degree:</strong> {{ edu.degree }}</p>
            <p><strong>Years Attended:</strong> {{ edu.startYear }} - {{ edu.endYear }}</p>
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
      educationHistory: [],
      loading: false,
      error: null,
      showTimeline: false,
    };
  },
  methods: {
    async fetchEducationHistory() {
      this.loading = true;
      try {
        const response = await fetch(`${import.meta.env.BASE_URL}data/education.json`);
        this.educationHistory = await response.json();
      } catch (err) {
        this.error = "Failed to load education history.";
        console.error('Education error:', err);
      } finally {
        this.loading = false;
      }
    },
  },
  mounted() {
    this.fetchEducationHistory();
  },
};
</script>

<style scoped>
.edu-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 0;
}

.edu-card {
  background: #ffffff;
  padding: 24px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
}

.edu-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

h3 {
  margin: 0;
  font-size: 20px;
  color: #333;
}

p {
  margin: 5px 0;
  font-size: 16px;
  color: #555;
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
