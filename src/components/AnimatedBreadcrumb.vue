<template>
  <nav class="animated-breadcrumb" aria-label="Breadcrumb">
    <ol class="breadcrumb-list">
      <li 
        v-for="(item, index) in breadcrumbs" 
        :key="item.path"
        class="breadcrumb-item"
        :class="{ active: index === breadcrumbs.length - 1 }"
        :style="{ animationDelay: index * 0.1 + 's' }"
      >
        <router-link 
          v-if="item.path && index !== breadcrumbs.length - 1"
          :to="item.path"
          class="breadcrumb-link"
        >
          <i v-if="item.icon" :class="item.icon" class="breadcrumb-icon"></i>
          <span>{{ item.name }}</span>
        </router-link>
        
        <span v-else class="breadcrumb-current">
          <i v-if="item.icon" :class="item.icon" class="breadcrumb-icon"></i>
          <span>{{ item.name }}</span>
        </span>
        
        <div 
          v-if="index < breadcrumbs.length - 1" 
          class="breadcrumb-separator"
        >
          <i class="fas fa-chevron-right"></i>
        </div>
      </li>
    </ol>
  </nav>
</template>

<script>
export default {
  name: 'AnimatedBreadcrumb',
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    breadcrumbs() {
      const defaultItems = [
        { name: 'Home', path: '/', icon: 'fas fa-home' },
        { name: 'Portfolio', path: '/portfolio', icon: 'fas fa-user' }
      ];
      
      return [...defaultItems, ...this.items];
    }
  },
  mounted() {
    this.animateItems();
  },
  methods: {
    animateItems() {
      const items = this.$el.querySelectorAll('.breadcrumb-item');
      items.forEach((item, index) => {
        setTimeout(() => {
          item.classList.add('animate-in');
        }, index * 100);
      });
    }
  }
}
</script>

<style scoped>
.animated-breadcrumb {
  padding: 1rem 0;
  margin-bottom: 1rem;
}

.breadcrumb-list {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.breadcrumb-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  opacity: 0;
  transform: translateY(10px);
  animation: breadcrumbSlideIn 0.5s ease-out forwards;
  position: relative;
}

@keyframes breadcrumbSlideIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.breadcrumb-item.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.breadcrumb-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  border-radius: 20px;
  text-decoration: none;
  color: #6b7280;
  font-weight: 500;
  font-size: 0.875rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.breadcrumb-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.1), transparent);
  transition: left 0.5s;
}

.breadcrumb-link:hover::before {
  left: 100%;
}

.breadcrumb-link:hover {
  color: #6366f1;
  background: rgba(99, 102, 241, 0.05);
  transform: translateY(-1px);
}

.breadcrumb-current {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  border-radius: 20px;
  color: #6366f1;
  font-weight: 600;
  font-size: 0.875rem;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1));
  border: 1px solid rgba(99, 102, 241, 0.2);
  position: relative;
}

.breadcrumb-current::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.05), rgba(139, 92, 246, 0.05));
  border-radius: inherit;
  animation: currentPulse 2s ease-in-out infinite;
}

@keyframes currentPulse {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}

.breadcrumb-icon {
  font-size: 0.75rem;
  opacity: 0.8;
}

.breadcrumb-separator {
  display: flex;
  align-items: center;
  color: #9ca3af;
  font-size: 0.75rem;
  animation: separatorBounce 2s ease-in-out infinite;
}

@keyframes separatorBounce {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(2px); }
}

/* Hover effects for the entire breadcrumb */
.breadcrumb-item:hover .breadcrumb-separator {
  color: #6366f1;
  animation-duration: 0.5s;
}

/* Dark mode support */
.dark .breadcrumb-link {
  color: #9ca3af;
}

.dark .breadcrumb-link:hover {
  color: #a78bfa;
  background: rgba(167, 139, 250, 0.1);
}

.dark .breadcrumb-current {
  color: #a78bfa;
  background: linear-gradient(135deg, rgba(167, 139, 250, 0.1), rgba(236, 72, 153, 0.1));
  border-color: rgba(167, 139, 250, 0.3);
}

.dark .breadcrumb-separator {
  color: #6b7280;
}

.dark .breadcrumb-item:hover .breadcrumb-separator {
  color: #a78bfa;
}

/* Responsive design */
@media (max-width: 768px) {
  .animated-breadcrumb {
    padding: 0.75rem 0;
  }
  
  .breadcrumb-link,
  .breadcrumb-current {
    padding: 0.375rem 0.5rem;
    font-size: 0.8rem;
  }
  
  .breadcrumb-icon {
    font-size: 0.7rem;
  }
  
  .breadcrumb-separator {
    font-size: 0.7rem;
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .breadcrumb-item {
    animation: none;
    opacity: 1;
    transform: none;
  }
  
  .breadcrumb-separator {
    animation: none;
  }
  
  .breadcrumb-current::before {
    animation: none;
  }
}
</style>