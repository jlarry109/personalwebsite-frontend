import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '@/views/LoginView.vue';
import AdminDashboard from '@/views/AdminDashboard.vue';
import UserDashboard from '@/views/UserDashboard.vue';

const routes = [
  // Home page is now the read-only UserDashboard
  { path: '/', name: 'home', component: UserDashboard },

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
  history: createWebHistory(),
  routes
});

export default router;
