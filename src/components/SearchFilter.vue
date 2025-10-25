<template>
  <div class="search-container">
    <div class="search-input-wrapper">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search skills..."
        class="search-input"
        @input="$emit('search', searchQuery)"
      />
      <span class="search-icon">🔍</span>
    </div>
  </div>
</template>

<script lang="js">
export default {
  data() {
    return {
      searchQuery: ''
    };
  }
};
</script>

<style scoped>
.search-container {
  margin-bottom: 32px;
  display: flex;
  justify-content: center;
}

.search-input-wrapper {
  position: relative;
  max-width: 500px;
  width: 100%;
}

.search-input {
  width: 100%;
  padding: 16px 20px 16px 52px;
  border: 2px solid transparent;
  border-radius: 30px;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.9) 100%);
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.5);
  color: #1e293b;
  letter-spacing: -0.025em;
}

.search-input::placeholder {
  color: #64748b;
  font-weight: 400;
}

.search-input:focus {
  outline: none;
  border-color: #6366f1;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%);
  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.15), 0 12px 40px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.6);
  transform: translateY(-2px);
}

.search-icon {
  position: absolute;
  left: 18px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 18px;
  color: #6366f1;
  transition: all 0.3s ease;
  filter: drop-shadow(0 2px 4px rgba(99, 102, 241, 0.2));
}

.search-input:focus + .search-icon {
  color: #4f46e5;
  transform: translateY(-50%) scale(1.1);
}

@media (max-width: 768px) {
  .search-input-wrapper {
    max-width: 100%;
  }
  
  .search-input {
    padding: 14px 18px 14px 48px;
    font-size: 15px;
  }
  
  .search-icon {
    left: 16px;
    font-size: 16px;
  }
}
</style>
