import { createRouter, createWebHistory } from 'vue-router'

import { 
  UnionView,
  InterseccionView,
  DiferenciaView,
  ComplementoView,
} from '@/views/index.js'

import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/conjuntos',
      name: 'conjuntos',
      children: [
        {
          path: "union",
          name: 'conjuntos-union',
          component: UnionView,
        },
        {
          path: "interseccion",
          name: 'conjuntos-interseccion',
          component: InterseccionView,
        },
        {
          path: "diferencia",
          name: 'conjuntos-diferencia',
          component: DiferenciaView,
        },
        {
          path: "complemento",
          name: 'conjuntos-complemento',
          component: ComplementoView,
        },
      ]
    },
  ],
})

export default router
