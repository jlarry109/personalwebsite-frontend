<template>
  <div class="achievement-badge" :class="[type, { earned: isEarned, featured: isFeatured }]">
    <div class="badge-glow" v-if="isEarned"></div>
    
    <div class="badge-icon">
      <i :class="iconClass"></i>
      <div class="badge-shine" v-if="isEarned"></div>
    </div>
    
    <div class="badge-content">
      <h4 class="badge-title">{{ title }}</h4>
      <p class="badge-description">{{ description }}</p>
      <div class="badge-meta" v-if="date || level">
        <span v-if="date" class="badge-date">{{ formatDate(date) }}</span>
        <span v-if="level" class="badge-level">{{ level }}</span>
      </div>
    </div>
    
    <div class="badge-status">
      <div v-if="isEarned" class="status-earned">
        <i class="fas fa-check"></i>
      </div>
      <div v-else-if="progress !== undefined" class="status-progress">
        <div class="progress-ring">
          <svg width="24" height="24" viewBox="0 0 24 24">
            <circle
              cx="12"
              cy="12"
              r="10"
              fill="none"
              stroke="#e5e7eb"
              stroke-width="2"
            />
            <circle
              cx="12"
              cy="12"
              r="10"
              fill="none"
              stroke="#6366f1"
              stroke-width="2"
              stroke-linecap="round"
              :stroke-dasharray="circumference"
              :stroke-dashoffset="strokeDashoffset"
              transform="rotate(-90 12 12)"
              class="progress-circle"
            />
          </svg>
          <span class="progress-text">{{ progress }}%</span>
        </div>
      </div>
      <div v-else class="status-locked">
        <i class="fas fa-lock"></i>
      </div>
    </div>
    
    <div class="badge-particles" v-if="isEarned && showParticles">
      <div v-for="n in 6" :key="n" class="particle" :style="getParticleStyle(n)"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AchievementBadge',
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'default',
      validator: value => ['default', 'certification', 'milestone', 'skill', 'project'].includes(value)
    },
    iconClass: {
      type: String,
      default: 'fas fa-award'
    },
    isEarned: {
      type: Boolean,
      default: false
    },
    isFeatured: {
      type: Boolean,
      default: false
    },
    date: {
      type: String,
      default: null
    },
    level: {
      type: String,
      default: null
    },
    progress: {
      type: Number,
      default: undefined,
      validator: value => value >= 0 && value <= 100
    },
    showParticles: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    circumference() {
      return 2 * Math.PI * 10
    },
    strokeDashoffset() {
      return this.circumference - (this.progress / 100) * this.circumference
    }
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short' 
      })
    },
    getParticleStyle(index) {
      const angle = (index * 60) - 30
      const distance = 40 + Math.random() * 20
      const x = Math.cos(angle * Math.PI / 180) * distance
      const y = Math.sin(angle * Math.PI / 180) * distance
      
      return {
        '--x': `${x}px`,
        '--y': `${y}px`,
        animationDelay: `${index * 0.1}s`,
        animationDuration: `${2 + Math.random()}s`
      }
    }
  }
}
</script>

<style scoped>
.achievement-badge {
  position: relative;
  background: white;
  border-radius: 16px;
  padding: 20px;
  border: 2px solid #e5e7eb;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  display: flex;
  align-items: center;
  gap: 16px;
}

.achievement-badge:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.15);
}

.achievement-badge.earned {
  border-color: #10b981;
  background: linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%);
}

.achievement-badge.featured {
  border-color: #f59e0b;
  background: linear-gradient(135deg, #ffffff 0%, #fffbeb 100%);
}

.achievement-badge.featured::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #f59e0b, #d97706, #f59e0b);
  background-size: 200% 100%;
  animation: featuredShine 3s infinite;
}

.badge-glow {
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(45deg, #10b981, #059669, #10b981);
  border-radius: 18px;
  opacity: 0.3;
  animation: glowPulse 2s infinite;
  z-index: -1;
}

.badge-icon {
  position: relative;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  font-size: 24px;
  flex-shrink: 0;
}

.achievement-badge.default .badge-icon {
  background: linear-gradient(135deg, #6b7280, #4b5563);
  color: white;
}

.achievement-badge.certification .badge-icon {
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: white;
}

.achievement-badge.milestone .badge-icon {
  background: linear-gradient(135deg, #8b5cf6, #7c3aed);
  color: white;
}

.achievement-badge.skill .badge-icon {
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
}

.achievement-badge.project .badge-icon {
  background: linear-gradient(135deg, #f59e0b, #d97706);
  color: white;
}

.achievement-badge.earned .badge-icon {
  animation: iconBounce 0.6s ease-out;
}

.badge-shine {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  animation: shine 2s infinite;
}

.badge-content {
  flex: 1;
  min-width: 0;
}

.badge-title {
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 4px 0;
  line-height: 1.3;
}

.badge-description {
  font-size: 14px;
  color: #6b7280;
  margin: 0 0 8px 0;
  line-height: 1.4;
}

.badge-meta {
  display: flex;
  gap: 12px;
  align-items: center;
}

.badge-date,
.badge-level {
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 12px;
  font-weight: 500;
}

.badge-date {
  background: #f3f4f6;
  color: #374151;
}

.badge-level {
  background: #dbeafe;
  color: #1d4ed8;
}

.badge-status {
  flex-shrink: 0;
}

.status-earned {
  width: 32px;
  height: 32px;
  background: #10b981;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 14px;
  animation: checkAppear 0.5s ease-out;
}

.status-progress {
  position: relative;
}

.progress-ring {
  position: relative;
  width: 24px;
  height: 24px;
}

.progress-circle {
  transition: stroke-dashoffset 0.5s ease;
}

.progress-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 8px;
  font-weight: 600;
  color: #6366f1;
}

.status-locked {
  width: 32px;
  height: 32px;
  background: #e5e7eb;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9ca3af;
  font-size: 14px;
}

.badge-particles {
  position: absolute;
  top: 50%;
  left: 24px;
  pointer-events: none;
}

.particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: #fbbf24;
  border-radius: 50%;
  animation: particleFloat infinite ease-out;
  transform: translate(var(--x), var(--y));
}

.particle:nth-child(odd) {
  background: #10b981;
}

.particle:nth-child(3n) {
  background: #6366f1;
}

/* Animations */
@keyframes featuredShine {
  0%, 100% { background-position: -200% 0; }
  50% { background-position: 200% 0; }
}

@keyframes glowPulse {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.02); }
}

@keyframes iconBounce {
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}

@keyframes shine {
  0% { left: -100%; }
  100% { left: 100%; }
}

@keyframes checkAppear {
  0% { transform: scale(0) rotate(0deg); }
  50% { transform: scale(1.2) rotate(180deg); }
  100% { transform: scale(1) rotate(360deg); }
}

@keyframes particleFloat {
  0% {
    opacity: 1;
    transform: translate(0, 0) scale(1);
  }
  100% {
    opacity: 0;
    transform: translate(var(--x), var(--y)) scale(0);
  }
}

/* Dark Mode */
.dark .achievement-badge {
  background: #1e293b;
  border-color: #334155;
}

.dark .achievement-badge.earned {
  background: linear-gradient(135deg, #1e293b 0%, #064e3b 100%);
}

.dark .achievement-badge.featured {
  background: linear-gradient(135deg, #1e293b 0%, #451a03 100%);
}

.dark .badge-title {
  color: #f1f5f9;
}

.dark .badge-description {
  color: #cbd5e1;
}

.dark .badge-date {
  background: #374151;
  color: #d1d5db;
}

.dark .status-locked {
  background: #374151;
  color: #6b7280;
}

/* Responsive */
@media (max-width: 768px) {
  .achievement-badge {
    padding: 16px;
    gap: 12px;
  }
  
  .badge-icon {
    width: 40px;
    height: 40px;
    font-size: 20px;
  }
  
  .badge-title {
    font-size: 14px;
  }
  
  .badge-description {
    font-size: 12px;
  }
  
  .badge-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }
}
</style>