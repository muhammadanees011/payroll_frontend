<template>
    <!-- company details form -->
  <div class="col-12 md:col-12">
      <div class="card card-w-title">
          <div class="grid">
              <div class="col-12 md:col-8 ">
                  <div class="flex flex-column">
                    <span class="mt-3 lg:text-xl font-medium mb-0" style="color:#1F9A72;">Payment Overview</span>
                      <div class="w-full surface-card py-2 flex flex-column align-items-center" style="border-radius: 53px">

                        <div class="mt-3 w-full flex justify-content-between">
                            <span class="flex flex-column">
                                <p class="text-500 lg:text-md font-medium mb-0 block">Net pay</p>
                            </span>
                            <div class="flex" style="height: 3.5rem; width: 6.5rem;  position: relative;">
                                <p class="text-500 lg:text-md font-medium mb-0 block">{{ formatCurrency(reviewPayrollData.net_pay) }} </p>
                            </div>
                        </div>
                        <div class="w-full flex justify-content-between">
                            <span class="flex flex-column">
                                <p class="text-500 lg:text-md font-medium mb-0 block">Pension</p>
                            </span>
                            <div class="flex" style="height: 3.5rem; width: 6.5rem;  position: relative;">
                                <p class="text-500 lg:text-md font-medium mb-0 block">{{ formatCurrency((reviewPayrollData.employee_pension) + (reviewPayrollData.employer_pension)) }}</p>
                            </div>
                        </div>
                        <div class="w-full flex justify-content-between border-bottom-1">
                            <span class="flex flex-column">
                                <p class="text-500 lg:text-md font-medium mb-0 block">PAYE & NIC</p>
                            </span>
                            <div class="flex" style="height: 3.5rem; width: 6.5rem;  position: relative;">
                                <p class="text-500 lg:text-md font-medium mb-0 block">{{ formatCurrency((reviewPayrollData.employer_nic) + (reviewPayrollData.employee_nic) + (reviewPayrollData.paye_income_tax)) }}</p>
                            </div>
                        </div>

                        <hr>
                        <div class="w-full flex justify-content-between">
                            <span class="mt-1 lg:text-xl font-medium mb-0" style="color:#1F9A72;">Payment breakdown</span>
                        </div>
                        <div class="mt-3 w-full flex justify-content-between">
                            <p class="mt-1 lg:text-xl font-medium mb-0" style="color:#1F9A72;">Additions</p>
                        </div>

                        <div class="mt-3 w-full flex justify-content-between">
                            <span class="flex flex-column">
                                <p class="text-500 lg:text-md font-medium mb-0 block">Base pay</p>
                            </span>
                            <div class="flex" style="height: 3.5rem; width: 6.5rem;  position: relative;">
                                <p class="text-500 lg:text-md font-medium mb-0 block">{{ formatCurrency((reviewPayrollData.base_pay)) }}</p>
                            </div>
                        </div>
                        <div class="w-full flex justify-content-between">
                            <span class="flex flex-column">
                                <p class="text-500 lg:text-md font-medium mb-0 block">Gross additions</p>
                            </span>
                            <div class="flex" style="height: 3.5rem; width: 6.5rem;  position: relative;">
                                <p class="text-500 lg:text-md font-medium mb-0 block">{{ formatCurrency((reviewPayrollData.gross_addition)) }}</p>
                            </div>
                        </div>
                        <div class="w-full flex justify-content-between border-bottom-1">
                            <span class="flex flex-column">
                                <p class="text-500 lg:text-md font-medium mb-0 block">Net additions</p>
                            </span>
                            <div class="flex" style="height: 3.5rem; width: 6.5rem;  position: relative;">
                                <p class="text-500 lg:text-md font-medium mb-0 block">{{ formatCurrency((reviewPayrollData.net_addition)) }}</p>
                            </div>
                        </div>


                        <hr>
                        <div class="mt-3 w-full flex justify-content-between">
                            <p class="mt-1 lg:text-xl font-medium mb-0" style="color:#1F9A72;">Deductions</p>
                        </div>

                        <div class="mt-3 w-full flex justify-content-between">
                            <span class="flex flex-column">
                                <p class="text-500 lg:text-md font-medium mb-0 block">Gross deductions</p>
                            </span>
                            <div class="flex" style="height: 3.5rem; width: 6.5rem;  position: relative;">
                                <p class="text-500 lg:text-md font-medium mb-0 block">{{ formatCurrency((reviewPayrollData.gross_deduction)) }}</p>
                            </div>
                        </div>
                        <div class="w-full flex justify-content-between">
                            <span class="flex flex-column">
                                <p class="text-500 lg:text-md font-medium mb-0 block">Income tax</p>
                            </span>
                            <div class="flex" style="height: 3.5rem; width: 6.5rem;  position: relative;">
                                <p class="text-500 lg:text-md font-medium mb-0 block">{{ formatCurrency((reviewPayrollData.paye_income_tax)) }}</p>
                            </div>
                        </div>
                        <div class="w-full flex justify-content-between">
                            <span class="flex flex-column">
                                <p class="text-500 lg:text-md font-medium mb-0 block">Student loan</p>
                            </span>
                            <div class="flex" style="height: 3.5rem; width: 6.5rem;  position: relative;">
                                <p class="text-500 lg:text-md font-medium mb-0 block">{{ formatCurrency((reviewPayrollData.student_loan)) }}</p>
                            </div>
                        </div>
                        <div class="w-full flex justify-content-between">
                            <span class="flex flex-column">
                                <p class="text-500 lg:text-md font-medium mb-0 block">Postgraduate loan</p>
                            </span>
                            <div class="flex" style="height: 3.5rem; width: 6.5rem;  position: relative;">
                                <p class="text-500 lg:text-md font-medium mb-0 block">{{ formatCurrency((reviewPayrollData.pg_loan)) }}</p>
                            </div>
                        </div>
                        <div class="w-full flex justify-content-between">
                            <span class="flex flex-column">
                                <p class="text-500 lg:text-md font-medium mb-0 block">Employees NIC</p>
                            </span>
                            <div class="flex" style="height: 3.5rem; width: 6.5rem;  position: relative;">
                                <p class="text-500 lg:text-md font-medium mb-0 block">{{ formatCurrency((reviewPayrollData.employee_nic)) }}</p>
                            </div>
                        </div>
                        <div class="w-full flex justify-content-between">
                            <span class="flex flex-column">
                                <p class="text-500 lg:text-md font-medium mb-0 block">Employees pension</p>
                            </span>
                            <div class="flex" style="height: 3.5rem; width: 6.5rem;  position: relative;">
                                <p class="text-500 lg:text-md font-medium mb-0 block">{{ formatCurrency((reviewPayrollData.employer_pension)) }}</p>
                            </div>
                        </div>
                        <div class="w-full flex justify-content-between border-bottom-1">
                            <span class="flex flex-column">
                                <p class="text-500 lg:text-md font-medium mb-0 block">Net deductions</p>
                            </span>
                            <div class="flex" style="height: 3.5rem; width: 6.5rem;  position: relative;">
                                <p class="text-500 lg:text-md font-medium mb-0 block">{{ formatCurrency((reviewPayrollData.net_deduction)) }}</p>
                            </div>
                        </div>

                        <hr>    
                        <div class="mt-3 w-full flex justify-content-between">
                            <span class="flex flex-column">
                                <p class="text-500 lg:text-md font-medium mb-0 block">Employer NIC</p>
                            </span>
                            <div class="flex" style="height: 3.5rem; width: 6.5rem;  position: relative;">
                                <p class="text-500 lg:text-md font-medium mb-0 block">{{ formatCurrency((reviewPayrollData.employer_nic)) }}</p>
                            </div>
                        </div>
                        <div class="w-full flex justify-content-between border-bottom-1">
                            <span class="flex flex-column">
                                <p class="text-500 lg:text-md font-medium mb-0 block">Employer pension</p>
                            </span>
                            <div class="flex" style="height: 3.5rem; width: 6.5rem;  position: relative;">
                                <p class="text-500 lg:text-md font-medium mb-0 block">{{ formatCurrency((reviewPayrollData.employer_pension)) }}</p>
                            </div>
                        </div>

                        <hr>
                        <div class="mt-3 w-full flex justify-content-between">
                            <span class="flex flex-column">
                                <p class="text-500 lg:text-md font-medium mb-0 block">Total payroll cost</p>
                            </span>
                            <div class="flex" style="height: 3.5rem; width: 6.5rem;  position: relative;">
                                <p class="text-500 lg:text-md font-medium mb-0 block">
                                    {{ formatCurrency( 
                                    (reviewPayrollData.net_pay) +
                                    (reviewPayrollData.employer_nic + reviewPayrollData.employee_nic + reviewPayrollData.paye_income_tax)
                                    + (reviewPayrollData.employee_pension + reviewPayrollData.employer_pension)
                                    ) }}</p>
                            </div>
                        </div>


                      </div>
                  </div>
              </div>

              <div class="col-12 md:col-4 ">
                  <div class="flex flex-column" style="background-color: #F8F9FD;">
                      <div class="pb-3 px-4 sm:px-4 flex flex-column" style="border-radius: 53px">
                          <div class=" py-5"> 
                            <span class="flex flex-column">

                                  <span v-if="isSending" class="lg:text-sm font-sm mb-1 block" style="color:#1F9A72;">please wait! sending....</span>
                                  <span v-else @click="sendPayslipAllEmployees()" class="lg:text-sm font-sm mb-1 block" style="color:#1F9A72; text-decoration: underline; cursor: pointer;">Send draft Payslip to all Employees</span>
                                  <br>
                                  <span class="lg:text-xl font-medium mb-1 block" style="color:#1F9A72;">To be transferred</span>
                                  <h4 class="lg:text-lg">{{ formatCurrency((reviewPayrollData.net_pay)) }}</h4>
                                  <span class="lg:text-sm font-medium mb-1 block">This is the total amount you have to pay your employees, the total net pay.</span>
                                  <span class="lg:text-xl font-medium mb-1 block mt-3" style="color:#1F9A72;">View Payments due</span>
                                  <hr>

                                  <span class="lg:text-xl font-medium mb-1 block mt-3" style="color:#1F9A72;">Pension</span>
                                  <h4 class="lg:text-lg">{{ formatCurrency((reviewPayrollData.employee_pension) + (reviewPayrollData.employer_pension)) }}</h4>
                                  <span class="lg:text-sm font-medium mb-1 block">The pension contribution will be collected automatically. It will show in your account as Nuapay Re Collegia.</span>
                                  <hr>

                                  <span class="lg:text-xl font-medium mb-1 block mt-3" style="color:#1F9A72;">Employees</span>
                                  <h4 class="lg:text-lg">{{ reviewPayrollData.employees_count }}</h4>
                                  <span class="lg:text-sm font-medium mb-1 block">The pension contribution will be collected automatically. It will show in your account as Nuapay Re Collegia.</span>

                            </span>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
  </template>
  
  <script>
  import { useAppStore } from '@/stores/appStore';

  export default {
    data() {
      return {
        appStore: useAppStore(),
        isSending:false,
        reasonValues: [
            { name: 'Employement related security', code: 'Mr' },
            { name: 'National payment', code: 'Mrs' },
            { name: 'Reasonable excuse', code: 'Miss' },
            { name: 'Impractical to report work done on the day', code: 'Ms' },
        ],
        reason:'',
        isLateSubmission:'',
        reviewPayrollData:'',
      };
    },
    computed: {
        currentPage() {
        return this.appStore.currentPage;
        }
    },
    mounted(){
        this.getReviewPayroll();
    },
    methods: {

        //---------------SUBMIT PAYROLL----------------
        async submitPayroll(){
            let data={  
                'payroll_id':this.$route.params.payroll_id
            }
            const apiUrl = '/submitPayroll';
            try {
            let response=await this.$axios.post(apiUrl,data);
            return
            await this.savePayrollEmployeesYTD();
            } catch (error) {
            let errors=error.response.data.errors
            }
        },

        //---------------SAVE YTD PAYROLL----------------
        async savePayrollEmployeesYTD(){
            let data={  
                'payschedule_id':this.$route.params.payschedule_id
            }
            const apiUrl = '/savePayrollEmployeesYTD';
            try {
            let response=await this.$axios.post(apiUrl,data);
            } catch (error) {
            let errors=error.response.data.errors
            }
        },

        //---------------GET REVIEW PAYROLL--------------   
        async getReviewPayroll(){
            let payrollstatus=this.currentPage =='archived' ? 'archived' :'history';
            let data={
                'payroll_id':this.$route.params.payroll_id,
                'payroll_status':payrollstatus
            }
            const apiUrl = '/reviewPayroll/';
            try {
            let response=await this.$axios.post(apiUrl,data);
            this.reviewPayrollData = response.data
            } catch (error) {
            let errors=error.response.data.errors
            }
        },

        //---------------FORMAT THE CURRENCY--------------           
        formatCurrency(value) {
          if(value !== null && value !== undefined){
            return value.toLocaleString('en-US', {
              style: 'currency',
              currency: 'GBP',
            });
          }
        },

        //---------------SEND PAYSLIPS TO ALL EMPLOYEES--------------           
        async sendPayslipAllEmployees(){
            this.isSending=true
            let data={
                'payschedule_id':this.$route.params.payschedule_id,
                'payroll_id':this.$route.params.payroll_id,
            }
            const apiUrl = `/sendPayslipAllEmployees`;
            try {
            let response=await this.$axios.post(apiUrl,data);
            this.isSending=false
            this.$showToast('success','Payslips sent cessfully.');
            } catch (error) {
            this.isSending=true
            this.$showToast('error','Something went wrong.');
            let errors=error.response.data.errors
            console.log('errors',errors)
            }
        },
 

    }
  }
  </script>
  
  <style scoped>
  
  /* Style the dropdown container */
  .dropdown {
      display: inline-block;
      margin-top: -10px;
      position: absolute;
      right: 10px
  }
  
  /* Style the button with three vertical dots */
  .dropdown-btn {
      background-color: transparent;
      border: none;
      font-size: 24px;  /* Adjust the size for the dots */
      cursor: pointer;
      padding: 5px;
  }
  
  /* Hide the dropdown content by default */
  .dropdown-content {
      display: none;
      position: absolute;
      right: 0;
      background-color: #f1f1f1;
      min-width: 100px;
      box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
      z-index: 1;
  }
  
  /* Style links inside the dropdown */
  .dropdown-content a {
      color: black;
      padding: 10px 16px;
      text-decoration: none;
      display: block;
  }
  
  /* Change color on hover */
  .dropdown-content a:hover {
      background-color: #ddd;
  }
  
  /* Show the dropdown content when the button is clicked */
  .dropdown:hover .dropdown-content {
      display: block;
  }
  
  
  </style>