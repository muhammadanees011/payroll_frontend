import { createRouter, createWebHistory } from 'vue-router';
import AppLayout from '@/layout/AppLayout.vue';


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: AppLayout,
            meta: {
                title: 'Company',
                requiresAuth: true,
            },
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
                            path: '/company-payitems-create',
                            name: 'company-create-payitems',
                            component: () => import('@/views/company/PayItems/CreatePayItem.vue')
                        },
                        {
                            path: '/company-payitems-edit/:id',
                            name: 'company-edit-payitems',
                            component: () => import('@/views/company/PayItems/EditPayItem.vue')
                        },
                        {
                            path: '/company-pay-schedules',
                            name: 'company-pay-schedules',
                            component: () => import('@/views/company/PaySchedule/index.vue')
                        },
                        {
                            path: '/company-create-pay-schedules',
                            name: 'company-create-pay-schedules',
                            component: () => import('@/views/company/PaySchedule/CreatePaySchedule.vue')
                        },
                        {
                            path: '/company-edit-pay-schedules/:id',
                            name: 'company-edit-pay-schedules',
                            component: () => import('@/views/company/PaySchedule/EditPaySchedule.vue')
                        },
                        {
                            path: '/company-statutory',
                            name: 'company-statutory',
                            component: () => import('@/views/company/statutory.vue')
                        },
                        {
                            path: '/company-salaries',
                            name: 'company-salaries',
                            component: () => import('@/views/company/Salaries/index.vue')
                        },
                        {
                            path: '/company-create-salaries',
                            name: 'company-create-salaries',
                            component: () => import('@/views/company/Salaries/CreateSalary.vue')
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
                            path: '/run-payroll/:id',
                            name: 'RunPayroll',
                            component: () => import('@/views/payroll/payrun/payrun.vue'),
                            children: [
                                {
                                    path: '/salaried-employees/:payschedule_id/:payroll_id',
                                    name: 'SalariedEmployees',
                                    component: () => import('@/views/payroll/payrun/SalariedEmployees.vue'),
                                },
                                {
                                    path: '/input-hours/:payschedule_id/:payroll_id',
                                    name: 'InputHours',
                                    component: () => import('@/views/payroll/payrun/InputHours.vue'),
                                },
                                {
                                    path: '/hourly-employees/:payschedule_id/:payroll_id',
                                    name: 'HourlyEmployees',
                                    component: () => import('@/views/payroll/payrun/HourlyEmployees.vue'),
                                },
                            ]
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
                    name: 'employees',
                    component: () => import('@/views/employees/index.vue')
                },
                {
                    path: '/employees/add/:employee_id?/:step?',
                    name: 'AddEmployee',
                    component: () => import('@/views/employees/add/index.vue')
                },
                {
                    path: '/employees/record/:id',
                    name: 'EmployeeRecord',
                    component: () => import('@/views/employees/edit/index.vue'),
                    children: [
                        {
                            path: '/employees/general/:id',
                            name: 'General',
                            component: () => import('@/views/employees/edit/general.vue'),
                        },
                        {
                            path: '/employees/salary/:id',
                            name: 'Salary',
                            component: () => import('@/views/employees/edit/salary.vue'),
                        },
                        {
                            path: '/employees/taxes/:id',
                            name: 'Taxes',
                            component: () => import('@/views/employees/edit/taxes.vue'),
                        },
                        {
                            path: '/employees/pension/:id',
                            name: 'Pension',
                            component: () => import('@/views/employees/edit/pension.vue'),
                        },
                        {
                            path: '/employees/payslips/:id',
                            name: 'Payslips',
                            component: () => import('@/views/employees/edit/general.vue'),
                        },
                        {
                            path: '/employees/paternity-leaves/:id',
                            name: 'PaternityLeaves',
                            component: () => import('@/views/employees/edit/paternity.vue'),
                        },
                        {
                            path: '/employees/year-to-dates/:id',
                            name: 'YearToDates',
                            component: () => import('@/views/employees/edit/YTD.vue'),
                        },
                        {
                            path: '/employees/sick-leave/:id',
                            name: 'SickLeave',
                            component: () => import('@/views/employees/edit/SickLeave.vue'),
                        },
                        {
                            path: '/employees/bank-details/:id',
                            name: 'BankDetails',
                            component: () => import('@/views/employees/edit/BankDetails.vue'),
                        },
                        {
                            path: '/employees/student-loans/:id',
                            name: 'StudentLoans',
                            component: () => import('@/views/employees/edit/StudentLoans.vue'),
                        },
                    ]
                },
            ]
        },
        // {
        //     path: '/landing',
        //     name: 'landing',
        //     component: () => import('@/views/pages/Landing.vue')
        // },
        {
            path: '/register',
            name: 'register',
            component: () => import('@/views/pages/auth/Register.vue')
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('@/views/pages/auth/Login.vue')
        },
        {
            path: '/verify-email/:email',
            name: 'VerifyEmail',
            component: () => import('@/views/pages/auth/EmailVerification.vue')
        },
        {
            path: '/forget-password',
            name: 'ForgetPassword',
            component: () => import('@/views/pages/auth/ForgetPassword.vue')
        },
        {
            path: '/forget-password-code/:email',
            name: 'ForgetPasswordCode',
            component: () => import('@/views/pages/auth/ForgetPasswordCode.vue')
        },
        {
            path: '/reset-password/:email',
            name: 'ResetPassword',
            component: () => import('@/views/pages/auth/ResetPassword.vue')
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


router.beforeEach((to, from, next) => {
    document.title = to.meta.title || 'XEPayroll'
    if (to.meta.requiresAuth && !localStorage.getItem('token')) {
        next({ name: 'login' })
    } else if (localStorage.getItem('token') && (to.name === 'login' || to.name === 'Register')) {
        next({ name: 'Dashboard' })
    } else {
        next()
    }
})

export default router;
