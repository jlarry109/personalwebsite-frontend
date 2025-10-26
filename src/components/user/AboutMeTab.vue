<template>
  <BaseTab title="About Me">
    <div class="about-me" ref="aboutContainer">
      <!-- Interactive Background -->
      <div class="particles-container">
        <div 
          v-for="particle in particles" 
          :key="particle.id"
          class="particle"
          :style="{
            left: particle.x + 'px',
            top: particle.y + 'px',
            animationDelay: particle.delay + 's',
            animationDuration: particle.duration + 's'
          }"
        ></div>
      </div>

      <!-- Profile Image with Effects -->
      <div class="profile-container" ref="profileContainer">
        <div class="profile-wrapper">
          <img 
            src="@/assets/cat.jpeg" 
            alt="Jones Larry" 
            class="profile-img"
            @mouseenter="handleImageHover"
            @mouseleave="handleImageLeave"
          />
          <div class="profile-glow"></div>
        </div>
      </div>

      <!-- About Text with Animations -->
      <div class="about-text">
        <div class="text-block" ref="textBlock1">
          <p class="intro-text">
            Greetings! I am <span class="gradient-text">Jones Larry</span>, an Engineer specializing in 
            <span class="gradient-text">Software and AI systems</span> at Amazon Artificial General Intelligence. 
            I graduated from Duke University, where I developed a passion for solving complex problems through technology.
          </p>
        </div>
        
        <div class="text-block" ref="textBlock2">
          <p class="body-text">
            Currently, I work on building scalable AI systems that drive impactful solutions.
            When I'm not programming, I enjoy exploring the latest in AI, contributing to open-source projects, and spending time outdoors.
          </p>
        </div>
        
        <div class="text-block" ref="textBlock3">
          <p class="body-text">
            Feel free to reach out if you'd like to connect or collaborate!
          </p>
          <p class="signature">Best regards,</p>
        </div>
      </div>
    </div>
  </BaseTab>
</template>

<script>
import BaseTab from "@/components/BaseTab.vue";

export default {
  components: { BaseTab },
  data() {
    return {
      particles: [],
      observer: null
    }
  },
  mounted() {
    this.generateParticles();
    this.setupScrollAnimations();
  },
  beforeUnmount() {
    if (this.observer) {
      this.observer.disconnect();
    }
  },
  methods: {
    generateParticles() {
      const particleCount = 15;
      const container = this.$refs.aboutContainer;
      if (!container) return;
      
      const containerRect = container.getBoundingClientRect();
      
      for (let i = 0; i < particleCount; i++) {
        this.particles.push({
          id: i,
          x: Math.random() * containerRect.width,
          y: Math.random() * containerRect.height,
          delay: Math.random() * 5,
          duration: 8 + Math.random() * 4
        });
      }
    },
    
    setupScrollAnimations() {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('animate-in');
            }
          });
        },
        { threshold: 0.2 }
      );
      
      // Observe profile and text blocks
      if (this.$refs.profileContainer) {
        this.observer.observe(this.$refs.profileContainer);
      }
      
      [this.$refs.textBlock1, this.$refs.textBlock2, this.$refs.textBlock3].forEach((block, index) => {
        if (block) {
          block.style.animationDelay = `${index * 0.2}s`;
          this.observer.observe(block);
        }
      });
    },
    
    handleImageHover() {
      const img = document.querySelector('.profile-img');
      if (img) {
        img.style.transform = 'scale(1.1) rotate(5deg)';
      }
    },
    
    handleImageLeave() {
      const img = document.querySelector('.profile-img');
      if (img) {
        img.style.transform = 'scale(1) rotate(0deg)';
      }
    }
  }
};
</script>

<style scoped>
.about-me {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  min-height: 100vh;
  padding: 2rem;
  overflow: hidden;
}

/* Interactive Background Particles */
.particles-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}

.particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: linear-gradient(45deg, #6366f1, #8b5cf6);
  border-radius: 50%;
  animation: float infinite ease-in-out;
  opacity: 0.6;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
    opacity: 0.6;
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
    opacity: 1;
  }
}

/* Profile Image with Effects */
.profile-container {
  position: relative;
  z-index: 1;
  margin-bottom: 3rem;
  opacity: 0;
  transform: translateY(30px) scale(0.9);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.profile-container.animate-in {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.profile-wrapper {
  position: relative;
  display: inline-block;
}

.profile-img {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid transparent;
  background: linear-gradient(45deg, #6366f1, #8b5cf6, #ec4899) padding-box,
              linear-gradient(45deg, #6366f1, #8b5cf6, #ec4899) border-box;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  position: relative;
  z-index: 2;
}

.profile-glow {
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  background: linear-gradient(45deg, #6366f1, #8b5cf6, #ec4899);
  border-radius: 50%;
  opacity: 0;
  filter: blur(20px);
  transition: opacity 0.4s ease;
  z-index: 1;
}

.profile-img:hover + .profile-glow {
  opacity: 0.7;
}

/* Text Animations */
.about-text {
  position: relative;
  z-index: 1;
  max-width: 800px;
  margin: 0 auto;
}

.text-block {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  margin-bottom: 2rem;
}

.text-block.animate-in {
  opacity: 1;
  transform: translateY(0);
}

/* Typography Enhancements */
.intro-text {
  font-size: 1.25rem;
  line-height: 1.8;
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
}

.body-text {
  font-size: 1.125rem;
  line-height: 1.7;
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
}

.signature {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-primary);
  font-style: italic;
  margin-top: 2rem;
}

.gradient-text {
  background: linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 700;
  position: relative;
}

.gradient-text::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899);
  transform: scaleX(0);
  transition: transform 0.3s ease;
  transform-origin: left;
}

.gradient-text:hover::after {
  transform: scaleX(1);
}

/* Responsive Design */
@media (max-width: 768px) {
  .about-me {
    padding: 1rem;
  }
  
  .profile-img {
    width: 150px;
    height: 150px;
  }
  
  .intro-text {
    font-size: 1.125rem;
  }
  
  .body-text {
    font-size: 1rem;
  }
  
  .text-block {
    margin-bottom: 1.5rem;
  }
}

/* Dark Mode Support */
.dark .particle {
  background: linear-gradient(45deg, #818cf8, #a78bfa);
}

.dark .profile-img {
  background: linear-gradient(45deg, #818cf8, #a78bfa, #f472b6) padding-box,
              linear-gradient(45deg, #818cf8, #a78bfa, #f472b6) border-box;
}

.dark .profile-glow {
  background: linear-gradient(45deg, #818cf8, #a78bfa, #f472b6);
}

.dark .gradient-text {
  background: linear-gradient(135deg, #818cf8, #a78bfa, #f472b6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.dark .gradient-text::after {
  background: linear-gradient(135deg, #818cf8, #a78bfa, #f472b6);
}
</style>