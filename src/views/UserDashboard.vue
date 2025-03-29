<template>
  <div class="user-dashboard">
    <nav>
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
      <!-- <button @click="goToLogin" class="login-btn">Login</button> -->
    </nav>

    <!-- Parallax Intro Section -->
    <section id="intro" v-parallax="0.3">
      <h1>Welcome to My Portfolio</h1>
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
      activeTab: "About Me", // Default tab
    };
  },
  methods: {
    changeTab(tab) {
		console.log("Switching to tab:", tab); 
      this.activeTab = tab;
	  this.$nextTick(() => {
	      const section = document.getElementById(tab.toLowerCase().replace(/\s/g, "-"));
	      if (section) {
	        window.scrollTo({ top: section.offsetTop - 50, behavior: "smooth" });
	      }
	    });
    },
    getTabComponent(tab) {
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
      return components[tab] || "div";
    },
    goToLogin() {
      this.$router.push("/login");
    }
  }
};
</script>

<style scoped>
.user-dashboard {
  max-width: 900px;
  margin: auto;
}



nav {
	position: relative;
	z-index: 100;
	display: flex;
	justify-content: space-between;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-bottom: 2px solid #ddd;
}
.tabs {
  display: flex;
  gap: 10px;
}
button {
  padding: 10px;
  border: none;
  background: lightgray;
  cursor: pointer;
}
button.active {
  background: gray;
  color: white;
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
}

/* Parallax styling */
#intro {
  background: url('@/assets/images/bg.jpg') center/cover no-repeat;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
  text-shadow: 2px 2px 5px rgba(0,0,0,0.5);
}

/* Fade transition for tabs */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
