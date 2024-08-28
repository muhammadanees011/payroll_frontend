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
                    path: '/create-company',
                    name: 'create-company',
                    component: () => import('@/views/company/CreateCompany/create.vue')
                },
                {
                    path: '/company',
                    name: 'company',
                    children: [
                        {
                            path: '/company-details',
                            name: 'company-details',
                            component: () => import('@/views/company/details.vue')
                        },
                        {
                            path: '/company-allowance',
                            name: 'company-allowance',
                            component: () => import('@/views/company/allowances.vue')
                        },
                        {
                            path: '/company-payitems',
                            name: 'company-payitems',
                            component: () => import('@/views/company/PayItems/payitems.vue')
                        },
                        {
                            path: '/company-create-payitems',
                            name: 'company-create-payitems',
                            component: () => import('@/views/company/PayItems/CreatePayItem.vue')
                        },
                        {
                            path: '/company-pay-schedules',
                            name: 'company-pay-schedules',
                            component: () => import('@/views/company/PaySchedule/index.vue')
                        },
                        {
                            path: '/company-statutory',
                            name: 'company-statutory',
                            component: () => import('@/views/company/statutory.vue')
                        },
                        {
                            path: '/company-salaries',
                            name: 'company-salaries',
                            component: () => import('@/views/company/salaries.vue')
                        },
                        {
                            path: '/company-hmrc',
                            name: 'company-hmrc',
                            component: () => import('@/views/company/hmrc.vue')
                        },
                        {
                            path: '/company-reports',
                            name: 'company-reports',
                            component: () => import('@/views/company/reports/index.vue')
                        },
                        {
                            path: '/company-fps',
                            name: 'company-fps',
                            component: () => import('@/views/company/reports/fps.vue')
                        },
                        {
                            path: '/company-eps',
                            name: 'company-eps',
                            component: () => import('@/views/company/reports/eps.vue')
                        },
                    ]

                },
                {
                    path: '/payroll',
                    name: 'payroll',
                    children: [
                        {
                            path: '/payroll-active',
                            name: 'payroll-active',
                            component: () => import('@/views/payroll/active.vue'),
                        },
                        {
                            path: '/payroll-history',
                            name: 'payroll-history',
                            component: () => import('@/views/payroll/history.vue'),
                        },
                        {
                            path: '/payroll-archived',
                            name: 'payroll-archived',
                            component: () => import('@/views/payroll/archived.vue'),
                        }
                    ]
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
