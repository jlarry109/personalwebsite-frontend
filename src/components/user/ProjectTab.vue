<template>
  <BaseTab title="Projects">
    <template #default>
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
        <AnimatedCard 
          v-for="(project, index) in projects" 
          :key="project.id" 
          :category="getProjectCategory(project.title)"
          :delay="index * 150"
          class="project-card">
          <div class="project-thumbnail">
            <img :src="getProjectImage(project.id)" :alt="project.title" />
            <div class="image-overlay"></div>
          </div>
          <div class="project-content">
            <h3>{{ project.title }}</h3>
            <p class="project-description">{{ project.description }}</p>
            <div class="project-tech">
              <span v-for="tech in getProjectTech(project.id)" :key="tech" class="tech-tag">{{ tech }}</span>
            </div>
            <div class="project-meta">
              <span class="date">{{ formatDate(project.dateCreated) }}</span>
            </div>
            <div class="project-actions">
              <a v-if="project.githubLink" :href="project.githubLink" target="_blank" class="action-btn github">
                <span class="icon">🔗</span> GitHub
              </a>
              <a v-if="project.liveDemoLink" :href="project.liveDemoLink" target="_blank" class="action-btn demo">
                <span class="icon">🚀</span> Live Demo
              </a>
            </div>
          </div>
        </AnimatedCard>
      </div>
    </template>
  </BaseTab>
</template>

<script>
import BaseTab from "@/components/BaseTab.vue";
import AnimatedCard from "@/components/AnimatedCard.vue";

export default {
  components: { BaseTab, AnimatedCard },
  data() {
    return {
      projects: [],
      loading: false,
      error: null,
    };
  },
  methods: {
    async fetchProjects() {
      this.loading = true;
      try {
        const response = await fetch(`${import.meta.env.BASE_URL}data/projects.json`);
        this.projects = await response.json();
      } catch (err) {
        this.error = "Failed to load projects.";
        console.error('Projects error:', err);
      } finally {
        this.loading = false;
      }
    },
    formatDate(date) {
      const dateObj = new Date(date);
      return dateObj.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short' 
      });
    },
    getProjectImage(projectId) {
      return `${import.meta.env.BASE_URL}logo3.png`;
    },
    getProjectTech(projectId) {
      const techStacks = {
        1: ['Java', 'Spring Boot', 'Vue.js'],
        2: ['React', 'Node.js', 'MongoDB'],
        3: ['React Native', 'Firebase']
      };
      return techStacks[projectId] || ['JavaScript', 'HTML', 'CSS'];
    },
    getProjectCategory(title) {
      if (title.toLowerCase().includes('portfolio') || title.toLowerCase().includes('website')) {
        return 'web';
      }
      if (title.toLowerCase().includes('ecommerce') || title.toLowerCase().includes('platform')) {
        return 'business';
      }
      if (title.toLowerCase().includes('social') || title.toLowerCase().includes('app')) {
        return 'mobile';
      }
      return 'default';
    }
  },
  mounted() {
    this.fetchProjects();
  },
};
</script>

<style scoped>
.project-card {
  margin-bottom: 32px;
}

.project-card:hover .image-overlay {
  opacity: 0.3;
}

.project-thumbnail {
  width: 100%;
  height: 200px;
  overflow: hidden;
  background: #f3f4f6;
}

.project-thumbnail {
  position: relative;
}

.project-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, rgba(99, 102, 241, 0.2), rgba(139, 92, 246, 0.2));
  opacity: 0;
  transition: opacity 0.4s ease;
}

.project-card:hover .project-thumbnail img {
  transform: scale(1.08);
}

.project-content {
  padding: 24px;
}

h3 {
  font-size: 20px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 12px;
  line-height: 1.3;
}

.project-description {
  color: #6b7280;
  line-height: 1.6;
  margin-bottom: 16px;
}

.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
}

.tech-tag {
  background: #e0e7ff;
  color: #3730a3;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 500;
}

.project-meta {
  margin-bottom: 20px;
}

.date {
  color: #9ca3af;
  font-size: 14px;
}

.project-actions {
  display: flex;
  gap: 12px;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  font-size: 14px;
  transition: all 0.2s ease;
}

.action-btn.github {
  background: #374151;
  color: white;
}

.action-btn.github:hover {
  background: #1f2937;
}

.action-btn.demo {
  background: #6366f1;
  color: white;
}

.action-btn.demo:hover {
  background: #4f46e5;
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
