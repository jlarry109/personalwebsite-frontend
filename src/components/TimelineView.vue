<template>
  <div class="timeline-container">
    <div class="timeline-header">
      <h3>{{ title }}</h3>
      <button @click="$emit('toggle-view')" class="view-toggle">
        {{ isExperience ? '📋' : '🎓' }} Switch View
      </button>
    </div>
    <div class="timeline">
      <div class="timeline-line-bg"></div>
      <div 
        v-for="(item, index) in items" 
        :key="item.id" 
        class="timeline-item"
        :style="{ animationDelay: `${index * 0.2}s` }">
        <div class="timeline-marker">
          <div class="timeline-dot" :class="{ active: expandedItems.includes(item.id) }">
            <span class="timeline-icon">{{ isExperience ? '💼' : '🎓' }}</span>
          </div>
        </div>
        <div class="timeline-content">
          <div class="timeline-date-marker">
            <div class="date-badge">
              <span class="year">{{ getYear(item) }}</span>
              <span class="month">{{ getMonth(item) }}</span>
            </div>
          </div>
          <div class="timeline-card" @click="toggleExpanded(item.id)">
            <div class="card-header">
              <div class="card-title">
                <h4 v-if="isExperience">{{ item.position }}</h4>
                <h4 v-else>{{ item.degree }}</h4>
                <div class="timeline-subtitle">
                  <span v-if="isExperience">{{ item.companyName }}</span>
                  <span v-else>{{ item.schoolName }}</span>
                  <span v-if="item.location" class="location">📍 {{ item.location }}</span>
                  <span v-else-if="!isExperience" class="location">📍 {{ item.city }}, {{ item.country }}</span>
                </div>
              </div>
              <div class="expand-btn" :class="{ expanded: expandedItems.includes(item.id) }">
                <span>{{ expandedItems.includes(item.id) ? '−' : '+' }}</span>
              </div>
            </div>
            <p class="timeline-description">{{ item.description }}</p>
            
            <transition name="expand">
              <div v-if="expandedItems.includes(item.id)" class="expanded-content">
                <div v-if="item.achievements" class="achievements-section">
                  <h5>🏆 Key Achievements</h5>
                  <ul class="achievements-list">
                    <li v-for="achievement in item.achievements" :key="achievement">
                      {{ achievement }}
                    </li>
                  </ul>
                </div>
                
                <div v-if="item.technologies" class="tech-section">
                  <h5>🛠️ Technologies</h5>
                  <div class="tech-tags">
                    <span v-for="tech in item.technologies" :key="tech" class="tech-tag">
                      {{ tech }}
                    </span>
                  </div>
                </div>
                
                <div v-if="item.coursework" class="coursework-section">
                  <h5>📚 Key Coursework</h5>
                  <div class="coursework-tags">
                    <span v-for="course in item.coursework" :key="course" class="course-tag">
                      {{ course }}
                    </span>
                  </div>
                </div>
                
                <div v-if="item.gpa" class="gpa-section">
                  <h5>📊 Academic Performance</h5>
                  <span class="gpa-badge">{{ item.gpa }}</span>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: Array,
    title: String,
    isExperience: Boolean
  },
  data() {
    return {
      expandedItems: []
    }
  },
  methods: {
    toggleExpanded(itemId) {
      const index = this.expandedItems.indexOf(itemId)
      if (index > -1) {
        this.expandedItems.splice(index, 1)
      } else {
        this.expandedItems.push(itemId)
      }
    },
    getYear(item) {
      const date = new Date(item.startDate || `${item.startYear}-01-01`)
      return date.getFullYear()
    },
    getMonth(item) {
      const date = new Date(item.startDate || `${item.startYear}-01-01`)
      return date.toLocaleDateString('en-US', { month: 'short' })
    },
    formatDateRange(item) {
      const start = new Date(item.startDate || `${item.startYear}-01-01`);
      const startStr = start.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
      
      if (item.endDate) {
        const end = new Date(item.endDate);
        return `${startStr} - ${end.toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}`;
      } else if (item.endYear) {
        return `${startStr} - ${item.endYear}`;
      } else {
        return `${startStr} - Present`;
      }
    }
  }
};
</script>

<style scoped>
.timeline-container {
  max-width: 900px;
  margin: 0 auto;
}

.timeline-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
}

.timeline-header h3 {
  margin: 0;
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-extrabold);
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: var(--letter-spacing-tight);
  line-height: var(--line-height-tight);
}

.view-toggle {
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 25px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
}

.view-toggle:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(99, 102, 241, 0.4);
}

.timeline {
  position: relative;
  padding-left: 40px;
}

.timeline-line-bg {
  position: absolute;
  left: 60px;
  top: 0;
  bottom: 0;
  width: 3px;
  background: linear-gradient(to bottom, #6366f1, #8b5cf6, #06b6d4);
  border-radius: 2px;
  opacity: 0.3;
}

.timeline-item {
  position: relative;
  margin-bottom: 50px;
  opacity: 0;
  transform: translateY(30px);
  animation: fadeInUp 0.8s ease forwards;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.timeline-marker {
  position: absolute;
  left: -40px;
  top: 20px;
  z-index: 3;
}

.timeline-dot {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  border-radius: 50%;
  border: 4px solid #ffffff;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  cursor: pointer;
}

.timeline-dot.active {
  transform: scale(1.1);
  box-shadow: 0 6px 20px rgba(99, 102, 241, 0.5);
}

.timeline-icon {
  font-size: 20px;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2));
}

.timeline-content {
  display: flex;
  gap: 20px;
  align-items: flex-start;
}

.timeline-date-marker {
  min-width: 80px;
}

.date-badge {
  background: linear-gradient(135deg, #f8fafc, #e2e8f0);
  border: 2px solid #6366f1;
  border-radius: 12px;
  padding: 8px 12px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(99, 102, 241, 0.2);
}

.year {
  display: block;
  font-size: 16px;
  font-weight: 700;
  color: #1f2937;
  line-height: 1;
}

.month {
  display: block;
  font-size: 12px;
  color: #6366f1;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.timeline-card {
  flex: 1;
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  padding: 24px;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.08);
  transition: all 0.4s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.timeline-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #6366f1, #8b5cf6);
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.timeline-card:hover::before {
  transform: scaleX(1);
}

.timeline-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 30px -5px rgba(0, 0, 0, 0.15);
  border-color: #cbd5e1;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
}

.card-title {
  flex: 1;
}

.timeline-card h4 {
  margin: 0 0 8px 0;
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  background: var(--gradient-secondary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: var(--line-height-snug);
  letter-spacing: var(--letter-spacing-tight);
}

.timeline-subtitle {
  display: flex;
  flex-direction: column;
  gap: 4px;
  color: #6366f1;
  font-weight: 600;
  font-size: 15px;
}

.location {
  color: #9ca3af;
  font-size: 13px;
  font-weight: 500;
}

.expand-btn {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #f1f5f9;
  border: 2px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 700;
  color: #6366f1;
  transition: all 0.3s ease;
  cursor: pointer;
}

.expand-btn:hover {
  background: #6366f1;
  color: white;
  transform: scale(1.1);
}

.expand-btn.expanded {
  background: #6366f1;
  color: white;
  transform: rotate(180deg);
}

.timeline-description {
  color: #6b7280;
  line-height: 1.6;
  margin: 0 0 16px 0;
  font-size: 15px;
}

.expanded-content {
  border-top: 1px solid #e5e7eb;
  padding-top: 20px;
  margin-top: 16px;
}

.expanded-content h5 {
  margin: 0 0 12px 0;
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  display: flex;
  align-items: center;
  gap: 8px;
}

.achievements-list {
  list-style: none;
  padding: 0;
  margin: 0 0 20px 0;
}

.achievements-list li {
  padding: 8px 0;
  color: #4b5563;
  font-size: 14px;
  line-height: 1.5;
  position: relative;
  padding-left: 20px;
}

.achievements-list li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #10b981;
  font-weight: 700;
}

.tech-tags, .coursework-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
}

.tech-tag {
  background: linear-gradient(135deg, #ddd6fe, #c7d2fe);
  color: #5b21b6;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 500;
  border: 1px solid #a78bfa;
}

.course-tag {
  background: linear-gradient(135deg, #fef3c7, #fde68a);
  color: #92400e;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 500;
  border: 1px solid #f59e0b;
}

.gpa-badge {
  background: linear-gradient(135deg, #d1fae5, #a7f3d0);
  color: #065f46;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  border: 2px solid #10b981;
  display: inline-block;
}

.expand-enter-active, .expand-leave-active {
  transition: all 0.4s ease;
  overflow: hidden;
}

.expand-enter-from, .expand-leave-to {
  max-height: 0;
  opacity: 0;
  transform: translateY(-10px);
}

.expand-enter-to, .expand-leave-from {
  max-height: 500px;
  opacity: 1;
  transform: translateY(0);
}

.dark .timeline-card {
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  border-color: #334155;
}

.dark .timeline-card h4 {
  color: #f1f5f9;
}

.dark .timeline-description {
  color: #94a3b8;
}

@media (max-width: 768px) {
  .timeline-header {
    flex-direction: column;
    gap: 20px;
    text-align: center;
  }
  
  .timeline {
    padding-left: 20px;
  }
  
  .timeline-line-bg {
    left: 40px;
  }
  
  .timeline-marker {
    left: -20px;
  }
  
  .timeline-dot {
    width: 40px;
    height: 40px;
  }
  
  .timeline-icon {
    font-size: 16px;
  }
  
  .timeline-content {
    flex-direction: column;
    gap: 12px;
  }
  
  .timeline-card {
    padding: 20px;
  }
  
  .card-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
}
</style>