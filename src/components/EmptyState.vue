<template>
  <div class="empty-state" :class="type">
    <div class="empty-illustration">
      <div v-if="type === 'no-results'" class="illustration search-empty">
        <div class="search-icon">
          <i class="fas fa-search"></i>
        </div>
        <div class="floating-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      
      <div v-else-if="type === 'no-data'" class="illustration data-empty">
        <div class="folder-icon">
          <i class="fas fa-folder-open"></i>
        </div>
        <div class="empty-files">
          <div class="file-line"></div>
          <div class="file-line short"></div>
          <div class="file-line"></div>
        </div>
      </div>
      
      <div v-else-if="type === 'error'" class="illustration error-empty">
        <div class="error-icon">
          <i class="fas fa-exclamation-triangle"></i>
        </div>
        <div class="error-waves">
          <div class="wave"></div>
          <div class="wave"></div>
          <div class="wave"></div>
        </div>
      </div>
      
      <div v-else-if="type === 'coming-soon'" class="illustration coming-soon-empty">
        <div class="rocket-icon">
          <i class="fas fa-rocket"></i>
        </div>
        <div class="stars">
          <span class="star"></span>
          <span class="star"></span>
          <span class="star"></span>
          <span class="star"></span>
        </div>
      </div>
      
      <div v-else class="illustration default-empty">
        <div class="box-icon">
          <i class="fas fa-box"></i>
        </div>
        <div class="floating-elements">
          <div class="element"></div>
          <div class="element"></div>
        </div>
      </div>
    </div>
    
    <div class="empty-content">
      <h3 class="empty-title">{{ title }}</h3>
      <p class="empty-description">{{ description }}</p>
      <button v-if="actionText" @click="$emit('action')" class="empty-action btn-press">
        {{ actionText }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EmptyState',
  props: {
    type: {
      type: String,
      default: 'default',
      validator: value => ['default', 'no-results', 'no-data', 'error', 'coming-soon'].includes(value)
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    actionText: {
      type: String,
      default: null
    }
  },
  emits: ['action']
}
</script>

<style scoped>
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
  min-height: 300px;
}

.empty-illustration {
  margin-bottom: 32px;
  position: relative;
}

.illustration {
  width: 120px;
  height: 120px;
  margin: 0 auto;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Search Empty */
.search-empty .search-icon {
  font-size: 48px;
  color: #6366f1;
  animation: searchPulse 2s infinite;
}

.floating-dots {
  position: absolute;
  top: -10px;
  right: -10px;
}

.floating-dots span {
  display: block;
  width: 8px;
  height: 8px;
  background: #8b5cf6;
  border-radius: 50%;
  margin-bottom: 4px;
  animation: floatDots 2s infinite ease-in-out;
}

.floating-dots span:nth-child(2) { animation-delay: 0.2s; }
.floating-dots span:nth-child(3) { animation-delay: 0.4s; }

/* Data Empty */
.data-empty .folder-icon {
  font-size: 48px;
  color: #10b981;
  animation: folderOpen 3s infinite;
}

.empty-files {
  position: absolute;
  top: 60px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
}

.file-line {
  height: 3px;
  background: #e5e7eb;
  margin-bottom: 4px;
  border-radius: 2px;
  animation: fileFade 2s infinite ease-in-out;
}

.file-line.short {
  width: 70%;
  animation-delay: 0.3s;
}

.file-line:nth-child(3) {
  animation-delay: 0.6s;
}

/* Error Empty */
.error-empty .error-icon {
  font-size: 48px;
  color: #ef4444;
  animation: errorShake 2s infinite;
}

.error-waves {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}

.wave {
  width: 40px;
  height: 40px;
  border: 2px solid #fecaca;
  border-radius: 50%;
  position: absolute;
  animation: waveExpand 2s infinite;
}

.wave:nth-child(2) {
  animation-delay: 0.5s;
}

.wave:nth-child(3) {
  animation-delay: 1s;
}

/* Coming Soon */
.coming-soon-empty .rocket-icon {
  font-size: 48px;
  color: #f59e0b;
  animation: rocketLaunch 3s infinite;
}

.stars {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.star {
  position: absolute;
  width: 4px;
  height: 4px;
  background: #fbbf24;
  border-radius: 50%;
  animation: starTwinkle 2s infinite;
}

.star:nth-child(1) { top: 20%; left: 20%; animation-delay: 0s; }
.star:nth-child(2) { top: 30%; right: 25%; animation-delay: 0.5s; }
.star:nth-child(3) { bottom: 40%; left: 30%; animation-delay: 1s; }
.star:nth-child(4) { bottom: 20%; right: 20%; animation-delay: 1.5s; }

/* Default Empty */
.default-empty .box-icon {
  font-size: 48px;
  color: #6b7280;
  animation: boxFloat 3s infinite;
}

.floating-elements {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.element {
  position: absolute;
  width: 12px;
  height: 12px;
  background: #d1d5db;
  border-radius: 2px;
  animation: elementFloat 4s infinite ease-in-out;
}

.element:nth-child(1) {
  top: 20%;
  left: 20%;
  animation-delay: 0s;
}

.element:nth-child(2) {
  bottom: 30%;
  right: 25%;
  animation-delay: 2s;
}

/* Content */
.empty-content {
  max-width: 400px;
}

.empty-title {
  font-size: 24px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 12px;
}

.empty-description {
  font-size: 16px;
  color: #6b7280;
  line-height: 1.6;
  margin-bottom: 24px;
}

.empty-action {
  background: #6366f1;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.empty-action:hover {
  background: #4f46e5;
  transform: translateY(-2px);
}

/* Animations */
@keyframes searchPulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.8; }
}

@keyframes floatDots {
  0%, 100% { transform: translateY(0); opacity: 1; }
  50% { transform: translateY(-10px); opacity: 0.5; }
}

@keyframes folderOpen {
  0%, 100% { transform: rotateY(0deg); }
  50% { transform: rotateY(15deg); }
}

@keyframes fileFade {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
}

@keyframes errorShake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

@keyframes waveExpand {
  0% { transform: translateX(-50%) scale(0); opacity: 1; }
  100% { transform: translateX(-50%) scale(1); opacity: 0; }
}

@keyframes rocketLaunch {
  0%, 100% { transform: translateY(0) rotate(-45deg); }
  50% { transform: translateY(-10px) rotate(-45deg); }
}

@keyframes starTwinkle {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.2); }
}

@keyframes boxFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

@keyframes elementFloat {
  0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.5; }
  50% { transform: translateY(-15px) rotate(180deg); opacity: 1; }
}

/* Dark Mode */
.dark .empty-title {
  color: #f9fafb;
}

.dark .empty-description {
  color: #d1d5db;
}

.dark .file-line {
  background: #374151;
}

.dark .element {
  background: #4b5563;
}

/* Responsive */
@media (max-width: 768px) {
  .empty-state {
    padding: 40px 20px;
    min-height: 250px;
  }
  
  .illustration {
    width: 100px;
    height: 100px;
  }
  
  .search-empty .search-icon,
  .data-empty .folder-icon,
  .error-empty .error-icon,
  .coming-soon-empty .rocket-icon,
  .default-empty .box-icon {
    font-size: 36px;
  }
  
  .empty-title {
    font-size: 20px;
  }
  
  .empty-description {
    font-size: 14px;
  }
}
</style>