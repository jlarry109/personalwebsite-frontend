<template>
  <div class="mobile-nav" :class="{ 'nav-scrolled': isScrolled }">
    <div class="container">
      <div class="mobile-nav-content">
        <div class="nav-brand">
          <router-link to="/" class="brand-link">
            <span class="brand-text">JL</span>
          </router-link>
        </div>
        
        <div class="nav-actions">
          <button 
            @click="toggleMenu" 
            class="menu-toggle"
            :class="{ active: isMenuOpen }"
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </div>
    
    <!-- Mobile Menu Overlay -->
    <div class="menu-overlay" :class="{ active: isMenuOpen }" @click="closeMenu">
      <div class="menu-panel" @click.stop>
        <div class="menu-header">
          <h3>Navigation</h3>
          <button @click="closeMenu" class="close-btn">&times;</button>
        </div>
        
        <nav class="menu-nav">
          <router-link 
            v-for="item in navItems" 
            :key="item.path"
            :to="item.path"
            @click="closeMenu"
            class="nav-item"
          >
            <i :class="item.icon"></i>
            <span>{{ item.name }}</span>
          </router-link>
        </nav>
        
        <div class="menu-footer">
          <div class="social-links">
            <a href="#" class="social-link"><i class="fab fa-github"></i></a>
            <a href="#" class="social-link"><i class="fab fa-linkedin"></i></a>
            <a href="#" class="social-link"><i class="fab fa-twitter"></i></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MobileNavigation',
  data() {
    return {
      isScrolled: false,
      isMenuOpen: false,
      navItems: [
        { name: 'Home', path: '/', icon: 'fas fa-home' },
        { name: 'Thoughts', path: '/thoughts', icon: 'fas fa-lightbulb' },
        { name: 'Effects Demo', path: '/effects-demo', icon: 'fas fa-magic' }
      ]
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll, { passive: true })
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      this.isScrolled = window.scrollY > 50
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen
      document.body.style.overflow = this.isMenuOpen ? 'hidden' : ''
    },
    closeMenu() {
      this.isMenuOpen = false
      document.body.style.overflow = ''
    }
  }
}
</script>

<style scoped>
.mobile-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: var(--z-sticky);
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  display: none;
}

.mobile-nav.nav-scrolled {
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
}

.mobile-nav-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-md) 0;
}

.brand-link {
  text-decoration: none;
  color: #6366f1;
  font-weight: 700;
  font-size: var(--text-xl);
}

.brand-text {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  border-radius: 50%;
  font-size: var(--text-sm);
  font-weight: 700;
}

.menu-toggle {
  display: flex;
  flex-direction: column;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  padding: var(--space-xs);
  border-radius: 8px;
  transition: all 0.3s ease;
}

.menu-toggle span {
  width: 24px;
  height: 2px;
  background: #374151;
  transition: all 0.3s ease;
  border-radius: 2px;
}

.menu-toggle.active span:nth-child(1) {
  transform: rotate(45deg) translate(6px, 6px);
}

.menu-toggle.active span:nth-child(2) {
  opacity: 0;
}

.menu-toggle.active span:nth-child(3) {
  transform: rotate(-45deg) translate(6px, -6px);
}

.menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  z-index: var(--z-modal-backdrop);
}

.menu-overlay.active {
  opacity: 1;
  visibility: visible;
}

.menu-panel {
  position: absolute;
  top: 0;
  right: 0;
  width: 280px;
  height: 100vh;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  transform: translateX(100%);
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.menu-overlay.active .menu-panel {
  transform: translateX(0);
}

.menu-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-lg);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.menu-header h3 {
  margin: 0;
  color: #1f2937;
  font-size: var(--text-lg);
}

.close-btn {
  background: none;
  border: none;
  font-size: var(--text-2xl);
  color: #6b7280;
  cursor: pointer;
  padding: var(--space-xs);
  border-radius: 50%;
  transition: all 0.2s ease;
}

.close-btn:hover {
  background: rgba(0, 0, 0, 0.1);
  color: #374151;
}

.menu-nav {
  flex: 1;
  padding: var(--space-lg) 0;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  padding: var(--space-md) var(--space-lg);
  color: #374151;
  text-decoration: none;
  transition: all 0.2s ease;
  border-left: 3px solid transparent;
}

.nav-item:hover {
  background: rgba(99, 102, 241, 0.1);
  border-left-color: #6366f1;
  color: #6366f1;
}

.nav-item.router-link-active {
  background: rgba(99, 102, 241, 0.1);
  border-left-color: #6366f1;
  color: #6366f1;
  font-weight: 600;
}

.menu-footer {
  padding: var(--space-lg);
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.social-links {
  display: flex;
  justify-content: center;
  gap: var(--space-md);
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(99, 102, 241, 0.1);
  color: #6366f1;
  border-radius: 50%;
  text-decoration: none;
  transition: all 0.3s ease;
}

.social-link:hover {
  background: #6366f1;
  color: white;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .mobile-nav {
    display: block;
  }
  
  .menu-panel {
    width: 100vw;
  }
}

.dark .mobile-nav {
  background: rgba(15, 23, 42, 0.9);
  border-bottom-color: rgba(255, 255, 255, 0.1);
}

.dark .menu-panel {
  background: rgba(15, 23, 42, 0.95);
}

.dark .menu-toggle span {
  background: #e2e8f0;
}

.dark .nav-item {
  color: #e2e8f0;
}

.dark .nav-item:hover {
  background: rgba(99, 102, 241, 0.2);
  color: #a78bfa;
}
</style>