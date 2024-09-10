<script setup>
import { ref } from 'vue';

import AppMenuItem from './AppMenuItem.vue';

const model = ref([
    {
        label: 'Home',
        items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-th-large', to: '/' }]
    },
    {
      label: 'Pages',
      icon: 'pi pi-fw pi-briefcase',
      to: '/pages',
      items: [

      {
          label: 'Home (upcoming)',
          icon: 'pi pi-fw pi-home',
      },

      {
          label: 'Payroll',
          icon: 'pi pi-fw pi-money-bill',
          items: [
            {
              label: 'Active',
              icon: 'pi pi-fw pi-circle',
              to: '/payroll-active'
            },
            {
              label: 'History',
              icon: 'pi pi-fw pi-circle',
              to: '/payroll-history'
            },
            {
              label: 'Archived',
              icon: 'pi pi-fw pi-circle',
              to: '/payroll-archived'
            }
          ]
      },

      {
          label: 'Company',
          icon: 'pi pi-fw pi-building',
          items: [
            {
              label: 'Create',
              icon: 'pi pi-fw pi-circle',
              to: '/create-company'
            },
            {
              label: 'Details',
              icon: 'pi pi-fw pi-circle',
              to: '/company-details'
            },
            {
              label: 'Allowances',
              icon: 'pi pi-fw pi-circle',
              to: '/company-allowance'
            },
            {
              label: 'Pay Items',
              icon: 'pi pi-fw pi-circle',
              to: '/company-payitems'
            },
            
            {
              label: 'Pay Schedules',
              icon: 'pi pi-fw pi-circle',
              to: '/company-pay-schedules'
            },
            
            {
              label: 'Statutory',
              icon: 'pi pi-fw pi-circle',
              to: '/company-statutory'
            },
            
            {
              label: 'Salaries',
              icon: 'pi pi-fw pi-circle',
              to: '/company-salaries'
            },
          ]
      },

      {
          label: 'HMRC',
          icon: 'pi pi-fw pi-briefcase',
          to: '/company-hmrc'
      },

      {
          label: 'Auto Enrollment (upcoming)',
          icon: 'pi pi-fw pi-id-card',
      },

      {
        label: 'People',
        icon: 'pi pi-fw pi-users',
        to: '/employees',
      },
      {
        label: 'Reports',
        icon: 'pi pi-fw pi-file',
        to: '/company-reports',
      },
        // {
        //   label: 'Crud',
        //   icon: 'pi pi-fw pi-pencil',
        //   to: '/pages/crud'
        // },
        // {
        //   label: 'Timeline',
        //   icon: 'pi pi-fw pi-calendar',
        //   to: '/pages/timeline'
        // },
        // {
        //   label: 'Not Found',
        //   icon: 'pi pi-fw pi-exclamation-circle',
        //   to: '/pages/notfound'
        // },
        // {
        //   label: 'Empty',
        //   icon: 'pi pi-fw pi-circle-off',
        //   to: '/pages/empty'
        // }
      ]
    },
]);
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
<!--        <li>-->
<!--            <a href="https://www.primefaces.org/primeblocks-vue/#/" target="_blank">-->
<!--                <img src="/layout/images/banner-primeblocks.png" alt="Prime Blocks" class="w-full mt-3" />-->
<!--            </a>-->
<!--        </li>-->
    </ul>
</template>

<style lang="scss" scoped>
::v-deep .pi-circle {
    font-size: 7px !important; /* Adjust as needed */
}
</style>
