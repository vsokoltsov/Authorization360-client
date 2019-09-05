import AuthPage from '../components/Authorization/AuthPage.vue'
import SignIn from '../components/Authorization/SignIn.vue'
import SignUp from '../components/Authorization/SignUp.vue'

export const authRoutes = [
    { 
        path: '/auth', 
        component: AuthPage, 
        redirect: '/auth/sign-in',
        children: [
            { path: 'sign-in', name: 'sign-in', meta: { layout: 'authorization' }, component: SignIn },
            { path: 'sign-up', name: 'sign-up', meta: { layout: 'authorization' }, component: SignUp }
        ]
    }
]