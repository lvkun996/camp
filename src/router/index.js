import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/home'),
    children: [
      {
        path: '/video',
        name: 'video',
        component: () => import('@/views/resource/video')
      },
      {
        path: '/scene',
        name: 'scene',
        component: () => import('@/views/resource/scene')
      },
      {
        path: '/punchCard',
        name: 'punchCard',
        component: () => import('@/views/resource/punchCard')
      },
      {
        path: '/newPunchCard',
        name: 'newPunchCard',
        component: () => import('@/views/resource/punchCard/components/newPunchCard')
      },
      {
        path: '/newVideo',
        name: 'newVideo',
        component: () => import('@/views/resource/video/components/newVideo')
      }
    ]
  }

]

const router = new VueRouter({
  routes
})

export default router
