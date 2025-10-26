<template>
  <div class="elements-view">
    <div class="page-header">
      <h1 class="text-gradient-primary">Elements</h1>
      <p class="lead">UI Components and Design Elements</p>
    </div>
    
    <div class="coming-soon">
      <div class="coming-soon-icon">🚧</div>
      <h2>Coming Soon</h2>
      <p>This page will showcase various UI elements and components used throughout the site.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ElementsView'
}
</script>

<style scoped>
.elements-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  min-height: 100vh;
  background: #f8fafc;
}

.page-header {
  text-align: center;
  margin-bottom: 48px;
  padding: 32px 0;
}

.page-header h1 {
  font-size: var(--font-size-5xl);
  font-weight: var(--font-weight-extrabold);
  margin-bottom: 12px;
  letter-spacing: var(--letter-spacing-tighter);
  line-height: var(--line-height-tight);
  font-variation-settings: 'wght' 800;
}

.page-header p {
  font-size: var(--font-size-xl);
  color: #64748b;
  font-weight: var(--font-weight-light);
  font-variation-settings: 'wght' 300;
}

.coming-soon {
  text-align: center;
  padding: 80px 20px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.coming-soon-icon {
  font-size: 4rem;
  margin-bottom: 20px;
}

.coming-soon h2 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 16px;
  color: #6366f1;
}

.coming-soon p {
  font-size: 1.125rem;
  color: #6b7280;
  max-width: 600px;
  margin: 0 auto;
}

/* Dark mode */
.dark .elements-view {
  background: #0f172a;
}

.dark .coming-soon {
  background: #1e293b;
}

/* Responsive */
@media (max-width: 768px) {
  .elements-view {
    padding: 20px 16px;
  }
  
  .page-header h1 {
    font-size: 2rem;
  }
  
  .page-header p {
    font-size: 1rem;
  }
  
  .coming-soon {
    padding: 60px 20px;
  }
}
</style>