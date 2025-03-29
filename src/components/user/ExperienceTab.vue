<template>
  <BaseTab title="Work Experience">
    <template v-if="loading">Loading...</template>
    <template v-else-if="error">
      <div class="error">{{ error }}</div>
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
import axios from "axios";
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
    async fetchExperiences() {
      this.loading = true;
      try {
        const response = await axios.get("https://me-api.joneslarry.com/api/experience");
        this.experiences = response.data;
      } catch (err) {
        this.error = "Failed to load work experience.";
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

.error {
  color: red;
  text-align: center;
  font-size: 18px;
}
</style>
