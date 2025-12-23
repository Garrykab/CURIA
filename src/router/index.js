import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../store/auth.store';

const roleLanding = {
  super_admin: '/super/dashboard',
  admin_barreau: '/barreau/dashboard',
  avocat: '/avocat/profil',
};

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Public/Home.vue'),
    },
    {
      path: '/verify',
      name: 'verify',
      component: () => import('../views/Public/VerifyLawyer.vue'),
    },
    {
      path: '/request',
      name: 'request',
      component: () => import('../views/Public/RequestForm.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Auth/Login.vue'),
    },
    {
      path: '/super/dashboard',
      name: 'super-dashboard',
      meta: { requiresAuth: true, roles: ['super_admin'] },
      component: () => import('../views/SuperAdmin/Dashboard.vue'),
    },
    {
      path: '/super/barreaux',
      name: 'super-barreaux',
      meta: { requiresAuth: true, roles: ['super_admin'] },
      component: () => import('../views/SuperAdmin/Barreaux.vue'),
    },
    {
      path: '/barreau/dashboard',
      name: 'barreau-dashboard',
      meta: { requiresAuth: true, roles: ['admin_barreau'] },
      component: () => import('../views/AdminBarreau/Dashboard.vue'),
    },
    {
      path: '/barreau/demandes',
      name: 'barreau-demandes',
      meta: { requiresAuth: true, roles: ['admin_barreau'] },
      component: () => import('../views/AdminBarreau/Avocats/Demandes.vue'),
    },
    {
      path: '/barreau/avocats',
      name: 'barreau-avocats',
      meta: { requiresAuth: true, roles: ['admin_barreau'] },
      component: () => import('../views/AdminBarreau/Avocats/Index.vue'),
    },
    {
      path: '/barreau/avocats/create',
      name: 'barreau-avocats-create',
      meta: { requiresAuth: true, roles: ['admin_barreau'] },
      component: () => import('../views/AdminBarreau/Avocats/Create.vue'),
    },
    {
      path: '/barreau/avocats/:id',
      name: 'barreau-avocats-show',
      meta: { requiresAuth: true, roles: ['admin_barreau'] },
      component: () => import('../views/AdminBarreau/Avocats/Show.vue'),
    },
    {
      path: '/barreau/avocats/:id/edit',
      name: 'barreau-avocats-edit',
      meta: { requiresAuth: true, roles: ['admin_barreau'] },
      component: () => import('../views/AdminBarreau/Avocats/Edit.vue'),
    },
    {
      path: '/avocat/profil',
      name: 'avocat-profil',
      meta: { requiresAuth: true, roles: ['avocat'] },
      component: () => import('../views/Avocat/Profil.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
});

router.beforeEach((to) => {
  const auth = useAuthStore();

  if (to.name === 'login' && auth.isAuthenticated) {
    return roleLanding[auth.userRole] || '/';
  }

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return { name: 'login', query: { redirect: to.fullPath } };
  }

  if (to.meta.roles && !to.meta.roles.includes(auth.userRole)) {
    return { path: '/' };
  }

  return true;
});

export default router;

