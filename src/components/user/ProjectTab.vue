<template>
  <BaseTab title="Projects">
    <template #default>
      <template v-if="loading">
        <div class="skeleton-grid">
          <SkeletonLoader 
            v-for="n in 3" 
            :key="n" 
            type="card" />
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
          :category="project.category || getProjectCategory(project.title)"
          :delay="index * 150"
          class="project-card">
          <div class="project-thumbnail">
            <ImageCarousel 
              v-if="project.screenshots && project.screenshots.length > 0"
              :images="project.screenshots"
              :autoplay="true"
              :interval="5000" />
            <ProgressiveImage 
              v-else 
              :src="getProjectImage(project.id)" 
              :alt="project.title" />
            <div class="image-overlay"></div>
          </div>
          <div class="project-content">
            <h3>{{ project.title }}</h3>
            <p class="project-description">{{ project.description }}</p>
            
            <div class="project-tech" v-if="project.technologies">
              <TechBadge 
                v-for="tech in project.technologies" 
                :key="tech.name"
                :technology="tech" />
            </div>
            <div v-else class="project-tech">
              <span v-for="tech in getProjectTech(project.id)" :key="tech" class="tech-tag">{{ tech }}</span>
            </div>
            
            <div class="project-meta">
              <span class="date">{{ formatDate(project.dateCreated) }}</span>
            </div>
            <div class="project-actions">
              <a v-if="project.githubLink" :href="project.githubLink" target="_blank" class="action-btn github">
                <span class="icon">🔗</span> GitHub
              </a>
              <a v-if="project.liveDemoLink" :href="project.liveDemoLink" target="_blank" class="action-btn demo live-preview">
                <span class="icon">🚀</span> Live Demo
                <div class="preview-glow"></div>
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
import ImageCarousel from "@/components/ImageCarousel.vue";
import TechBadge from "@/components/TechBadge.vue";
import SkeletonLoader from "@/components/SkeletonLoader.vue";
import ProgressiveImage from "@/components/ProgressiveImage.vue";

export default {
  components: { BaseTab, AnimatedCard, ImageCarousel, TechBadge, SkeletonLoader, ProgressiveImage },
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
        1: ['Vue.js', 'JavaScript', 'CSS3'],
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
  position: relative;
  border-radius: 12px 12px 0 0;
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
  z-index: 1;
}

.project-card:hover .project-thumbnail img {
  transform: scale(1.05);
}

.project-card:hover .image-overlay {
  opacity: 0.3;
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
  transition: all 0.2s ease;
}

.tech-tag:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(55, 48, 163, 0.2);
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
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.action-btn.github {
  background: #374151;
  color: white;
}

.action-btn.github:hover {
  background: #1f2937;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(55, 65, 81, 0.4);
}

.action-btn.demo {
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  position: relative;
}

.action-btn.demo:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(99, 102, 241, 0.4);
}

.live-preview {
  position: relative;
  overflow: hidden;
}

.live-preview::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s ease;
}

.live-preview:hover::before {
  left: 100%;
}

.preview-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at center, rgba(255, 255, 255, 0.2) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.live-preview:hover .preview-glow {
  opacity: 1;
}

.skeleton-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

@media (max-width: 768px) {
  .skeleton-grid {
    grid-template-columns: 1fr;
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
