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
        path: '/resource',
        name: 'resource',
        component: () => import('@/views/resource/home'),
        children: [
          {
            path: '/video',
            name: 'videoHome',
            component: () => import('@/views/resource/video'),
            children: [
              {
                path: '/',
                name: 'video',
                component: () => import('@/views/resource/video/components/home.vue')
              },
              {
                path: '/newVideo',
                name: 'newVideo',
                component: () => import('@/views/resource/video/components/newVideo')
              }
            ]
          },
          {
            path: '/scene',
            name: 'scene',
            component: () => import('@/views/resource/scene')
          },
          {
            path: '/punchCard',
            name: 'punchCardHome',
            component: () => import('@/views/resource/punchCard'),
            children: [
              {
                path: '/',
                name: 'punchCard',
                component: () => import('@/views/resource/punchCard/components/home.vue')
              },
              {
                path: '/newPunchCard',
                name: 'newPunchCard',
                component: () => import('@/views/resource/punchCard/components/newPunchCard')
              }
            ]
          }
        ]
      },
      {
        path: '/trainning',
        name: 'trainning',
        component: () => import('@/views/training'),
        children: [
          {
            path: '/drill',
            name: 'drill',
            component: () => import('@/views/training/components/drill')
          },
          {
            path: '/addDrill',
            name: 'addDrill',
            component: () => import('@/views/training/components/addDrill')
          }
        ]
      }
    ]
  }

]

const router = new VueRouter({
  routes
})

export default router
