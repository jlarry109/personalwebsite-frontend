import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '@/views/LoginView.vue';
import AdminDashboard from '@/views/AdminDashboard.vue';
import UserDashboard from '@/views/UserDashboard.vue';
import ThoughtsView from '@/views/ThoughtsView.vue';
import ArticleView from '@/views/ArticleView.vue';
import EffectsDemo from '@/components/EffectsDemo.vue';

const routes = [
  // Home page is now the read-only UserDashboard
  { path: '/', name: 'home', component: UserDashboard },

  // Thoughts page for personal insights
  { path: '/thoughts', name: 'thoughts', component: ThoughtsView },

  // Individual article view
  { path: '/thoughts/:slug', name: 'article', component: ArticleView },

  // Effects demo page
  { path: '/effects-demo', name: 'effects-demo', component: EffectsDemo },

  // Separate Login page for users who want to log in
  { path: '/login', name: 'login', component: LoginView },
	

  {
    path: '/admin',
    name: 'admin',
    component: AdminDashboard,
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem('token');
      const role = localStorage.getItem('role');
      if (token && role === 'ADMIN') {
        next();
      } else {
        next('/');
      }
    }
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
