import { createRouter, createWebHistory } from 'vue-router'
import IndexView from '../views/HomeView.vue'
import Layout from '../layout/index.vue'
import { HOME_PAGE_NAME } from '@/constant/common'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/' + HOME_PAGE_NAME,
      component: Layout,
      children: [
        {
          path: '/' + HOME_PAGE_NAME,
          name: HOME_PAGE_NAME,
          component: IndexView,
        }
      ]
    },
    {
      path: '/api',
      name: 'api',
      component: () => import('../views/ApiView.vue')
    },
    {
      path: '/user',
      name: 'user',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/UserView.vue')
    }
  ]
})

export default router
