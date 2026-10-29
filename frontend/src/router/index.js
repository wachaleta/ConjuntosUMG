import { createRouter, createWebHistory } from 'vue-router'

import { 
  UnionView,
} from '@/views/index.js'

import SobreNosotrosView from '@/views/SobreNosotrosView.vue'

import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: UnionView,
    },
    {
      path: '/sobre-nosotros',
      name: 'sobre-nosotros',
      component: SobreNosotrosView
    },
  ],
})

export default router
