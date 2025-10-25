<template>
  <div class="user-dashboard">
    <nav :class="{ 'nav-scrolled': isScrolled }">
      <div class="nav-content">
        <div class="breadcrumb-container">
          <div class="breadcrumbs">
            <span v-for="(crumb, index) in breadcrumbs" :key="index" class="breadcrumb">
              {{ crumb.name }}
              <span v-if="index < breadcrumbs.length - 1" class="breadcrumb-separator">→</span>
            </span>
            <span class="breadcrumb active-breadcrumb">{{ activeTab }}</span>
          </div>
        </div>
        <div class="tabs-scroll-container">
          <div class="tabs">
            <div class="tab-slider" :style="sliderStyle"></div>
            <button 
              v-for="(tab, index) in tabs" 
              :key="tab" 
              @click="changeTab(tab)"
              :class="{ active: activeTab === tab }"
              class="tab-button">
              {{ tab }}
            </button>
          </div>
        </div>
      </div>
    </nav>


    <!-- Hero Section -->
    <section id="intro">
      <div class="particles-container">
        <div v-for="n in 50" :key="n" class="particle" :style="getParticleStyle(n)"></div>
      </div>
      <div class="hero-content">
        <div class="hero-image">
          <img src="@/assets/hq1-hero-2550px.jpg" alt="Jones Larry" class="profile-image" />
        </div>
        <h1 class="typing-text">{{ displayedText }}<span class="cursor">|</span></h1>
        <p class="hero-subtitle">Crafting intelligent solutions through continuous growth</p>
      </div>
    </section>

    <!-- Smooth Scrolling Sections -->
        <div class="tab-content">
          <section :id="activeTab.toLowerCase().replace(/\s/g, '-')">
            <transition name="fade" mode="out-in">
              <component :is="getTabComponent(activeTab)" :key="activeTab" />
            </transition>
          </section>
        </div>
  </div>
</template>

<script>
import AboutMeTab from "@/components/user/AboutMeTab.vue";
import ExperienceTab from "@/components/user/ExperienceTab.vue";
import EducationTab from "@/components/user/EducationTab.vue";
import SkillTab from "@/components/user/SkillTab.vue";
import ProjectTab from "@/components/user/ProjectTab.vue";
import CertificationTab from "@/components/user/CertificationTab.vue";
import TestimonialTab from "@/components/user/TestimonialTab.vue";
import PersonalInfoTab from "@/components/user/PersonalInfoTab.vue";

export default {
  data() {
    return {
      tabs: ["About Me", "Personal Info", "Education", "Experience", "Skills", "Certifications", "Projects", "Testimonials"],
      activeTab: "About Me",
      isMobile: false,
      fullText: "Building. Learning. Evolving.",
      displayedText: "",
      typingIndex: 0,
      isTyping: true,
      isScrolled: false,
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: 'Portfolio', path: '/portfolio' }
      ]
    };
  },
  mounted() {
    this.checkMobile();
    window.addEventListener('resize', this.checkMobile);
    window.addEventListener('scroll', this.handleScroll);
    this.startTypingAnimation();
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.checkMobile);
    window.removeEventListener('scroll', this.handleScroll);
  },
  computed: {
    sliderStyle() {
      const index = this.tabs.indexOf(this.activeTab);
      const tabWidth = 100 / this.tabs.length;
      return {
        transform: `translateX(${index * 100}%)`,
        width: `${tabWidth}%`
      };
    }
  },
  methods: {
	  changeTab(tab) {
	    console.log("Switching to tab:", tab);
	    this.activeTab = tab;
	  
	    this.$nextTick(() => {
	      const section = document.getElementById(tab.toLowerCase().replace(/\s/g, "-"));
	      if (section) {
	        section.scrollIntoView({ behavior: "smooth", block: "start" });
	      }
	    });
	  },

    getTabComponent(tab) {
      console.log('Getting component for tab:', tab);
      const components = {
        "About Me": AboutMeTab,
        "Personal Info": PersonalInfoTab,
        "Education": EducationTab,
        "Experience": ExperienceTab,
        "Skills": SkillTab,
        "Certifications": CertificationTab,
        "Projects": ProjectTab,
        "Testimonials": TestimonialTab,
      };
      const component = components[tab] || "div";
      console.log('Returning component:', component);
      return component;
    },
    checkMobile() {
      this.isMobile = window.innerWidth <= 768;
    },
    goToLogin() {
      this.$router.push("/login");
    },
    startTypingAnimation() {
      const typeChar = () => {
        if (this.typingIndex < this.fullText.length) {
          this.displayedText += this.fullText[this.typingIndex];
          this.typingIndex++;
          setTimeout(typeChar, 100);
        } else {
          this.isTyping = false;
        }
      };
      setTimeout(typeChar, 1000);
    },
    getParticleStyle(index) {
      const size = Math.random() * 4 + 2;
      const left = Math.random() * 100;
      const animationDelay = Math.random() * 20;
      const animationDuration = Math.random() * 10 + 10;
      
      return {
        width: `${size}px`,
        height: `${size}px`,
        left: `${left}%`,
        animationDelay: `${animationDelay}s`,
        animationDuration: `${animationDuration}s`
      };
    },
    handleScroll() {
      this.isScrolled = window.scrollY > 100;
    }
  }
};
</script>

<style scoped>
.user-dashboard {
  max-width: 1200px;
  margin: auto;
  padding: 0 20px;
  background: #f8fafc;
  min-height: 100vh;
  transition: background-color 0.3s ease;
}

.dark .user-dashboard {
  background: #0f172a;
}

@media (max-width: 768px) {
  .user-dashboard {
    padding: 0 16px;
  }
}



nav {
  position: sticky;
  top: 0;
  z-index: 100;
  padding: 20px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid rgba(229, 231, 235, 0.3);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

nav.nav-scrolled {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(229, 231, 235, 0.8);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  padding: 16px 20px;
}

.dark nav {
  background: rgba(15, 23, 42, 0.8);
  border-bottom: 1px solid rgba(51, 65, 85, 0.3);
}

.dark nav.nav-scrolled {
  background: rgba(15, 23, 42, 0.95);
  border-bottom: 1px solid rgba(51, 65, 85, 0.8);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.nav-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.breadcrumb-container {
  display: flex;
  justify-content: center;
}

.breadcrumbs {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #6b7280;
  font-weight: 500;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
}

.breadcrumb-separator {
  color: #9ca3af;
  font-size: 12px;
}

.active-breadcrumb {
  color: #6366f1;
  font-weight: 600;
}

 .tabs-scroll-container {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  white-space: nowrap;
  width: 100%;
}

.tabs {
  position: relative;
  display: inline-flex;
  padding: 6px;
  background: rgba(248, 249, 250, 0.8);
  border-radius: 30px;
  min-width: max-content;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(229, 231, 235, 0.5);
}

.dark .tabs {
  background: rgba(30, 41, 59, 0.8);
  border: 1px solid rgba(51, 65, 85, 0.5);
}

.tab-slider {
  position: absolute;
  top: 6px;
  left: 6px;
  height: calc(100% - 12px);
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  border-radius: 24px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(99, 102, 241, 0.3);
  z-index: 1;
}

@media (max-width: 768px) {
  nav {
    padding: 16px;
  }
  
  nav.nav-scrolled {
    padding: 12px 16px;
  }
  
  .nav-content {
    gap: 12px;
  }
  
  .breadcrumbs {
    font-size: 12px;
  }
  
  .tabs-scroll-container {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    -ms-overflow-style: none;
    position: relative;
  }
  
  .tabs-scroll-container::-webkit-scrollbar {
    display: none;
  }
  
  .tabs {
    padding: 4px;
    min-width: max-content;
  }
  
  .tab-button {
    padding: 10px 16px;
    font-size: 13px;
    min-width: 100px;
  }
  
  .tab-content {
    margin-top: 16px;
    padding: 16px;
  }
}

.tabs::-webkit-scrollbar {
  display: none;
}

.tabs-scroll-container {
  overflow-x: auto;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
  margin: 0 -10px; /* compensate padding if needed */
}

.tabs {
  display: inline-flex;
  gap: 10px;
  padding: 10px;
  white-space: nowrap;
  min-width: max-content;
}

.tabs::-webkit-scrollbar {
  display: none; /* hide scrollbar */
}

.tab-button {
  position: relative;
  z-index: 2;
  flex: 1;
  padding: 12px 20px;
  border: none;
  background: transparent;
  cursor: pointer;
  white-space: nowrap;
  border-radius: 24px;
  font-weight: 500;
  color: #6b7280;
  transition: all 0.3s ease;
  min-height: 44px;
  font-size: 14px;
}

.dark .tab-button {
  color: #94a3b8;
}

.tab-button:hover {
  color: #374151;
  transform: translateY(-1px);
}

.dark .tab-button:hover {
  color: #e2e8f0;
}

.tab-button.active {
  color: white;
  font-weight: 600;
}

.tab-button:focus {
  outline: 2px solid #6366f1;
  outline-offset: 2px;
}
.login-btn {
  padding: 8px 15px;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  border-radius: 5px;
}
.login-btn:hover {
  background-color: #0056b3;
}

.tab-content {
  margin-top: 20px;
  margin-bottom: 200px;
  padding: 15px;
}

.fade-enter-active {
  transition: all 0.3s ease-out;
}

.fade-leave-active {
  transition: all 0.3s ease-in;
}

.fade-enter-from {
  transform: translateX(30px);
  opacity: 0;
}

.fade-leave-to {
  transform: translateX(-30px);
  opacity: 0;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Parallax styling */
#intro h1 {
  letter-spacing: 2px;
  text-transform: uppercase;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 1s ease-in-out forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

#intro {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 120px 0;
  text-align: center;
  color: white;
  position: relative;
  overflow: hidden;
}

.particles-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.particle {
  position: absolute;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  animation: particleFloat infinite ease-in-out;
}

@keyframes particleFloat {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
    opacity: 0.6;
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
    opacity: 1;
  }
}

.hero-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}

.hero-image {
  position: relative;
}

.profile-image {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  animation: profilePulse 3s ease-in-out infinite;
}

@keyframes profilePulse {
  0%, 100% {
    transform: scale(1);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
  }
}

.typing-text {
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 16px;
  letter-spacing: -0.025em;
  line-height: 1.1;
  min-height: 58px;
}

.cursor {
  animation: blink 1s infinite;
  color: rgba(255, 255, 255, 0.8);
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

.hero-subtitle {
  font-size: 20px;
  opacity: 0.9;
  font-weight: 400;
  line-height: 1.5;
  animation: fadeInUp 1s ease-out 2s both;
}

@media (max-width: 768px) {
  #intro {
    padding: 80px 20px;
  }
  
  .profile-image {
    width: 100px;
    height: 100px;
  }
  
  .typing-text {
    font-size: 32px;
    min-height: 38px;
  }
  
  .hero-subtitle {
    font-size: 18px;
  }
  
  .hero-content {
    gap: 20px;
  }
}
#intro::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4); /* Dark overlay */
}
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  
  .fade-enter-active, .fade-leave-active {
    transition: none;
  }
  
  button:hover, button.active {
    transform: none;
  }
}
</style>
