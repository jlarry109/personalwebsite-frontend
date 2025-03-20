<template>
  <div class="user-dashboard">
    <nav>
      <div class="tabs">
        <button v-for="tab in tabs" :key="tab" @click="activeTab = tab" :class="{ active: activeTab === tab }">
          {{ tab }}
        </button>
      </div>
      <button @click="goToLogin" class="login-btn">Login</button>
    </nav>
    <div class="tab-content">
      <component :is="getTabComponent(activeTab)" />
    </div>
  </div>
</template>

<script>
import AboutMeTab from "@/components/user/AboutMeTab.vue"
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
      activeTab: "Experience",
    };
  },
  methods: {
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
      this.$router.push('/login');
    }
  },
};
</script>

<style scoped>
.user-dashboard {
  max-width: 900px;
  margin: auto;
}
nav {
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
</style>
