<template>
  <div class="thoughts-view">
    <div class="page-header">
      <h1>Thoughts</h1>
      <p>Perspectives on technology, society, and the future</p>
    </div>
    
    <div class="filter-section">
      <div class="tag-filters">
        <button 
          v-for="tag in availableTags" 
          :key="tag"
          @click="toggleTag(tag)"
          :class="{ active: selectedTags.includes(tag) }"
          class="tag-button"
        >
          {{ tag }}
        </button>
      </div>
      <button @click="clearFilters" class="clear-button" v-if="selectedTags.length > 0">
        Clear All
      </button>
    </div>
    
    <div class="thoughts-grid">
      <article 
        v-for="article in filteredArticles" 
        :key="article.id"
        class="thought-card" 
        :class="{ 'coming-soon': article.comingSoon }"
        @click="goToArticle(article.slug)"
      >
        <div class="card-header">
          <div class="tags">
            <span v-for="tag in article.tags" :key="tag" class="category">{{ tag }}</span>
          </div>
          <time>{{ article.date }}</time>
        </div>
        <h2>{{ article.title }}</h2>
        <p>{{ article.excerpt }}</p>
        <div class="card-footer">
          <span class="read-time">{{ article.readTime }}</span>
        </div>
      </article>
    </div>
    
    <div v-if="filteredArticles.length === 0" class="no-results">
      <p>No articles found for the selected tags.</p>
    </div>
  </div>
</template>

<script lang="js">
export default {
  name: 'ThoughtsView',
  data() {
    return {
      selectedTags: [],
      availableTags: ['Technology', 'Society', 'Economics', 'Law', 'Capitalism', 'Socialism', 'Tax', 'Innovation', 'AI', 'Politics'],
      articles: [
        {
          id: 1,
          title: 'The Future of AI in Software Development',
          excerpt: 'How artificial intelligence is reshaping not just what we build, but how we think about building software solutions...',
          tags: ['Technology', 'AI', 'Innovation'],
          date: 'Dec 2024',
          readTime: '3 min read',
          slug: 'ai-software-development',
          comingSoon: false
        },
        {
          id: 2,
          title: 'Economic Models in the Digital Age',
          excerpt: 'Exploring how traditional economic theories apply to our increasingly digital world...',
          tags: ['Economics', 'Technology', 'Society'],
          date: 'Coming Soon',
          readTime: '5 min read',
          slug: 'digital-economics',
          comingSoon: true
        },
        {
          id: 3,
          title: 'Legal Frameworks for AI Governance',
          excerpt: 'The intersection of law and artificial intelligence in modern society...',
          tags: ['Law', 'AI', 'Politics'],
          date: 'Coming Soon',
          readTime: '4 min read',
          slug: 'ai-legal-frameworks',
          comingSoon: true
        },
        {
          id: 4,
          title: 'Capitalism vs Socialism in Tech',
          excerpt: 'How different economic systems shape technological innovation and distribution...',
          tags: ['Economics', 'Capitalism', 'Socialism', 'Technology'],
          date: 'Coming Soon',
          readTime: '6 min read',
          slug: 'economic-systems-tech',
          comingSoon: true
        }
      ]
    }
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
  font-size: 42px;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 12px;
  letter-spacing: -0.025em;
}

.page-header p {
  font-size: 18px;
  color: #64748b;
  font-weight: 400;
}

.thoughts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 24px;
}

.thought-card {
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  padding: 32px;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  cursor: pointer;
}

.thought-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #6366f1, #8b5cf6);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.thought-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.08);
  border-color: #cbd5e1;
}

.thought-card:hover::before {
  opacity: 1;
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
  font-size: 24px;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 16px;
  line-height: 1.3;
  letter-spacing: -0.025em;
}

.thought-card p {
  color: #475569;
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 20px;
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