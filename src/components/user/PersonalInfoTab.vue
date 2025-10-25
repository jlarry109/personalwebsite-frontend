<template>
  <BaseTab title="Personal Information">
    <template v-if="loading">
      <div class="skeleton-loader">
        <div class="skeleton-text"></div>
        <div class="skeleton-text short"></div>
        <div class="skeleton-text"></div>
      </div>
    </template>
    <template v-else-if="error">
      <div class="error">
        <span>{{ error }}</span>
        <button @click="error = null">×</button>
      </div>
    </template>
    <template v-else>
			<img src="@/assets/hq1-hero-2550px.jpg" alt="Jones Larry" class="office-img" />
      <div class="personal-info-grid">
        <div class="info-section">
          <div class="info-item">
            <div class="icon">👤</div>
            <div>
              <strong class="label">Name</strong>
              <p>{{ personalInfo.firstName }} {{ personalInfo.lastName }}</p>
            </div>
          </div>
          <div class="info-item">
            <div class="icon">✉️</div>
            <div>
              <strong class="label">Email</strong>
              <p><a :href="'mailto:' + personalInfo.email">{{ personalInfo.email }}</a></p>
            </div>
          </div>
          <div class="info-item">
            <div class="icon">📱</div>
            <div>
              <strong class="label">Phone</strong>
              <p>{{ personalInfo.phone }}</p>
            </div>
          </div>
          <div class="info-item">
            <div class="icon">📍</div>
            <div>
              <strong class="label">Address</strong>
              <p>{{ personalInfo.address }}</p>
            </div>
          </div>
        </div>
        <div class="bio-section">
          <div class="info-item">
            <div class="icon">💼</div>
            <div>
              <strong class="label">Bio</strong>
              <p class="bio">{{ personalInfo.bio }}</p>
            </div>
          </div>
          <div class="social-links">
            <a v-if="personalInfo.linkedinUrl" :href="personalInfo.linkedinUrl" target="_blank" class="social-link">
              <span class="icon">💼</span> LinkedIn
            </a>
            <a v-if="personalInfo.githubUrl" :href="personalInfo.githubUrl" target="_blank" class="social-link">
              <span class="icon">🔗</span> GitHub
            </a>
            <a v-if="personalInfo.websiteUrl" :href="personalInfo.websiteUrl" target="_blank" class="social-link">
              <span class="icon">🌐</span> Website
            </a>
          </div>
        </div>
      </div>
      <div class="resume-actions">
        <button @click="downloadResume" class="download-btn">
          <span class="icon">📎</span> Download Resume
        </button>
      </div>
    </template>
  </BaseTab>
</template>

<script>
import BaseTab from "@/components/BaseTab.vue";
import { generateResumePDF } from "@/utils/pdfExport.js";

export default {
  components: { BaseTab },
  data() {
    return {
      personalInfo: {},
      loading: false,
      error: null,
    };
  },
  methods: {
    async fetchPersonalInfo() {
      this.loading = true;
      try {
        const response = await fetch(`${import.meta.env.BASE_URL}data/personal-info.json`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        this.personalInfo = await response.json();
        console.log('Personal info loaded:', this.personalInfo);
      } catch (err) {
        this.error = "Failed to load personal information.";
        console.error('PersonalInfo error:', err);
      } finally {
        this.loading = false;
      }
    },
    async downloadResume() {
      try {
        console.log('Starting resume download...');
        console.log('Personal info available:', this.personalInfo);
        
        if (!this.personalInfo || !this.personalInfo.firstName) {
          alert('Personal information not loaded yet. Please wait a moment and try again.');
          return;
        }
        
        // Fetch all data needed for resume
        const [skillsRes, experienceRes, educationRes, projectsRes] = await Promise.all([
          fetch(`${import.meta.env.BASE_URL}data/skills.json`),
          fetch(`${import.meta.env.BASE_URL}data/experience.json`),
          fetch(`${import.meta.env.BASE_URL}data/education.json`),
          fetch(`${import.meta.env.BASE_URL}data/projects.json`)
        ]);
        
        if (!skillsRes.ok || !experienceRes.ok || !educationRes.ok || !projectsRes.ok) {
          throw new Error('Failed to fetch resume data');
        }
        
        const skills = await skillsRes.json();
        const experience = await experienceRes.json();
        const education = await educationRes.json();
        const projects = await projectsRes.json();
        
        console.log('All data loaded, generating PDF...');
        generateResumePDF(this.personalInfo, experience, education, skills, projects);
      } catch (error) {
        console.error('Failed to generate resume:', error);
        alert(`Failed to generate resume: ${error.message}. Please try again.`);
      }
    }
  },
  mounted() {
    console.log('PersonalInfoTab mounted');
    this.fetchPersonalInfo();
  },
};
</script>

<style scoped>
/* Fade-in animation for smooth loading */
.fade-in {
  opacity: 0;
  transform: translateY(10px);
  animation: fadeInUp 0.6s ease-out forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Layout Styling */
.office-img {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 45px; 
}
.personal-info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
}

@media (max-width: 768px) {
  .personal-info-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }
}

.info-section, .bio-section {
  background: #ffffff;
  padding: 32px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
}

.info-section:hover, .bio-section:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.info-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 20px;
}

.info-item:last-child {
  margin-bottom: 0;
}

.icon {
  font-size: 20px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #6366f1;
  border-radius: 8px;
  flex-shrink: 0;
}

.label {
  display: block;
  color: #374151;
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 4px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

p {
  font-size: 16px;
  color: #1f2937;
  line-height: 1.5;
  margin: 0;
}

.social-links {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 16px;
}

.social-link {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: #6366f1;
  color: white;
  text-decoration: none;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.social-link:hover {
  background: #4f46e5;
  transform: translateY(-1px);
}

.bio {
  font-style: italic;
}


a {
  color: #1100ff !important;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s ease;
}

a:hover {
  text-decoration: underline;
  color: #ffcc00;
}

.skeleton-loader {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 15px;
}

.skeleton-text {
  width: 100%;
  height: 15px;
  background: linear-gradient(90deg, #f3f3f3 25%, #e0e0e0 50%, #f3f3f3 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 4px;
}

.skeleton-text.short {
  width: 60%;
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

.error {
  background: #ffdddd;
  color: red;
  padding: 10px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.error button {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

.resume-actions {
  margin-top: 32px;
  text-align: center;
}

.download-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: #10b981;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.download-btn:hover {
  background: #059669;
  transform: translateY(-1px);
}
</style>
