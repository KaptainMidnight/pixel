import Vue from 'vue'
import Router from "vue-router"

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: () => import('@/views/Home')
        },
        {
            path: '/login',
            component: () => import('@/components/Login')
        },
        {
            path: '/signup',
            component: () => import('@/components/Signup')
        },
        {
            path: '/profile',
            component: () => import('@/views/Profile')
        },
        {
            path: '/edit',
            component: () => import('@/views/Edit')
        },
        {
            path: '/forgot',
            component: () => import('@/views/Forgot')
        }
    ]
})