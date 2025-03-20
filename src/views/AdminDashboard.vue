<template>
  <div class="admin-dashboard">
    <nav>
      <button v-for="tab in tabs" :key="tab" @click="activeTab = tab" :class="{ active: activeTab === tab }">
        {{ tab }}
      </button>
    </nav>
    <div class="tab-content">
      <component :is="getTabComponent(activeTab)" />
    </div>
  </div>
</template>

<script>
import ExperienceTab from "@/components/admin/ExperienceTab.vue";
import EducationTab from "@/components/admin/EducationTab.vue";
import SkillTab from "@/components/admin/SkillTab.vue";
import ProjectTab from "@/components/admin/ProjectTab.vue";
import TestimonialTab from "@/components/admin/TestimonialTab.vue";
import PersonalInfoTab from "@/components/admin/PersonalInfoTab.vue";

export default {
  data() {
    return {
      tabs: ["Personal Info", "Education", "Experience", "Skills", "Projects", "Testimonials"],
      activeTab: "Experience",
    };
  },
  methods: {
    getTabComponent(tab) {
      const components = {
		  "Personal Info": PersonalInfoTab,
		  "Education": EducationTab,
		  "Experience": ExperienceTab,
		  "Skills": SkillTab,
          "Projects": ProjectTab,
          "Testimonials": TestimonialTab,
      };
      return components[tab] || "div";
    },
  },
};
</script>

<style scoped>
.admin-dashboard {
  max-width: 900px;
  margin: auto;
}
nav {
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
.tab-content {
  margin-top: 20px;
}
</style>
