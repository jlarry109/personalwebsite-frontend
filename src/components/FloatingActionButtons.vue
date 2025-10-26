<template>
  <div class="floating-actions">
    <div class="fab-container" :class="{ expanded: isExpanded }">
      <!-- Main FAB Button -->
      <button 
        class="fab-main" 
        @click="toggleExpanded"
        :class="{ active: isExpanded }"
      >
        <i class="fas" :class="isExpanded ? 'fa-times' : 'fa-plus'"></i>
      </button>
      
      <!-- Action Buttons -->
      <div class="fab-actions" v-show="isExpanded">
        <button 
          v-for="(action, index) in actions" 
          :key="action.id"
          class="fab-action"
          :style="{ animationDelay: index * 0.1 + 's' }"
          @click="handleAction(action)"
          :title="action.label"
        >
          <i :class="action.icon"></i>
          <span class="fab-label">{{ action.label }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FloatingActionButtons',
  data() {
    return {
      isExpanded: false,
      actions: [
        {
          id: 'about',
          icon: 'fas fa-user',
          label: 'About Me',
          section: 'about-me'
        },
        {
          id: 'skills',
          icon: 'fas fa-code',
          label: 'Skills',
          section: 'skills'
        },
        {
          id: 'projects',
          icon: 'fas fa-folder-open',
          label: 'Projects',
          section: 'projects'
        },
        {
          id: 'contact',
          icon: 'fas fa-envelope',
          label: 'Contact',
          section: 'footer'
        }
      ]
    }
  },
  mounted() {
    document.addEventListener('click', this.handleOutsideClick);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleOutsideClick);
  },
  methods: {
    toggleExpanded() {
      this.isExpanded = !this.isExpanded;
    },
    handleAction(action) {
      this.isExpanded = false;
      
      // Scroll to section
      const element = document.getElementById(action.section);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      } else if (action.section === 'footer') {
        // Scroll to footer
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: 'smooth'
        });
      }
      
      // Emit event for parent components
      this.$emit('action-clicked', action);
    },
    handleOutsideClick(event) {
      if (!this.$el.contains(event.target)) {
        this.isExpanded = false;
      }
    }
  }
}
</script>

<style scoped>
.floating-actions {
  position: fixed;
  bottom: 100px;
  right: 2rem;
  z-index: 999;
}

.fab-container {
  position: relative;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
}

.fab-main {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: none;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  font-size: 1.25rem;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(99, 102, 241, 0.4);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  z-index: 2;
}

.fab-main:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 25px rgba(99, 102, 241, 0.5);
}

.fab-main.active {
  transform: rotate(45deg);
  background: linear-gradient(135deg, #ef4444, #f97316);
}

.fab-actions {
  position: absolute;
  bottom: 70px;
  display: flex;
  flex-direction: column-reverse;
  gap: 0.75rem;
  align-items: center;
}

.fab-action {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 25px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  color: #374151;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  animation: fabSlideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  opacity: 0;
  transform: translateY(20px) scale(0.8);
  white-space: nowrap;
}

@keyframes fabSlideIn {
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.fab-action:hover {
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  background: rgba(255, 255, 255, 1);
}

.fab-action i {
  width: 20px;
  text-align: center;
  color: #6366f1;
}

.fab-label {
  font-weight: 600;
}

/* Dark mode support */
.dark .fab-action {
  background: rgba(30, 41, 59, 0.95);
  color: #e2e8f0;
}

.dark .fab-action:hover {
  background: rgba(30, 41, 59, 1);
}

.dark .fab-action i {
  color: #a78bfa;
}

/* Mobile responsive */
@media (max-width: 768px) {
  .floating-actions {
    bottom: 80px;
    right: 1rem;
  }
  
  .fab-main {
    width: 48px;
    height: 48px;
    font-size: 1rem;
  }
  
  .fab-action {
    padding: 0.5rem 0.75rem;
    font-size: 0.8rem;
  }
  
  .fab-actions {
    bottom: 60px;
    gap: 0.5rem;
  }
}

/* Hide labels on very small screens */
@media (max-width: 480px) {
  .fab-label {
    display: none;
  }
  
  .fab-action {
    width: 40px;
    height: 40px;
    padding: 0;
    justify-content: center;
    border-radius: 50%;
  }
}
</style>