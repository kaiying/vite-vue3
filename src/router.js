import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/src/pages/home.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/src/pages/about.vue'),
  },
  {
    path: "/recommends",
    name: "recommends",
    component: () => import('@/src/pages/recommends.vue'),
  },
];

export default createRouter({
  history: createWebHistory('/'),
  routes,
});
