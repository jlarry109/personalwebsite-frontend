<template>
  <div class="user-dashboard">
    <nav>
      <div class="tabs-wrapper">
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


    <!-- Parallax Intro Section -->
    <section id="intro" v-parallax="0.3">
      <h1>Building. Learning. Evolving.</h1>
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

/* .tabs {
  position: relative;
  display: flex;
  gap: 10px;
} */

.tabs {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
  padding-bottom: 6px;
}

.tabs::-webkit-scrollbar {
  display: none; /* Optional: hide scrollbar */
}


.tab-indicator {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 4px;
  width: 100px; /* Adjust for tab width */
  background-color: #b48974;
  border-radius: 5px;
  transition: transform 0.3s ease-in-out, background-color 0.3s;
}

.tabs-wrapper {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  margin-right: 10px;
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
  padding: 15px;
  animation: fadeIn 0.4s ease-in-out;
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
  background: url('@/assets/images/bg.jpg') center/cover no-repeat;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 28px;
  text-shadow: 2px 2px 5px rgba(0,0,0,0.5);
  backdrop-filter: blur(3px); /* Add blur */
  transition: backdrop-filter 0.3s ease-in-out;
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
/* Fade transition for tabs */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
