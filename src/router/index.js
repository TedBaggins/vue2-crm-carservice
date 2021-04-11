import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Login from '@/views/Login.vue';

Vue.use(VueRouter)

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/admin',
        name: 'Admin',
        // lazy-loaded
        component: () => import('@/views/admin/Admin.vue')
    },
    {
        path: '/admin/admins',
        name: 'AdminAdmins',
        // lazy-loaded
        component: () => import('@/views/admin/Admin.vue')
    },
    {
        path: '/admin/managers',
        name: 'AdminManagers',
        // lazy-loaded
        component: () => import('@/views/admin/AdminManagers.vue')
    },
    {
        path: '/admin/masters',
        name: 'AdminMasters',
        // lazy-loaded
        component: () => import('@/views/admin/AdminMasters.vue')
    },
    {
        path: '/admin/services',
        name: 'AdminServices',
        // lazy-loaded
        component: () => import('@/views/admin/AdminServices.vue')
    },
    {
        path: '/manager',
        name: 'Manager',
        // lazy-loaded
        component: () => import('@/views/manager/Manager.vue')
    },
    {
        path: '/master',
        name: 'Master',
        // lazy-loaded
        component: () => import('@/views/master/Master.vue')
    },
]

const router = new VueRouter({
    mode: 'history',
    routes
})

router.beforeEach((to, from, next) => {
    const publicPages = ['/login', '/home'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('user');

    // trying to access a restricted page + not logged in
    // redirect to login page
    if (authRequired && !loggedIn) {
        next('/login');
    } else {
        next();
    }
});

export default router;
