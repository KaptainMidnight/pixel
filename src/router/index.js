import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: () => import('@/views/Home')
    },
    {
      path: '/login',
      component: () => import('@/views/Login')
    },
    {
      path: '/signup',
      component: () => import('@/views/Signup')
    },
    {
      path: '/profile',
      component: () => import('@/views/Profile')
    }
  ]
})