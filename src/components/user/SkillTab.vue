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
      <SearchFilter @search="handleSearch" />
      <div v-if="filteredSkills.length === 0" class="empty-state">
        <div class="empty-icon">🎯</div>
        <h3>No Skills Found</h3>
        <p>{{ searchQuery ? 'No skills match your search.' : 'Skills will appear here once they are added.' }}</p>
      </div>
      <ul v-else class="skill-list">
        <li v-for="skill in filteredSkills" :key="skill.id" class="skill-item">
          <div class="skill-content">
            <span class="skill-name">{{ skill.skillName }}</span>
            <span class="proficiency-label" :class="skill.proficiencyLevel">{{ skill.proficiencyLevel }}</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" :class="skill.proficiencyLevel" :style="{ width: getProficiencyWidth(skill.proficiencyLevel) }"></div>
          </div>
        </li>
      </ul>
    </div>
  </BaseTab>
</template>

<script lang="js">
import BaseTab from "@/components/BaseTab.vue";
import SearchFilter from "@/components/SearchFilter.vue";

export default {
  components: { BaseTab, SearchFilter },
  data() {
    return {
      skills: [],
      loading: false,
      error: null,
      searchQuery: '',
    };
  },
  computed: {
    filteredSkills() {
      if (!this.searchQuery) return this.skills;
      return this.skills.filter(skill => 
        skill.skillName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        skill.proficiencyLevel.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  methods: {
    fetchSkills() {
      this.loading = true;
      try {
        this.skills = JSON.parse(import.meta.env.VITE_SKILLS || '[]');
        console.log('Skills loaded:', this.skills);
      } catch (err) {
        this.error = "Failed to load skills.";
        console.error('Skills error:', err);
      } finally {
        this.loading = false;
      }
    },
    handleSearch(query) {
      this.searchQuery = query;
    },
    getProficiencyWidth(level) {
      const widths = {
        'EXPERT': '100%',
        'ADVANCED': '75%',
        'INTERMEDIATE': '50%',
        'BEGINNER': '25%'
      };
      return widths[level] || '0%';
    }
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
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 16px;
}

@media (max-width: 768px) {
  .skill-list {
    grid-template-columns: 1fr;
  }
}
.skill-item {
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  padding: 24px;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  margin-bottom: 16px;
  position: relative;
  overflow: hidden;
}

.skill-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #6366f1, #8b5cf6, #06b6d4);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.skill-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  border-color: #cbd5e1;
}

.skill-item:hover::before {
  opacity: 1;
}

.skill-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.skill-name {
  font-weight: 700;
  color: #1e293b;
  font-size: 17px;
  letter-spacing: -0.025em;
}

.proficiency-label {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 4px 8px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(4px);
}

.proficiency-label.EXPERT {
  color: #059669;
  background: rgba(16, 185, 129, 0.1);
}

.proficiency-label.ADVANCED {
  color: #4f46e5;
  background: rgba(99, 102, 241, 0.1);
}

.proficiency-label.INTERMEDIATE {
  color: #d97706;
  background: rgba(245, 158, 11, 0.1);
}

.proficiency-label.BEGINNER {
  color: #dc2626;
  background: rgba(239, 68, 68, 0.1);
}

.progress-bar {
  width: 100%;
  height: 10px;
  background: #f1f5f9;
  border-radius: 6px;
  overflow: hidden;
  position: relative;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.05);
}

.progress-fill {
  height: 100%;
  border-radius: 6px;
  transition: width 1.2s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.progress-fill::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.progress-fill.EXPERT {
  background: linear-gradient(90deg, #10b981, #059669);
  box-shadow: 0 2px 4px rgba(16, 185, 129, 0.3);
}

.progress-fill.ADVANCED {
  background: linear-gradient(90deg, #6366f1, #4f46e5);
  box-shadow: 0 2px 4px rgba(99, 102, 241, 0.3);
}

.progress-fill.INTERMEDIATE {
  background: linear-gradient(90deg, #f59e0b, #d97706);
  box-shadow: 0 2px 4px rgba(245, 158, 11, 0.3);
}

.progress-fill.BEGINNER {
  background: linear-gradient(90deg, #ef4444, #dc2626);
  box-shadow: 0 2px 4px rgba(239, 68, 68, 0.3);
}

.skeleton-loader {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  padding: 0;
}

.skeleton-text {
  height: 120px;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f8fafc 100%);
  background-size: 200% 100%;
  animation: loading 2s ease-in-out infinite;
  border-radius: 16px;
  position: relative;
  overflow: hidden;
}

.skeleton-text::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent);
  animation: shimmer 1.5s infinite;
}

.skeleton-text.short {
  width: 60%;
}

@keyframes loading {
  0%, 100% {
    background-position: -200% 0;
  }
  50% {
    background-position: 200% 0;
  }
}

.error {
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(220, 38, 38, 0.05) 100%);
  color: #dc2626;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid rgba(239, 68, 68, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 6px -1px rgba(239, 68, 68, 0.1);
  backdrop-filter: blur(4px);
  font-weight: 500;
}

.error button {
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.2);
  color: #dc2626;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.error button:hover {
  background: rgba(239, 68, 68, 0.2);
  transform: scale(1.1);
}

.empty-state {
  text-align: center;
  padding: 64px 32px;
  background: linear-gradient(135deg, rgba(248, 250, 252, 0.5) 0%, rgba(241, 245, 249, 0.3) 100%);
  border-radius: 20px;
  border: 2px dashed #cbd5e1;
  margin: 20px 0;
}

.empty-icon {
  font-size: 64px;
  margin-bottom: 24px;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.empty-state h3 {
  color: #1e293b;
  margin-bottom: 12px;
  font-size: 24px;
  font-weight: 700;
  letter-spacing: -0.025em;
}

.empty-state p {
  color: #64748b;
  font-size: 16px;
  line-height: 1.6;
  max-width: 400px;
  margin: 0 auto;
}
</style>
