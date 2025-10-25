<template>
  <div class="user-dashboard">
    <nav>
      <div class="tabs-scroll-container">
        <div class="tabs">
          <button 
            v-for="tab in tabs" 
            :key="tab" 
            :href="'#' + tab.toLowerCase().replace(/\s/g, '-')"
            v-scrolly
            @click="changeTab(tab)"
            :class="{ active: activeTab === tab }">
            {{ tab }}
          </button>
        </div>
      </div>
      <div class="tab-indicator" :style="indicatorStyle"></div>
    </nav>


    <!-- Hero Section -->
    <section id="intro">
      <div class="hero-content">
        <h1>Jones Larry</h1>
        <p class="hero-subtitle">Machine Learning Engineer & Software Developer</p>
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
      isMobile: false
    };
  },
  mounted() {
    this.checkMobile();
    window.addEventListener('resize', this.checkMobile);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.checkMobile);
  },
  computed: {
      indicatorStyle() {
        const index = this.tabs.indexOf(this.activeTab);
        return {
          transform: `translateX(${index * 100}%)`,
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
	display: flex;
	justify-content: center;
  align-items: center;
  padding: 20px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid #e5e7eb;
}

 .tabs-scroll-container {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  white-space: nowrap;
  width: 100%;
}

.tabs {
  display: inline-flex;
  gap: 8px;
  padding: 8px;
  background: #f8f9fa;
  border-radius: 30px;
  min-width: max-content;
}

@media (max-width: 768px) {
  nav {
    padding: 16px;
  }
  
  .tabs-scroll-container {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    -ms-overflow-style: none;
    position: relative;
  }
  
  .tabs-scroll-container::after {
    content: '';
    position: absolute;
    top: 50%;
    right: 8px;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    background: linear-gradient(90deg, transparent, #f8f9fa);
    pointer-events: none;
  }
  
  .tabs-scroll-container::-webkit-scrollbar {
    display: none;
  }
  
  .tabs {
    gap: 6px;
    padding: 6px;
  }
  
  button {
    padding: 12px 20px;
    font-size: 14px;
    min-width: 120px;
    line-height: 1.4;
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

button {
  flex-shrink: 0;
  padding: 12px 24px;
  border: 1px solid transparent;
  background: transparent;
  cursor: pointer;
  white-space: nowrap;
  border-radius: 25px;
  font-weight: 500;
  color: #6b7280;
  transition: all 0.3s ease;
  min-height: 44px;
  min-width: 44px;
}

button:hover {
  background: #f3f4f6;
  color: #374151;
  transform: translateY(-1px);
}

button:focus {
  outline: 2px solid #6366f1;
  outline-offset: 2px;
}

button.active {
  background: #6366f1;
  color: white;
  border-color: #6366f1;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
  transform: translateY(-1px);
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

#intro::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="1" fill="white" opacity="0.1"/></svg>') repeat;
  background-size: 50px 50px;
  animation: float 20s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.hero-content {
  position: relative;
  z-index: 1;
}

.hero-content h1 {
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 16px;
  letter-spacing: -0.025em;
  line-height: 1.1;
}

.hero-subtitle {
  font-size: 20px;
  opacity: 0.9;
  font-weight: 400;
  line-height: 1.5;
}

@media (max-width: 768px) {
  #intro {
    padding: 80px 20px;
  }
  
  .hero-content h1 {
    font-size: 36px;
  }
  
  .hero-subtitle {
    font-size: 18px;
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
