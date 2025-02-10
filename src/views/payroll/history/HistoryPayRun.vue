<template>
    <div class="col-12 md:col-12">
      <div class="card card-w-title">
        <h5>Pay Date: {{ payrollDetail.pay_date }} <Tag class="ms-2">{{currentPage =='archived' ? 'Archived' :'History'}}</Tag></h5>
        <p>Tax Period: {{ payrollDetail.tax_period }}</p>
        <TabMenu :model="nestedRouteItems" @click="tabHandler" ref="tabMenu" />
        <router-view />
      </div>
    </div>
  </template>
  
  <script>
  import { useAppStore } from '@/stores/appStore';

  export default {
    mounted() {
      this.setActiveTab();
      this.getPayrollDetail();
    },
    data() {
      return {
        appStore: useAppStore(),
        payrollDetail:'',
        recordID: null,
        nestedRouteItems: [
          { label: 'Payroll Salaried Employees', to: '/payroll-salaried-employees/:payschedule_id/:payroll_id' },
          { label: 'Payroll Hourly Employees', to: '/payroll-hourly-employees/:payschedule_id/:payroll_id' },
          { label: 'Payroll Review', to: '/payroll-review/:payschedule_id/:payroll_id' }
        ]
      };
    },
    computed: {
      currentPage() {
        return this.appStore.currentPage;
      },
      // Dynamically determine the active tab index based on the current route path
      activeTabIndex() {
        const currentRoutePath = this.$route.path.split('?')[0]; // Remove query params
        return this.nestedRouteItems.findIndex(item => {
          const routePattern = new RegExp('^' + item.to.replace(/:\w+/g, '\\w+') + '$');
          return routePattern.test(currentRoutePath);
        });
      }
    },
    watch: {
      // Watch route changes and update the active tab accordingly
      '$route.path'(newPath) {
        this.setActiveTab();
      }
    },
    methods: {

    async getPayrollDetail(){
      let data={
          'payroll_id':this.$route.params.payroll_id
      }
      const apiUrl = '/getPayrollDetail/';
      try {
      let response=await this.$axios.post(apiUrl,data);
      this.payrollDetail = response.data
      } catch (error) {
      let errors=error.response.data.errors
      }
    },

    // Method to handle tab click and route navigation
    tabHandler(data) {
        const employeeID = this.$route.params.id;
        const clickedTabIndex = this.nestedRouteItems.findIndex(item => item.label === data.target.innerText);

        // Only allow navigation to the next tab (forward) and prevent navigating back
        // if (clickedTabIndex < this.activeTabIndex) {
            // Proceed with navigation to the next tab
            const routeName = this.removeSpaceBetweenWords(data.target.innerText);
            this.$router.push({ name: routeName, params: { id: employeeID } });
        // }
        this.setActiveTab()
        },

    // Remove spaces between words in tab names
    removeSpaceBetweenWords(str) {
        return str.replace(/(\w)\s+(\w)/g, '$1$2');
    },
  
    // Set the active tab manually by adding the class 'p-highlight'
    setActiveTab() {
        // First, remove the 'p-highlight' class and reset `data-p-highlight` attribute on all tabs
        const tabs = this.$refs.tabMenu.$el.querySelectorAll('.p-tabmenuitem');
        tabs.forEach(tab => {
            tab.classList.remove('p-highlight');
            tab.setAttribute('data-p-highlight', false);
        });

        // Find the active tab by the current route
        const activeTab = this.nestedRouteItems[this.activeTabIndex];
        if (activeTab) {
            const activeTabElement = Array.from(tabs).find(tab => {
            return tab.querySelector('.p-menuitem-text').textContent === activeTab.label;
            });

            if (activeTabElement) {
            activeTabElement.classList.add('p-highlight');
            activeTabElement.setAttribute('data-p-highlight', true);
            }
        }
    }



    },
  };
  </script>
  
  <style scoped lang="scss">
  /* Style for the active tab */
  .p-tabmenuitem.p-highlight {
    background-color: #007bff;
    color: white;
  }
  ::v-deep .p-tabmenu-nav{
    border: 1px !important;
  }
  </style>
  