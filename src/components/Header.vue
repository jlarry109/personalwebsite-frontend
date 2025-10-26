<template>
  <!-- Floating Navigation -->
  <nav class="floating-nav" :class="{ scrolled: isScrolled, hidden: isHidden }">
    <div class="nav-container">
      <!-- Logo -->
      <router-link to="/" class="logo text-gradient-animated">
        <span class="logo-text">Jones Larry</span>
      </router-link>
      
      <!-- Desktop Navigation -->
      <ul class="nav-links">
        <li><router-link to="/" active-class="active">Home</router-link></li>
        <li><router-link to="/thoughts" active-class="active">Thoughts</router-link></li>
        <li><router-link to="/elements" active-class="active">Elements</router-link></li>
      </ul>
      
      <!-- Social Icons -->
      <div class="social-icons">
        <a href="#" class="social-link"><i class="fab fa-twitter"></i></a>
        <a href="#" class="social-link"><i class="fab fa-github"></i></a>
        <a href="#" class="social-link"><i class="fab fa-linkedin"></i></a>
      </div>
      
      <!-- Mobile Menu Button -->
      <button class="mobile-menu-btn" @click="toggleMobileMenu" :class="{ active: isMobileMenuOpen }">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
    
    <!-- Scroll Progress Bar -->
    <div class="scroll-progress" :style="{ width: scrollProgress + '%' }"></div>
  </nav>
  
  <!-- Mobile Menu Overlay -->
  <div class="mobile-menu-overlay" :class="{ active: isMobileMenuOpen }" @click="closeMobileMenu">
    <div class="mobile-menu" @click.stop>
      <div class="mobile-menu-header">
        <span class="mobile-logo text-gradient-primary">Jones Larry</span>
        <button class="close-btn" @click="closeMobileMenu">&times;</button>
      </div>
      <ul class="mobile-nav-links">
        <li><router-link to="/" @click="closeMobileMenu">Home</router-link></li>
        <li><router-link to="/thoughts" @click="closeMobileMenu">Thoughts</router-link></li>
        <li><router-link to="/elements" @click="closeMobileMenu">Elements</router-link></li>
      </ul>
      <div class="mobile-social">
        <a href="#" class="mobile-social-link"><i class="fab fa-twitter"></i></a>
        <a href="#" class="mobile-social-link"><i class="fab fa-github"></i></a>
        <a href="#" class="mobile-social-link"><i class="fab fa-linkedin"></i></a>
      </div>
    </div>
  </div>
  
  <!-- Hero Header -->
  <header class="hero-header">
    <!-- Floating Particles -->
    <div class="particles">
      <div v-for="n in 20" :key="n" class="particle" :style="getParticleStyle(n)"></div>
    </div>
    
    <!-- Floating Shapes -->
    <div class="floating-shapes">
      <div class="shape shape-1"></div>
      <div class="shape shape-2"></div>
      <div class="shape shape-3"></div>
    </div>
    
    <div class="hero-content">
      <h1 class="hero-title text-gradient-animated">Welcome to My Personal Website</h1>
      <p class="hero-subtitle lead">Explore my projects, skills, and experiences</p>
      <div class="hero-cta">
        <button @click="scrollToPortfolio" class="cta-button">Explore Portfolio</button>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      isScrolled: false,
      isHidden: false,
      isMobileMenuOpen: false,
      scrollProgress: 0,
      lastScrollY: 0
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      const currentScrollY = window.scrollY
      
      // Update scroll state
      this.isScrolled = currentScrollY > 50
      
      // Hide/show nav on scroll direction
      this.isHidden = currentScrollY > this.lastScrollY && currentScrollY > 100
      this.lastScrollY = currentScrollY
      
      // Update scroll progress
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      this.scrollProgress = (currentScrollY / docHeight) * 100
    },
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen
      document.body.style.overflow = this.isMobileMenuOpen ? 'hidden' : ''
    },
    closeMobileMenu() {
      this.isMobileMenuOpen = false
      document.body.style.overflow = ''
    },
    scrollToPortfolio() {
      // Scroll to the main content area
      const mainElement = document.querySelector('main')
      if (mainElement) {
        mainElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    },
    getParticleStyle(index) {
      const size = Math.random() * 6 + 2
      const left = Math.random() * 100
      const animationDelay = Math.random() * 20
      const animationDuration = Math.random() * 15 + 10
      
      return {
        width: `${size}px`,
        height: `${size}px`,
        left: `${left}%`,
        animationDelay: `${animationDelay}s`,
        animationDuration: `${animationDuration}s`
      }
    }
  }
}
</script>

<style scoped>
/* Floating Navigation */
.floating-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateY(0);
}

.floating-nav.scrolled {
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.floating-nav.hidden {
  transform: translateY(-100%);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
}

/* Logo */
.logo {
  text-decoration: none;
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  font-variation-settings: 'wght' 700;
  transition: all 0.3s ease;
}

.logo:hover {
  transform: scale(1.05);
}

.logo-text {
  position: relative;
}

/* Desktop Navigation */
.nav-links {
  display: flex;
  list-style: none;
  gap: 32px;
  margin: 0;
  padding: 0;
}

.nav-links a {
  text-decoration: none;
  color: #64748b;
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-sm);
  padding: 8px 16px;
  border-radius: 20px;
  transition: all 0.3s ease;
  position: relative;
}

.nav-links a:hover {
  color: #6366f1;
  background: rgba(99, 102, 241, 0.1);
  transform: translateY(-2px);
}

.nav-links a.active {
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: var(--font-weight-semibold);
}

/* Social Icons */
.social-icons {
  display: flex;
  gap: 16px;
}

.social-link {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
  border-radius: 50%;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.5);
}

.social-link:hover {
  color: white;
  background: #6366f1;
  transform: translateY(-2px) scale(1.1);
}

/* Mobile Menu Button */
.mobile-menu-btn {
  display: none;
  flex-direction: column;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
}

.mobile-menu-btn span {
  width: 24px;
  height: 2px;
  background: #64748b;
  transition: all 0.3s ease;
  border-radius: 2px;
}

.mobile-menu-btn.active span:nth-child(1) {
  transform: rotate(45deg) translate(6px, 6px);
}

.mobile-menu-btn.active span:nth-child(2) {
  opacity: 0;
}

.mobile-menu-btn.active span:nth-child(3) {
  transform: rotate(-45deg) translate(6px, -6px);
}

/* Scroll Progress */
.scroll-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  background: var(--gradient-primary);
  transition: width 0.1s ease;
}

/* Mobile Menu */
.mobile-menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1001;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
}

.mobile-menu-overlay.active {
  opacity: 1;
  visibility: visible;
}

.mobile-menu {
  position: absolute;
  top: 0;
  right: 0;
  width: 300px;
  height: 100vh;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  padding: 24px;
  transform: translateX(100%);
  transition: transform 0.3s ease;
}

.mobile-menu-overlay.active .mobile-menu {
  transform: translateX(0);
}

.mobile-menu-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.mobile-logo {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #64748b;
}

.mobile-nav-links {
  list-style: none;
  padding: 0;
  margin: 0 0 32px 0;
}

.mobile-nav-links li {
  margin-bottom: 16px;
}

.mobile-nav-links a {
  display: block;
  padding: 12px 16px;
  color: #64748b;
  text-decoration: none;
  font-weight: var(--font-weight-medium);
  border-radius: 8px;
  transition: all 0.3s ease;
}

.mobile-nav-links a:hover {
  background: rgba(99, 102, 241, 0.1);
  color: #6366f1;
}

.mobile-social {
  display: flex;
  gap: 16px;
  justify-content: center;
}

.mobile-social-link {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
  border-radius: 50%;
  background: rgba(99, 102, 241, 0.1);
  transition: all 0.3s ease;
}

.mobile-social-link:hover {
  background: #6366f1;
  color: white;
}

/* Hero Header */
.hero-header {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 120px 24px 80px;
  background: 
    linear-gradient(135deg, #1e3c72 0%, #2a5298 25%, #6366f1 50%, #8b5cf6 75%, #ec4899 100%),
    linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.05) 50%, transparent 70%);
  background-size: 400% 400%, 100% 100%;
  animation: gradientShift 15s ease infinite;
  position: relative;
  overflow: hidden;
}

@keyframes gradientShift {
  0%, 100% { background-position: 0% 50%, 0% 0%; }
  50% { background-position: 100% 50%, 100% 100%; }
}

.hero-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(ellipse at 25% 25%, rgba(99, 102, 241, 0.4) 0%, transparent 50%),
    radial-gradient(ellipse at 75% 75%, rgba(139, 92, 246, 0.4) 0%, transparent 50%),
    radial-gradient(ellipse at 50% 10%, rgba(236, 72, 153, 0.3) 0%, transparent 40%),
    radial-gradient(ellipse at 10% 90%, rgba(6, 182, 212, 0.3) 0%, transparent 40%);
  pointer-events: none;
  animation: colorShift 20s ease infinite;
}

@keyframes colorShift {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 0.8; }
}

.hero-header::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    linear-gradient(45deg, transparent 48%, rgba(255, 255, 255, 0.03) 50%, transparent 52%),
    linear-gradient(-45deg, transparent 48%, rgba(255, 255, 255, 0.03) 50%, transparent 52%);
  background-size: 60px 60px;
  opacity: 0.5;
  pointer-events: none;
}

.hero-content {
  position: relative;
  z-index: 1;
  max-width: 800px;
}

.hero-title {
  font-size: var(--font-size-6xl);
  font-weight: var(--font-weight-extrabold);
  margin-bottom: 24px;
  line-height: var(--line-height-tight);
  letter-spacing: var(--letter-spacing-tighter);
  color: white;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

.hero-subtitle {
  font-size: var(--font-size-xl);
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 32px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

/* Floating Particles */
.particles {
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
    transform: translateY(-30px) rotate(180deg);
    opacity: 1;
  }
}

/* Floating Shapes */
.floating-shapes {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.shape {
  position: absolute;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  animation: shapeFloat infinite ease-in-out;
}

.shape-1 {
  width: 100px;
  height: 100px;
  top: 20%;
  left: 10%;
  animation-duration: 20s;
  animation-delay: 0s;
}

.shape-2 {
  width: 60px;
  height: 60px;
  top: 60%;
  right: 15%;
  animation-duration: 25s;
  animation-delay: -5s;
  border-radius: 20%;
}

.shape-3 {
  width: 80px;
  height: 80px;
  bottom: 30%;
  left: 70%;
  animation-duration: 30s;
  animation-delay: -10s;
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  border-radius: 0;
}

@keyframes shapeFloat {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  33% {
    transform: translateY(-20px) rotate(120deg);
  }
  66% {
    transform: translateY(10px) rotate(240deg);
  }
}

/* Hero CTA */
.hero-cta {
  margin-top: 32px;
}

.cta-button {
  display: inline-flex;
  align-items: center;
  padding: 16px 32px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  text-decoration: none;
  border-radius: 50px;
  font-weight: var(--font-weight-semibold);
  font-size: var(--font-size-lg);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.3);
  transition: all 0.4s ease;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

.cta-button:hover {
  background: rgba(255, 255, 255, 0.3);
  border-color: rgba(255, 255, 255, 0.5);
  transform: translateY(-4px) scale(1.05);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
}

.cta-button:active {
  transform: translateY(-2px) scale(1.02);
}

/* Dark Mode */
.dark .floating-nav {
  background: rgba(15, 23, 42, 0.8);
  border-bottom-color: rgba(255, 255, 255, 0.1);
}

.dark .floating-nav.scrolled {
  background: rgba(15, 23, 42, 0.95);
}

.dark .mobile-menu {
  background: rgba(15, 23, 42, 0.95);
}

.dark .hero-header {
  background: 
    linear-gradient(135deg, #0f0f23 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #533483 100%),
    linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.02) 50%, transparent 70%);
  background-size: 400% 400%, 100% 100%;
}

.dark .hero-header::before {
  background: 
    radial-gradient(ellipse at 25% 25%, rgba(99, 102, 241, 0.6) 0%, transparent 50%),
    radial-gradient(ellipse at 75% 75%, rgba(139, 92, 246, 0.6) 0%, transparent 50%),
    radial-gradient(ellipse at 50% 10%, rgba(236, 72, 153, 0.4) 0%, transparent 40%),
    radial-gradient(ellipse at 10% 90%, rgba(6, 182, 212, 0.4) 0%, transparent 40%);
}

.dark .particle {
  background: rgba(99, 102, 241, 0.4);
}

.dark .shape {
  background: rgba(139, 92, 246, 0.2);
}

.dark .cta-button {
  background: rgba(99, 102, 241, 0.3);
  border-color: rgba(99, 102, 241, 0.5);
}

.dark .cta-button:hover {
  background: rgba(99, 102, 241, 0.5);
  border-color: rgba(99, 102, 241, 0.7);
}

/* Responsive */
@media (max-width: 768px) {
  .nav-links,
  .social-icons {
    display: none;
  }
  
  .mobile-menu-btn {
    display: flex;
  }
  
  .hero-title {
    font-size: var(--font-size-4xl);
  }
  
  .hero-subtitle {
    font-size: var(--font-size-lg);
  }
  
  .mobile-menu {
    width: 100vw;
  }
}
</style>
