<template>
  <BaseTab title="Skills">
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
  </BaseTab>
</template>

<script>
import axios from "axios";
import BaseTab from "@/components/BaseTab.vue";

export default {
  components: { BaseTab },
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
.skill-list {
  list-style: none;
  padding: 0;
}
.skill-item {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}
.skill-name {
  font-weight: bold;
  color: #fff; 
}
.proficiency {
  font-style: italic;
  color: rgba(255, 255, 255, 0.8);
}
.error {
  color: red;
}
</style>
