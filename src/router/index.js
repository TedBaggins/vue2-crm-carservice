import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Login from '@/views/Login.vue';
import Profile from '@/views/Profile.vue';

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
        path: '/profile',
        name: 'Profile',
        component: Profile
    },
    {
        path: '/admin',
        name: 'Admin',
        // lazy-loaded
        component: () => import('@/views/admin/AdminAdmins.vue')
    },
    {
        path: '/admin/admins',
        name: 'AdminAdmins',
        // lazy-loaded
        component: () => import('@/views/admin/AdminAdmins.vue')
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
        path: '/admin/users',
        name: 'AdminUsers',
        // lazy-loaded
        component: () => import('@/views/admin/AdminUsers.vue')
    },
    {
        path: '/manager',
        name: 'Manager',
        // lazy-loaded
        component: () => import('@/views/manager/ManagerClients.vue')
    },
    {
        path: '/manager/clients',
        name: 'ManagerClients',
        // lazy-loaded
        component: () => import('@/views/manager/ManagerClients.vue')
    },
    {
        path: '/manager/client/:clientid',
        name: 'ManagerClient',
        // lazy-loaded
        component: () => import('@/views/manager/ManagerClient.vue')
    },
    {
        path: '/manager/orders',
        name: 'ManagerOrders',
        // lazy-loaded
        component: () => import('@/views/manager/ManagerOrders.vue')
    },
    {
        path: '/manager/order/:orderid',
        name: 'ManagerOrder',
        // lazy-loaded
        component: () => import('@/views/manager/ManagerOrder.vue')
    },
    {
        path: '/manager/services',
        name: 'ManagerServices',
        // lazy-loaded
        component: () => import('@/views/manager/ManagerServices.vue')
    },
    {
        path: '/master',
        name: 'Master',
        // lazy-loaded
        component: () => import('@/views/master/MasterOrders.vue')
    },
    {
        path: '/master/orders',
        name: 'MasterOrders',
        // lazy-loaded
        component: () => import('@/views/master/MasterOrders.vue')
    }
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
