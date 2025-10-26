<template>
  <div class="article-view">
    <SkeletonLoader v-if="loading" type="profile" animation="shimmer" />
    
    <div v-else-if="article" class="article-container">
      <div class="article-header">
        <router-link to="/thoughts" class="back-link btn-press">← Back to Thoughts</router-link>
        <div class="article-meta">
          <div class="tags">
            <span v-for="tag in article.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>
          <time>{{ article.date }}</time>
          <span class="read-time">{{ article.readTime }}</span>
        </div>
        <h1 class="article-title">{{ article.title }}</h1>
        <p class="article-subtitle">{{ article.excerpt }}</p>
      </div>

      <article class="article-content">
        <div v-if="article.comingSoon" class="coming-soon">
          <div class="coming-soon-icon">🚧</div>
          <h2>Coming Soon</h2>
          <p>This article is currently being written. Check back soon for the full content!</p>
        </div>
        <div v-else v-html="article.content"></div>
      </article>
    </div>
    
    <div v-else class="not-found">
      <h1>Article Not Found</h1>
      <p>The article you're looking for doesn't exist.</p>
      <router-link to="/thoughts" class="back-link btn-press">← Back to Thoughts</router-link>
    </div>
  </div>
</template>

<script>
import SkeletonLoader from '@/components/SkeletonLoader.vue'

export default {
  name: 'ArticleView',
  components: {
    SkeletonLoader
  },
  data() {
    return {
      article: null,
      articles: [],
      loading: true,
      error: null
    }
  },
  async created() {
    await this.fetchArticles()
    this.loadArticle()
  },
  watch: {
    async '$route'() {
      if (this.articles.length === 0) {
        await this.fetchArticles()
      }
      this.loadArticle()
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
    loadArticle() {
      const slug = this.$route.params.slug
      this.article = this.articles.find(article => article.slug === slug)
    }
  }
}
</script>

<style scoped>
.article-view {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
}

.article-header {
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  padding: 48px;
  border-radius: 20px;
  margin-bottom: 32px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.08);
  position: relative;
  overflow: hidden;
}

.article-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #6366f1, #8b5cf6, #06b6d4);
}

.back-link {
  color: #6366f1;
  text-decoration: none;
  font-weight: 600;
  margin-bottom: 32px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 25px;
  background: rgba(99, 102, 241, 0.1);
  transition: all 0.3s ease;
  font-size: 14px;
}

.back-link:hover {
  background: rgba(99, 102, 241, 0.15);
  transform: translateX(-4px);
}

.article-meta {
  display: flex;
  gap: 16px;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.tag {
  background: rgba(99, 102, 241, 0.1);
  color: #4f46e5;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.article-meta time,
.read-time {
  color: #64748b;
  font-size: 14px;
  font-weight: 500;
}

.article-title {
  font-size: var(--font-size-6xl);
  font-weight: var(--font-weight-extrabold);
  line-height: var(--line-height-tight);
  margin-bottom: 20px;
  letter-spacing: var(--letter-spacing-tighter);
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-variation-settings: 'wght' 800;
}

.article-subtitle {
  font-size: var(--font-size-xl);
  color: #64748b;
  line-height: var(--line-height-relaxed);
  font-weight: var(--font-weight-light);
  font-variation-settings: 'wght' 300;
}

.article-content {
  background: linear-gradient(135deg, #ffffff 0%, #fefefe 100%);
  padding: 56px;
  border-radius: 20px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  position: relative;
}

.article-content::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, #6366f1, transparent);
}

.article-content p {
  font-size: var(--font-size-lg);
  line-height: var(--line-height-loose);
  color: #374151;
  margin-bottom: 28px;
  font-weight: var(--font-weight-normal);
  font-variation-settings: 'wght' 400;
}

.article-content p:first-of-type {
  font-size: 21px;
  font-weight: 500;
  color: #1e293b;
  position: relative;
  padding-left: 20px;
}

.article-content p:first-of-type::before {
  content: '';
  position: absolute;
  left: 0;
  top: 8px;
  width: 4px;
  height: 60%;
  background: linear-gradient(180deg, #6366f1, #8b5cf6);
  border-radius: 2px;
}

.article-content h2 {
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-extrabold);
  background: var(--gradient-secondary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 48px 0 24px 0;
  line-height: var(--line-height-tight);
  letter-spacing: var(--letter-spacing-tight);
  position: relative;
  padding-bottom: 12px;
  font-variation-settings: 'wght' 800;
}

.article-content h2::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, #6366f1, #8b5cf6);
  border-radius: 2px;
}

.article-content ul {
  margin: 32px 0;
  padding: 24px;
  background: rgba(99, 102, 241, 0.02);
  border-radius: 12px;
  border-left: 4px solid #6366f1;
}

.article-content li {
  font-size: 18px;
  line-height: 1.7;
  color: #374151;
  margin-bottom: 16px;
  padding-left: 32px;
  position: relative;
}

.article-content li::before {
  content: '→';
  color: #6366f1;
  font-weight: bold;
  position: absolute;
  left: 0;
  font-size: 16px;
}

.article-content blockquote {
  border: none;
  padding: 32px;
  margin: 40px 0;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(139, 92, 246, 0.05) 100%);
  border-radius: 16px;
  font-style: italic;
  font-size: var(--font-size-2xl);
  background: var(--gradient-accent);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: relative;
  border-left: 4px solid #6366f1;
  font-weight: var(--font-weight-medium);
  font-variation-settings: 'wght' 500;
  line-height: var(--line-height-relaxed);
}

.article-content blockquote::before {
  content: '"';
  font-size: 60px;
  color: #6366f1;
  position: absolute;
  top: -10px;
  left: 20px;
  opacity: 0.3;
}

.article-footer {
  margin-top: 56px;
  padding: 32px;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(139, 92, 246, 0.03) 100%);
  border-radius: 16px;
  border: 1px solid rgba(99, 102, 241, 0.1);
}

.coming-soon {
  text-align: center;
  padding: 60px 20px;
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
}

.not-found {
  text-align: center;
  padding: 80px 20px;
}

.not-found h1 {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 16px;
  color: #1f2937;
}

.not-found p {
  font-size: 1.25rem;
  color: #6b7280;
  margin-bottom: 32px;
}

.article-footer p {
  color: #6366f1;
  font-style: italic;
}

/* Dark mode */
.dark .not-found h1 {
  color: #f1f5f9;
}

/* Responsive */
@media (max-width: 768px) {
  .article-view {
    padding: 20px 16px;
  }
  
  .article-header {
    padding: 32px 24px;
  }
  
  .article-title {
    font-size: 36px;
  }
  
  .article-subtitle {
    font-size: 18px;
  }
  
  .article-content {
    padding: 32px 24px;
  }
}

.article-footer p {
  color: #6366f1;
  font-size: 17px;
  font-weight: 500;
  margin: 0;
  text-align: center;
}

@media (max-width: 768px) {
  .article-view {
    padding: 20px 16px;
  }
  
  .article-header h1 {
    font-size: 36px;
  }
  
  .article-subtitle {
    font-size: 18px;
  }
  
  .article-content {
    padding: 32px 24px;
  }
  
  .article-content p,
  .article-content li {
    font-size: 16px;
  }
  
  .article-content h2 {
    font-size: 24px;
  }
  
  .article-meta {
    gap: 12px;
  }
}
</style>