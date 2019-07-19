import VueRouter from 'vue-router'

import { authRoutes } from './auth';
import { usersRoutes } from './users';

export const router = new VueRouter({
    mode: 'history',
    routes: [
        ...authRoutes,
        ...usersRoutes
    ],
})

router.beforeEach((to, _, next) => {
    if (!localStorage.getItem('auth360token') && !to.path.match(/\/auth/)) {
        next('/auth')
    }
    next()
})