import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import About from '../pages/About.vue';
import Contact from '../pages/Contact.vue';
import CryptoDetail from '../pages/CryptoDetail.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/contact', component: Contact },
  { path: '/crypto/:id', component: CryptoDetail, props: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
