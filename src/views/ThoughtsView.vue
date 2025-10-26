<template>
  <div class="thoughts-view">
    <div class="page-header">
      <h1 class="text-gradient-primary">Thoughts</h1>
      <p class="lead">Perspectives on technology, society, and the future</p>
    </div>
    
    <div class="filter-section">
      <div class="tag-filters">
        <button 
          v-for="tag in availableTags" 
          :key="tag"
          @click="toggleTag(tag)"
          :class="{ active: selectedTags.includes(tag) }"
          class="tag-button btn-press"
        >
          {{ tag }}
        </button>
      </div>
      <button @click="clearFilters" class="clear-button btn-bounce" v-if="selectedTags.length > 0">
        Clear All
      </button>
    </div>
    
    <SkeletonLoader v-if="loading" type="grid" :count="4" animation="shimmer" />
    
    <div v-else-if="error" class="error-state">
      <p>{{ error }}</p>
    </div>
    
    <div v-else class="thoughts-grid">
      <AnimatedCard 
        v-for="(article, index) in filteredArticles" 
        :key="article.id"
        category="default"
        :delay="index * 100"
        class="thought-card card-lift animate-stagger" 
        :class="{ 'coming-soon': article.comingSoon }"
        @click="article.comingSoon ? null : goToArticle(article.slug)"
        :style="{ cursor: article.comingSoon ? 'default' : 'pointer' }"
      >
        <div class="card-header">
          <div class="tags">
            <span v-for="tag in article.tags" :key="tag" class="category">{{ tag }}</span>
          </div>
          <time>{{ article.date }}</time>
        </div>
        <h2 class="text-gradient-secondary">{{ article.title }}</h2>
        <p>{{ article.excerpt }}</p>
        <div class="card-footer">
          <span class="read-time">{{ article.readTime }}</span>
        </div>
      </AnimatedCard>
    </div>
    
    <EmptyState 
      v-if="!loading && !error && filteredArticles.length === 0" 
      type="no-results"
      title="No Articles Found"
      description="Try adjusting your filters or check back later for new content."
      action-text="Clear Filters"
      @action="clearFilters"
    />
  </div>
</template>

<script lang="js">
import AnimatedCard from '@/components/AnimatedCard.vue';
import SkeletonLoader from '@/components/SkeletonLoader.vue';
import EmptyState from '@/components/EmptyState.vue';

export default {
  name: 'ThoughtsView',
  components: { AnimatedCard, SkeletonLoader, EmptyState },
  data() {
    return {
      selectedTags: [],
      availableTags: ['Technology', 'Society', 'Economics', 'Law', 'Capitalism', 'Socialism', 'Tax', 'Innovation', 'AI', 'Politics'],
      articles: [],
      loading: true,
      error: null
    }
  },
  async created() {
    await this.fetchArticles()
  },
  computed: {
    filteredArticles() {
      if (this.selectedTags.length === 0) {
        return this.articles;
      }
      return this.articles.filter(article => 
        this.selectedTags.some(tag => article.tags.includes(tag))
      );
    }
  },
  methods: {
    async fetchArticles() {
      try {
        const response = await fetch(`${import.meta.env.BASE_URL}data/articles.json`)
        if (!response.ok) throw new Error('Failed to fetch articles')
        this.articles = await response.json()
      } catch (err) {
        this.error = 'Failed to load articles'
        console.error('Articles fetch error:', err)
      } finally {
        this.loading = false
      }
    },
    goToArticle(slug) {
      this.$router.push(`/thoughts/${slug}`);
    },
    toggleTag(tag) {
      const index = this.selectedTags.indexOf(tag);
      if (index > -1) {
        this.selectedTags.splice(index, 1);
      } else {
        this.selectedTags.push(tag);
      }
    },
    clearFilters() {
      this.selectedTags = [];
    }
  }
}
</script>

<style scoped>
.thoughts-view {
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

.thoughts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 24px;
}

.thought-card {
  padding: 32px;
  cursor: pointer;
  position: relative;
}

.thought-card.coming-soon {
  opacity: 0.8;
}

.filter-section {
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
}

.tag-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
}

.tag-button {
  padding: 8px 16px;
  border: 2px solid #e2e8f0;
  background: #ffffff;
  color: #64748b;
  border-radius: 25px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: capitalize;
}

.tag-button:hover {
  border-color: #6366f1;
  color: #6366f1;
  transform: translateY(-2px);
}

.tag-button.active {
  background: #6366f1;
  color: white;
  border-color: #6366f1;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
}

.clear-button {
  padding: 8px 20px;
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.clear-button:hover {
  background: #dc2626;
  transform: translateY(-2px);
}

.tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.category {
  background: rgba(99, 102, 241, 0.1);
  color: #4f46e5;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.no-results {
  text-align: center;
  padding: 60px 20px;
  color: #64748b;
  font-size: 18px;
}

.error-state {
  text-align: center;
  padding: 60px 20px;
  color: #ef4444;
  font-size: 18px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}



.card-header time {
  color: #64748b;
  font-size: 14px;
  font-weight: 500;
}

.thought-card h2 {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  margin-bottom: 16px;
  line-height: var(--line-height-snug);
  letter-spacing: var(--letter-spacing-tight);
  font-variation-settings: 'wght' 700;
}

.thought-card p {
  color: #475569;
  font-size: var(--font-size-base);
  line-height: var(--line-height-relaxed);
  margin-bottom: 20px;
  font-weight: var(--font-weight-normal);
  font-variation-settings: 'wght' 400;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.read-time {
  color: #9ca3af;
  font-size: 14px;
  font-weight: 500;
}

@media (max-width: 768px) {
  .thoughts-view {
    padding: 20px 16px;
  }
  
  .page-header h1 {
    font-size: 32px;
  }
  
  .page-header p {
    font-size: 16px;
  }
  
  .thoughts-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .thought-card {
    padding: 24px;
  }
  
  .thought-card h2 {
    font-size: 20px;
  }
}
</style>