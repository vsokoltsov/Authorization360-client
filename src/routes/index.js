import VueRouter from 'vue-router'

import { authRoutes } from './auth';
import { usersRoutes } from './users';
import { tokenName } from '../utils/api'

export const router = new VueRouter({
    mode: 'history',
    routes: [
        ...authRoutes,
        ...usersRoutes
    ],
})

router.beforeEach((to, _, next) => {
    const token = localStorage.getItem(tokenName);
    if (!token && !to.path.match(/\/auth/)) {
        next('/auth')
    }
    if (token && to.path.match(/\/auth/)) {
        next('/users/profile')
    }
    next()
})