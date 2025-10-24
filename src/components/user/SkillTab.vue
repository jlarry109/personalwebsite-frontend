<template>
  <BaseTab title="Skills">
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
        const response = await fetch('./data/skills.json');
        this.skills = await response.json();
      } catch (err) {
        this.error = "Failed to load skills.";
        console.error('Skills error:', err);
      } finally {
        this.loading = false;
      }
    },
  },
  mounted() {
    console.log('SkillTab mounted');
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
