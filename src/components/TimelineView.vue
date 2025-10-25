<template>
  <div class="timeline-container">
    <div class="timeline-header">
      <h3>{{ title }}</h3>
      <button @click="$emit('toggle-view')" class="view-toggle">
        {{ isExperience ? '📋' : '🎓' }} Switch View
      </button>
    </div>
    <div class="timeline">
      <div v-for="(item, index) in items" :key="item.id" class="timeline-item">
        <div class="timeline-marker">
          <div class="timeline-dot"></div>
          <div v-if="index < items.length - 1" class="timeline-line"></div>
        </div>
        <div class="timeline-content">
          <div class="timeline-date">{{ formatDateRange(item) }}</div>
          <div class="timeline-card">
            <h4 v-if="isExperience">{{ item.position }}</h4>
            <h4 v-else>{{ item.degree }}</h4>
            <div class="timeline-subtitle">
              <span v-if="isExperience">{{ item.companyName }}</span>
              <span v-else>{{ item.schoolName }}</span>
            </div>
            <p v-if="isExperience" class="timeline-description">{{ item.description }}</p>
            <div v-if="!isExperience" class="timeline-location">
              {{ item.city }}, {{ item.country }}
            </div>
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
  methods: {
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
  max-width: 800px;
  margin: 0 auto;
}

.timeline-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}

.timeline-header h3 {
  margin: 0;
  font-size: 24px;
  color: #1f2937;
}

.view-toggle {
  background: #6366f1;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.view-toggle:hover {
  background: #4f46e5;
  transform: translateY(-1px);
}

.timeline {
  position: relative;
}

.timeline-item {
  display: flex;
  margin-bottom: 40px;
  position: relative;
}

.timeline-marker {
  position: relative;
  margin-right: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.timeline-dot {
  width: 16px;
  height: 16px;
  background: #6366f1;
  border-radius: 50%;
  border: 3px solid #ffffff;
  box-shadow: 0 0 0 3px #6366f1;
  z-index: 2;
}

.timeline-line {
  width: 2px;
  background: #e5e7eb;
  flex: 1;
  margin-top: 8px;
  min-height: 60px;
}

.timeline-content {
  flex: 1;
  position: relative;
}

.timeline-date {
  font-size: 14px;
  color: #6b7280;
  font-weight: 500;
  margin-bottom: 8px;
}

.timeline-card {
  background: #ffffff;
  padding: 24px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.timeline-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
}

.timeline-card h4 {
  margin: 0 0 8px 0;
  font-size: 18px;
  color: #1f2937;
  font-weight: 600;
}

.timeline-subtitle {
  color: #6366f1;
  font-weight: 500;
  margin-bottom: 12px;
}

.timeline-description {
  color: #6b7280;
  line-height: 1.6;
  margin: 0;
}

.timeline-location {
  color: #9ca3af;
  font-size: 14px;
  margin-top: 8px;
}

@media (max-width: 768px) {
  .timeline-header {
    flex-direction: column;
    gap: 16px;
    text-align: center;
  }
  
  .timeline-marker {
    margin-right: 16px;
  }
  
  .timeline-card {
    padding: 20px;
  }
}
</style>