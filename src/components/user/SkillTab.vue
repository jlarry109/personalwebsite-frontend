<template>
  <div class="skill-tab">
    <h2>Skills</h2>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else>
      <ul class="skill-list">
        <li v-for="skill in skills" :key="skill.id" class="skill-item">
          <span class="skill-name">{{ skill.skillName }}</span>
          <span class="proficiency">({{ skill.proficiencyLevel }})</span>
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
      skills: [],
      loading: false,
      error: null,
    };
  },
  methods: {
    async fetchSkills() {
      this.loading = true;
      try {
        const response = await axios.get("http://me-api.joneslarry.com/api/skill");
        this.skills = response.data;
      } catch (err) {
        this.error = "Failed to load skills.";
      } finally {
        this.loading = false;
      }
    },
  },
  mounted() {
    this.fetchSkills();
  },
};
</script>

<style scoped>
.skill-tab {
  max-width: 600px;
  margin: auto;
  padding: 20px;
}
.skill-list {
  list-style: none;
  padding: 0;
}
.skill-item {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}
.skill-name {
  font-weight: bold;
}
.proficiency {
  font-style: italic;
  color: #555;
}
.error {
  color: red;
}
</style>
