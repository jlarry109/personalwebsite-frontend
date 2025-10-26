<template>
  <div class="project-showcase">
    <div class="showcase-header">
      <h2 class="text-3xl">Featured Projects</h2>
      <div class="view-controls">
        <button 
          @click="viewMode = 'grid'" 
          :class="{ active: viewMode === 'grid' }"
          class="view-btn"
        >
          <i class="fas fa-th"></i>
        </button>
        <button 
          @click="viewMode = 'list'" 
          :class="{ active: viewMode === 'list' }"
          class="view-btn"
        >
          <i class="fas fa-list"></i>
        </button>
      </div>
    </div>
    
    <div 
      :class="[
        'projects-container',
        `view-${viewMode}`,
        { 'masonry-layout': viewMode === 'masonry' }
      ]"
    >
      <div 
        v-for="(project, index) in projects" 
        :key="project.id"
        class="project-card"
        :class="`category-${project.category}`"
        :style="{ animationDelay: `${index * 100}ms` }"
      >
        <div class="project-image">
          <img :src="project.image" :alt="project.title" />
          <div class="image-overlay">
            <div class="overlay-actions">
              <a :href="project.liveUrl" class="action-btn" v-if="project.liveUrl">
                <i class="fas fa-external-link-alt"></i>
              </a>
              <a :href="project.githubUrl" class="action-btn" v-if="project.githubUrl">
                <i class="fab fa-github"></i>
              </a>
            </div>
          </div>
        </div>
        
        <div class="project-content">
          <div class="project-meta">
            <span class="category-tag">{{ project.category }}</span>
            <span class="date">{{ project.date }}</span>
          </div>
          
          <h3 class="project-title">{{ project.title }}</h3>
          <p class="project-description">{{ project.description }}</p>
          
          <div class="tech-stack">
            <span 
              v-for="tech in project.technologies" 
              :key="tech"
              class="tech-tag"
            >
              {{ tech }}
            </span>
          </div>
          
          <div class="project-stats" v-if="project.stats">
            <div class="stat" v-for="stat in project.stats" :key="stat.label">
              <span class="stat-value">{{ stat.value }}</span>
              <span class="stat-label">{{ stat.label }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProjectShowcase',
  props: {
    projects: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      viewMode: 'grid'
    }
  }
}
</script>

<style scoped>
.project-showcase {
  padding: var(--space-2xl) 0;
}

.showcase-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-2xl);
}

.view-controls {
  display: flex;
  gap: var(--space-xs);
  background: rgba(255, 255, 255, 0.8);
  padding: var(--space-xs);
  border-radius: 12px;
  backdrop-filter: blur(8px);
}

.view-btn {
  padding: var(--space-sm) var(--space-md);
  border: none;
  background: transparent;
  color: #6b7280;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.view-btn:hover {
  background: rgba(99, 102, 241, 0.1);
  color: #6366f1;
}

.view-btn.active {
  background: #6366f1;
  color: white;
}

/* Grid View */
.projects-container.view-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(350px, 100%), 1fr));
  gap: var(--grid-gap-lg);
}

/* List View */
.projects-container.view-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

.projects-container.view-list .project-card {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: var(--space-xl);
  align-items: start;
}

/* Masonry Layout */
.projects-container.masonry-layout {
  columns: 3;
  column-gap: var(--grid-gap);
}

.projects-container.masonry-layout .project-card {
  break-inside: avoid;
  margin-bottom: var(--space-lg);
}

.project-card {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0;
  transform: translateY(30px);
  animation: fadeInUp 0.6s ease-out forwards;
}

.project-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
}

.project-image {
  position: relative;
  aspect-ratio: 16/10;
  overflow: hidden;
}

.project-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.project-card:hover .project-image img {
  transform: scale(1.1);
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.project-card:hover .image-overlay {
  opacity: 1;
}

.overlay-actions {
  display: flex;
  gap: var(--space-md);
}

.action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border-radius: 50%;
  text-decoration: none;
  backdrop-filter: blur(8px);
  transition: all 0.3s ease;
}

.action-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.1);
}

.project-content {
  padding: var(--space-xl);
}

.project-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-md);
}

.category-tag {
  background: rgba(99, 102, 241, 0.1);
  color: #6366f1;
  padding: var(--space-xs) var(--space-sm);
  border-radius: 20px;
  font-size: var(--text-xs);
  font-weight: 600;
  text-transform: uppercase;
}

.date {
  color: #6b7280;
  font-size: var(--text-sm);
}

.project-title {
  font-size: var(--text-xl);
  font-weight: 700;
  color: #1f2937;
  margin-bottom: var(--space-sm);
  line-height: 1.3;
}

.project-description {
  color: #6b7280;
  line-height: 1.6;
  margin-bottom: var(--space-lg);
}

.tech-stack {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-xs);
  margin-bottom: var(--space-lg);
}

.tech-tag {
  background: rgba(139, 92, 246, 0.1);
  color: #8b5cf6;
  padding: var(--space-xs) var(--space-sm);
  border-radius: 12px;
  font-size: var(--text-xs);
  font-weight: 500;
}

.project-stats {
  display: flex;
  gap: var(--space-lg);
  padding-top: var(--space-md);
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.stat {
  text-align: center;
}

.stat-value {
  display: block;
  font-size: var(--text-lg);
  font-weight: 700;
  color: #6366f1;
}

.stat-label {
  font-size: var(--text-xs);
  color: #6b7280;
  text-transform: uppercase;
  font-weight: 500;
}

/* Category Colors */
.category-web {
  border-left: 4px solid #3b82f6;
}

.category-mobile {
  border-left: 4px solid #8b5cf6;
}

.category-business {
  border-left: 4px solid #10b981;
}

/* Mobile Optimizations */
@media (max-width: 768px) {
  .projects-container.view-grid {
    grid-template-columns: 1fr;
  }
  
  .projects-container.view-list .project-card {
    grid-template-columns: 1fr;
  }
  
  .projects-container.masonry-layout {
    columns: 1;
  }
  
  .showcase-header {
    flex-direction: column;
    gap: var(--space-md);
    text-align: center;
  }
  
  .project-content {
    padding: var(--space-lg);
  }
  
  .project-stats {
    justify-content: space-around;
  }
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.dark .project-card {
  background: rgba(15, 23, 42, 0.8);
  border-color: rgba(51, 65, 85, 0.3);
}

.dark .project-title {
  color: #f1f5f9;
}

.dark .project-description {
  color: #94a3b8;
}
</style>