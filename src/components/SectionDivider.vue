<template>
  <div class="section-divider" :class="type">
    <div class="divider-content">
      <div v-if="type === 'wave'" class="wave-container">
        <svg class="wave" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" class="shape-fill"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" class="shape-fill"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" class="shape-fill"></path>
        </svg>
      </div>
      
      <div v-else-if="type === 'dots'" class="dots-container">
        <div v-for="n in 5" :key="n" class="dot" :style="{ animationDelay: n * 0.2 + 's' }"></div>
      </div>
      
      <div v-else-if="type === 'line'" class="line-container">
        <div class="animated-line"></div>
        <div class="center-icon">
          <i :class="icon || 'fas fa-star'"></i>
        </div>
      </div>
      
      <div v-else class="gradient-divider">
        <div class="gradient-line"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SectionDivider',
  props: {
    type: {
      type: String,
      default: 'gradient',
      validator: (value) => ['wave', 'dots', 'line', 'gradient'].includes(value)
    },
    icon: {
      type: String,
      default: 'fas fa-star'
    }
  }
}
</script>

<style scoped>
.section-divider {
  width: 100%;
  margin: 3rem 0;
  position: relative;
  overflow: hidden;
}

/* Wave Divider */
.wave-container {
  position: relative;
  width: 100%;
  height: 120px;
}

.wave {
  position: relative;
  display: block;
  width: calc(100% + 1.3px);
  height: 120px;
}

.shape-fill {
  fill: linear-gradient(135deg, #6366f1, #8b5cf6);
  animation: waveMove 3s ease-in-out infinite;
}

@keyframes waveMove {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(-10px); }
}

/* Dots Divider */
.dots-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 2rem 0;
}

.dot {
  width: 12px;
  height: 12px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  border-radius: 50%;
  animation: dotPulse 2s ease-in-out infinite;
}

@keyframes dotPulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.7;
  }
  50% {
    transform: scale(1.5);
    opacity: 1;
  }
}

/* Line Divider */
.line-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
}

.animated-line {
  position: absolute;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #6366f1, #8b5cf6, transparent);
  animation: lineExpand 3s ease-in-out infinite;
}

@keyframes lineExpand {
  0%, 100% {
    transform: scaleX(0.3);
    opacity: 0.5;
  }
  50% {
    transform: scaleX(1);
    opacity: 1;
  }
}

.center-icon {
  background: white;
  padding: 1rem;
  border-radius: 50%;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
  z-index: 1;
  animation: iconFloat 3s ease-in-out infinite;
}

.center-icon i {
  color: #6366f1;
  font-size: 1.25rem;
}

@keyframes iconFloat {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-5px) rotate(180deg); }
}

/* Gradient Divider */
.gradient-divider {
  display: flex;
  justify-content: center;
  padding: 2rem 0;
}

.gradient-line {
  width: 200px;
  height: 3px;
  background: linear-gradient(90deg, transparent, #6366f1, #8b5cf6, #ec4899, transparent);
  border-radius: 2px;
  animation: gradientShift 4s ease-in-out infinite;
}

@keyframes gradientShift {
  0%, 100% {
    background: linear-gradient(90deg, transparent, #6366f1, #8b5cf6, #ec4899, transparent);
    transform: scaleX(0.8);
  }
  50% {
    background: linear-gradient(90deg, transparent, #ec4899, #8b5cf6, #6366f1, transparent);
    transform: scaleX(1.2);
  }
}

/* Dark mode support */
.dark .center-icon {
  background: #1e293b;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.5);
}

.dark .center-icon i {
  color: #a78bfa;
}

/* Responsive */
@media (max-width: 768px) {
  .section-divider {
    margin: 2rem 0;
  }
  
  .wave-container {
    height: 80px;
  }
  
  .wave {
    height: 80px;
  }
  
  .gradient-line {
    width: 150px;
  }
}
</style>