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
            path: '/picture',
            name: 'pictureHome',
            component: () => import('@/views/resource/picture'),
            children: [
              {
                path: '/',
                name: 'picture',
                component: () => import('@/views/resource/picture/components/home.vue')
              },
              {
                path: '/addOrEditPic',
                name: 'addOrEditPic',
                component: () => import('@/views/resource/picture/components/addOrEditPic.vue')
              }
            ]
          },
          {
            path: '/text',
            name: 'textHome',
            component: () => import('@/views/resource/content'),
            children: [
              {
                path: '/',
                name: 'text',
                component: () => import('@/views/resource/content/components/home.vue')
              },
              {
                path: '/addOrEditContent',
                name: 'addOrEditContent',
                component: () => import('@/views/resource/content/components/addOrEditContent.vue')
              }
            ]
          },
          {
            path: '/scene',
            name: 'scene',
            component: () => import('@/views/resource/scene'),
            children: [
              {
                path: '/',
                name: 'sceneFlow',
                component: () => import('@/views/resource/scene/components/home')
              },
              {
                path: '/addScene',
                name: 'addScene',
                component: () => import('@/views/resource/scene/components/addScene.vue')
              },
              {
                path: '/addClass',
                name: 'addClass',
                component: () => import('@/views/resource/scene/components/addClass.vue')
              },
              {
                path: '/detailInfo',
                name: 'detailInfo',
                component: () => import('@/views/resource/scene/components/detailInfo.vue')
              }
            ]
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
            component: () => import('@/views/training/components/drill'),
            props: true
          },
          {
            path: '/addDrill',
            name: 'addDrill',
            component: () => import('@/views/training/components/addDrill')
          },
          {
            path: '/resourceDrill',
            name: 'resourceDrill',
            component: () => import('@/views/training/components/resourceDrill')
          },
          {
            path: '/newPeriods',
            name: 'newPeriods',
            component: () => import('@/views/training/components/addPeriods.vue')
          },
          {
            path: '/editDrill',
            name: 'editDrill',
            component: () => import('@/views/training/components/editDrill.vue')
          }
        ]
      },
      {
        path: '/class',
        name: 'class',
        component: () => import('@/views/class'),
        children: [
          {
            path: 'list',
            name: 'ClassList',
            component: () => import('@/views/class/list'),
            props: true
          },
          {
            path: 'check',
            name: 'ClassCheck',
            component: () => import('@/views/class/check'),
            props: true
          },
          {
            path: 'check/comment',
            name: 'CheckComment',
            component: () => import('@/views/class/CheckComment'),
            props: true
          },
          {
            path: 'check/comment/detail',
            name: 'CommentDetail',
            component: () => import('@/views/class/CommentDetail'),
            props: true
          },
        ]
      },
      {
        path: '/teach',
        name: 'Teach',
        component: () => import('@/views/teach'),
        children: [
          {
            path: 'list',
            name: 'TeachList',
            component: () => import('@/views/teach/list'),
            props: true
          },
        ]
      }
    ]
  }

]

const router = new VueRouter({
  routes
})

export default router
