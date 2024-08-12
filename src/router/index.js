import { createRouter, createWebHistory } from 'vue-router';
import AppLayout from '@/layout/AppLayout.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: AppLayout,
            children: [
                {
                    path: '/',
                    name: 'dashboard',
                    component: () => import('@/views/Dashboard.vue')
                },
                {
                    path: '/create-company-details',
                    name: 'create-company-details',
                    component: () => import('@/views/company/CreateCompanyDetails.vue')
                },
                {
                    path: '/employees',
                    name: 'notfound',
                    component: () => import('@/views/employees/index.vue')
                },
                {
                    path: '/employees/add',
                    name: 'AddEmployee',
                    component: () => import('@/views/employees/add/index.vue')
                },
                {
                    path: '/personal/details',
                    name: 'PersonalDetails',
                    component: () => import('@/views/employees/personal/index.vue')
                },

                {
                    path: '/employees/add',
                    name: 'AddEmployee',
                    component: () => import('@/views/employees/add/index.vue'),
                    children: [
                        {
                            path: '/employees/add',
                            component: () => import('@/views/employees/personal/index.vue')
                        },
                    ]
                },
                {
                    path: '/employees/add',
                    name: 'AddEmployee',
                    component: () => import('@/views/employees/add/index.vue'),
                },
                {
                    path: '/employees/personal',
                    component: () => import('@/views/employees/personal/index.vue')
                },
                {
                    path: '/employees/EmploymentDetails',
                    component: () => import('@/views/employees/EmploymentDetails/index.vue')
                },
            ]
        },
        {
            path: '/landing',
            name: 'landing',
            component: () => import('@/views/pages/Landing.vue')
        },


        {
            path: '/auth/login',
            name: 'login',
            component: () => import('@/views/pages/auth/Login.vue')
        },
        {
            path: '/auth/access',
            name: 'accessDenied',
            component: () => import('@/views/pages/auth/Access.vue')
        },
        {
            path: '/auth/error',
            name: 'error',
            component: () => import('@/views/pages/auth/Error.vue')
        }
    ]
});

export default router;
