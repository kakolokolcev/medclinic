import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/doctors',
      children: [
        {
          path: '/doctors',
          name: 'doctors',
          component: () => import('@/pages/Doctors.vue'),
        },
        {
          path: '/nurses',
          name: 'nurses',
          component: () => import('@/pages/Nurses.vue'),
        },
      ],
    },
  ],
});

export default router;
