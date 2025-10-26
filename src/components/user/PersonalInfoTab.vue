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
          <div class="flip-card" v-for="(item, index) in contactInfo" :key="index" @click="toggleFlip(index)" :class="{ touched: flippedCards.includes(index) }">
            <div class="flip-card-inner">
              <div class="flip-card-front">
                <div class="animated-icon" :class="item.iconClass">
                  {{ item.icon }}
                </div>
                <strong class="label">{{ item.label }}</strong>
              </div>
              <div class="flip-card-back">
                <div class="contact-content">
                  <a v-if="item.link" :href="item.link" class="contact-link">
                    {{ item.value }}
                  </a>
                  <span v-else>{{ item.value }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="bio-section">
          <div class="info-item">
            <div class="animated-icon bio-icon">💼</div>
            <div>
              <strong class="label">Bio</strong>
              <p class="bio">{{ personalInfo.bio }}</p>
            </div>
          </div>
          
          <div class="social-links">
            <a v-if="personalInfo.linkedinUrl" :href="personalInfo.linkedinUrl" target="_blank" class="social-link linkedin">
              <i class="fab fa-linkedin-in"></i>
              <span>LinkedIn</span>
            </a>
            <a v-if="personalInfo.githubUrl" :href="personalInfo.githubUrl" target="_blank" class="social-link github">
              <i class="fab fa-github"></i>
              <span>GitHub</span>
            </a>
            <a v-if="personalInfo.websiteUrl" :href="personalInfo.websiteUrl" target="_blank" class="social-link website">
              <i class="fas fa-globe"></i>
              <span>Website</span>
            </a>
          </div>
        </div>
      </div>
      
      <div class="resume-actions">
        <button @click="downloadResume" class="download-btn" :class="{ loading: isDownloading, success: downloadSuccess }">
          <div class="btn-content">
            <i v-if="!isDownloading && !downloadSuccess" class="fas fa-download"></i>
            <div v-if="isDownloading" class="spinner"></div>
            <i v-if="downloadSuccess" class="fas fa-check"></i>
            <span>{{ buttonText }}</span>
          </div>
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
      isDownloading: false,
      downloadSuccess: false,
      flippedCards: [],
    };
  },
  computed: {
    contactInfo() {
      return [
        {
          icon: '👤',
          iconClass: 'bounce',
          label: 'Name',
          value: `${this.personalInfo.firstName} ${this.personalInfo.lastName}`,
          link: null
        },
        {
          icon: '✉️',
          iconClass: 'shake',
          label: 'Email',
          value: this.personalInfo.email,
          link: `mailto:${this.personalInfo.email}`
        },
        {
          icon: '📱',
          iconClass: 'pulse',
          label: 'Phone',
          value: this.personalInfo.phone,
          link: null
        },
        {
          icon: '📍',
          iconClass: 'swing',
          label: 'Address',
          value: this.personalInfo.address,
          link: null
        }
      ];
    },
    buttonText() {
      if (this.isDownloading) return 'Generating...';
      if (this.downloadSuccess) return 'Downloaded!';
      return 'Download Resume';
    }
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
      if (this.isDownloading) return;
      
      this.isDownloading = true;
      this.downloadSuccess = false;
      
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
        
        this.downloadSuccess = true;
        setTimeout(() => {
          this.downloadSuccess = false;
        }, 3000);
        
      } catch (error) {
        console.error('Failed to generate resume:', error);
        alert(`Failed to generate resume: ${error.message}. Please try again.`);
      } finally {
        this.isDownloading = false;
      }
    },
    toggleFlip(index) {
      if (this.flippedCards.includes(index)) {
        this.flippedCards = this.flippedCards.filter(i => i !== index);
      } else {
        this.flippedCards.push(index);
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

/* Flip Card Effects */
.info-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.flip-card {
  background-color: transparent;
  width: 100%;
  height: 120px;
  perspective: 1000px;
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  cursor: pointer;
}

.flip-card:hover .flip-card-inner,
.flip-card.touched .flip-card-inner {
  transform: rotateY(180deg);
}

.flip-card-front, .flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.flip-card-front {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.flip-card-back {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
  transform: rotateY(180deg);
}

/* Animated Icons */
.animated-icon {
  font-size: 32px;
  margin-bottom: 12px;
  display: inline-block;
}

.animated-icon.bounce:hover {
  animation: bounce 0.6s ease-in-out;
}

.animated-icon.shake:hover {
  animation: shake 0.5s ease-in-out;
}

.animated-icon.pulse:hover {
  animation: pulse 0.8s ease-in-out;
}

.animated-icon.swing:hover {
  animation: swing 0.6s ease-in-out;
}

@keyframes bounce {
  0%, 20%, 60%, 100% { transform: translateY(0); }
  40% { transform: translateY(-20px); }
  80% { transform: translateY(-10px); }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
  20%, 40%, 60%, 80% { transform: translateX(5px); }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
}

@keyframes swing {
  0%, 100% { transform: rotate(0deg); }
  20% { transform: rotate(15deg); }
  40% { transform: rotate(-10deg); }
  60% { transform: rotate(5deg); }
  80% { transform: rotate(-5deg); }
}

.label {
  font-weight: 600;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.contact-content {
  font-size: 16px;
  font-weight: 500;
}

.contact-link {
  color: white !important;
  text-decoration: none;
  transition: all 0.3s ease;
}

.contact-link:hover {
  text-decoration: underline;
  transform: scale(1.05);
}

/* Bio Section */
.bio-section {
  background: #ffffff;
  padding: 32px;
  border-radius: 16px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.bio-section:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
}

.info-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 20px;
}

.bio-icon {
  font-size: 24px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  border-radius: 12px;
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.bio-icon:hover {
  transform: rotate(360deg) scale(1.1);
}

.bio {
  font-style: italic;
  font-size: 16px;
  color: #1f2937;
  line-height: 1.6;
}

/* Social Links with Brand Colors */
.social-links {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  margin-top: 24px;
}

.social-link {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  text-decoration: none;
  border-radius: 25px;
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.social-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  transition: left 0.5s;
}

.social-link:hover::before {
  left: 100%;
}

.social-link.linkedin {
  background: #0077b5;
  color: white;
}

.social-link.linkedin:hover {
  background: #005885;
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 10px 20px rgba(0, 119, 181, 0.3);
}

.social-link.github {
  background: #333;
  color: white;
}

.social-link.github:hover {
  background: #24292e;
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 10px 20px rgba(51, 51, 51, 0.3);
}

.social-link.website {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.social-link.website:hover {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
}

.social-link i {
  font-size: 18px;
  transition: transform 0.3s ease;
}

.social-link:hover i {
  transform: rotate(360deg);
}

/* Resume Download Button */
.resume-actions {
  margin-top: 32px;
  text-align: center;
}

.download-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 16px 32px;
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  border: none;
  border-radius: 50px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  min-width: 200px;
}

.download-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  transition: left 0.5s;
}

.download-btn:hover::before {
  left: 100%;
}

.download-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(16, 185, 129, 0.3);
}

.download-btn.loading {
  background: linear-gradient(135deg, #6b7280, #4b5563);
  cursor: not-allowed;
}

.download-btn.success {
  background: linear-gradient(135deg, #059669, #047857);
  animation: successPulse 0.6s ease-out;
}

@keyframes successPulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

.btn-content {
  display: flex;
  align-items: center;
  gap: 8px;
}

.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Loading States */
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
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
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

/* Dark Mode Support */
.dark .bio-section {
  background: #1e293b;
  border-color: #374151;
}

.dark .bio {
  color: #e5e7eb;
}

.dark .flip-card-front {
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
}

.dark .flip-card-back {
  background: linear-gradient(135deg, #ec4899 0%, #be185d 100%);
}
</style>