<template>
  <div class="article-view">
    <div class="article-header">
      <router-link to="/thoughts" class="back-link">← Back to Thoughts</router-link>
      <div class="article-meta">
        <span class="category">Technology</span>
        <time>December 2024</time>
        <span class="read-time">3 min read</span>
      </div>
      <h1>The Future of AI in Software Development</h1>
      <p class="article-subtitle">How artificial intelligence is reshaping not just what we build, but how we think about building software solutions</p>
    </div>

    <article class="article-content">
      <p>As we stand at the intersection of artificial intelligence and software engineering, I find myself reflecting on how these tools are fundamentally reshaping our industry. We're not just witnessing the automation of repetitive tasks—we're seeing a transformation in how we approach problem-solving itself.</p>

      <h2>The Current Landscape</h2>
      <p>Today's AI-powered development tools have moved beyond simple code completion. They're becoming collaborative partners that can understand context, suggest architectural patterns, and even help debug complex issues. Tools like GitHub Copilot, ChatGPT, and Claude are changing how we write, review, and maintain code.</p>

      <p>But this is just the beginning. The real transformation lies in how these tools are changing our thought processes and workflows.</p>

      <h2>Shifting Mental Models</h2>
      <p>Traditional software development has always been about breaking down complex problems into smaller, manageable pieces. AI is enhancing this process by helping us:</p>

      <ul>
        <li><strong>Rapid prototyping:</strong> Quickly explore multiple solution approaches</li>
        <li><strong>Pattern recognition:</strong> Identify common architectural patterns and anti-patterns</li>
        <li><strong>Knowledge synthesis:</strong> Combine insights from vast codebases and documentation</li>
        <li><strong>Error prevention:</strong> Catch potential issues before they become problems</li>
      </ul>

      <h2>The Human Element</h2>
      <p>Despite these advances, the human element remains crucial. AI excels at pattern matching and code generation, but software development is ultimately about solving human problems. The creativity, empathy, and strategic thinking that developers bring to the table are irreplaceable.</p>

      <p>The future isn't about AI replacing developers—it's about AI amplifying human capabilities. We're moving toward a world where developers can focus more on high-level design, user experience, and creative problem-solving while AI handles more of the routine implementation details.</p>

      <h2>Looking Ahead</h2>
      <p>As we look to the future, I see several key trends emerging:</p>

      <blockquote>
        "The most successful developers of tomorrow will be those who learn to collaborate effectively with AI, using it as a powerful tool while maintaining their uniquely human perspective on problem-solving."
      </blockquote>

      <p>The integration of AI into software development is not just a technological shift—it's a cultural one. It requires us to rethink our processes, our roles, and our relationship with the tools we use every day.</p>

      <p>What excites me most is the potential for AI to democratize software development, making it more accessible to people from diverse backgrounds while simultaneously raising the bar for what's possible in terms of software quality and innovation.</p>

      <div class="article-footer">
        <p><em>What are your thoughts on AI in software development? How has it changed your workflow? I'd love to hear your perspective.</em></p>
      </div>
    </article>
  </div>
</template>

<script lang="js">
export default {
  name: 'ArticleView'
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

.category {
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

.article-header h1 {
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