<template>
  <div class="progress-indicator">
    <div class="progress-header">
      <h3 class="progress-title">{{ title }}</h3>
      <div class="progress-percentage">
        <AnimatedCounter :target="percentage" suffix="%" />
      </div>
    </div>
    
    <div class="progress-bar-container">
      <div class="progress-bar">
        <div 
          class="progress-fill" 
          :style="{ width: animatedPercentage + '%' }"
          :class="getProgressClass(percentage)"
        ></div>
      </div>
    </div>
    
    <div class="progress-details" v-if="showDetails">
      <div class="progress-stats">
        <div class="stat">
          <span class="stat-label">Completed</span>
          <span class="stat-value">{{ completed }}</span>
        </div>
        <div class="stat">
          <span class="stat-label">Total</span>
          <span class="stat-value">{{ total }}</span>
        </div>
        <div class="stat">
          <span class="stat-label">Remaining</span>
          <span class="stat-value">{{ remaining }}</span>
        </div>
      </div>
    </div>
    
    <div class="progress-items" v-if="items && items.length">
      <div 
        v-for="(item, index) in items" 
        :key="index"
        class="progress-item"
        :class="{ completed: item.completed, current: item.current }"
      >
        <div class="item-icon">
          <i v-if="item.completed" class="fas fa-check"></i>
          <i v-else-if="item.current" class="fas fa-clock"></i>
          <i v-else class="fas fa-circle"></i>
        </div>
        <span class="item-label">{{ item.label }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import AnimatedCounter from './AnimatedCounter.vue'

export default {
  name: 'ProgressIndicator',
  components: {
    AnimatedCounter
  },
  props: {
    title: {
      type: String,
      required: true
    },
    percentage: {
      type: Number,
      required: true,
      validator: value => value >= 0 && value <= 100
    },
    completed: {
      type: Number,
      default: 0
    },
    total: {
      type: Number,
      default: 0
    },
    showDetails: {
      type: Boolean,
      default: false
    },
    items: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      animatedPercentage: 0
    }
  },
  computed: {
    remaining() {
      return this.total - this.completed
    }
  },
  mounted() {
    this.animateProgress()
  },
  watch: {
    percentage() {
      this.animateProgress()
    }
  },
  methods: {
    animateProgress() {
      const duration = 1500
      const startTime = Date.now()
      const startValue = this.animatedPercentage
      const endValue = this.percentage
      
      const animate = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)
        
        // Easing function
        const easeOutCubic = 1 - Math.pow(1 - progress, 3)
        
        this.animatedPercentage = startValue + (endValue - startValue) * easeOutCubic
        
        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }
      
      requestAnimationFrame(animate)
    },
    getProgressClass(percentage) {
      if (percentage >= 90) return 'excellent'
      if (percentage >= 75) return 'good'
      if (percentage >= 50) return 'average'
      if (percentage >= 25) return 'low'
      return 'minimal'
    }
  }
}
</script>

<style scoped>
.progress-indicator {
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
  transition: all 0.3s ease;
}

.progress-indicator:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.progress-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.progress-title {
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.progress-percentage {
  font-size: 24px;
  font-weight: 700;
  color: #6366f1;
}

.progress-bar-container {
  margin-bottom: 16px;
}

.progress-bar {
  width: 100%;
  height: 12px;
  background: #f3f4f6;
  border-radius: 6px;
  overflow: hidden;
  position: relative;
}

.progress-fill {
  height: 100%;
  border-radius: 6px;
  transition: width 0.3s ease;
  position: relative;
  overflow: hidden;
}

.progress-fill::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  animation: progressShine 2s infinite;
}

.progress-fill.minimal {
  background: linear-gradient(90deg, #ef4444, #dc2626);
}

.progress-fill.low {
  background: linear-gradient(90deg, #f59e0b, #d97706);
}

.progress-fill.average {
  background: linear-gradient(90deg, #eab308, #ca8a04);
}

.progress-fill.good {
  background: linear-gradient(90deg, #22c55e, #16a34a);
}

.progress-fill.excellent {
  background: linear-gradient(90deg, #10b981, #059669);
}

.progress-details {
  margin-bottom: 16px;
}

.progress-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.stat {
  text-align: center;
  padding: 12px;
  background: #f9fafb;
  border-radius: 8px;
}

.stat-label {
  display: block;
  font-size: 12px;
  color: #6b7280;
  text-transform: uppercase;
  font-weight: 500;
  margin-bottom: 4px;
}

.stat-value {
  display: block;
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
}

.progress-items {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.progress-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.progress-item:hover {
  background: #f9fafb;
}

.progress-item.completed {
  background: rgba(16, 185, 129, 0.1);
}

.progress-item.current {
  background: rgba(99, 102, 241, 0.1);
  border: 1px solid rgba(99, 102, 241, 0.2);
}

.item-icon {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 10px;
}

.progress-item.completed .item-icon {
  background: #10b981;
  color: white;
}

.progress-item.current .item-icon {
  background: #6366f1;
  color: white;
  animation: pulse 2s infinite;
}

.progress-item:not(.completed):not(.current) .item-icon {
  background: #e5e7eb;
  color: #9ca3af;
}

.item-label {
  font-size: 14px;
  color: #374151;
  font-weight: 500;
}

.progress-item.completed .item-label {
  color: #059669;
}

.progress-item.current .item-label {
  color: #4f46e5;
  font-weight: 600;
}

@keyframes progressShine {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* Dark Mode */
.dark .progress-indicator {
  background: #1e293b;
  border-color: #334155;
}

.dark .progress-title {
  color: #f1f5f9;
}

.dark .progress-bar {
  background: #374151;
}

.dark .stat {
  background: #374151;
}

.dark .stat-value {
  color: #f1f5f9;
}

.dark .item-label {
  color: #d1d5db;
}

.dark .progress-item:hover {
  background: #374151;
}

.dark .progress-item:not(.completed):not(.current) .item-icon {
  background: #4b5563;
  color: #6b7280;
}

/* Responsive */
@media (max-width: 768px) {
  .progress-indicator {
    padding: 20px;
  }
  
  .progress-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  
  .progress-stats {
    grid-template-columns: 1fr;
    gap: 8px;
  }
  
  .stat {
    padding: 8px;
  }
}
</style>