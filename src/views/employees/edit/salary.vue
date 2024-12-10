<template>
    <!-- company details form -->
  <div class="col-12 md:col-12">
      <div class="card card-w-title">
          <div class="grid">
              <div class="col-12 md:col-6 ">
                  <div class="flex flex-column align-items-center justify-content-center">
                    <span class="mt-3 lg:text-xl font-medium mb-0" style="color:#1F9A72;">Modify employee pay schedule
                        and Define employee base salary</span>
                      <div class="w-full surface-card py-8 px-5 sm:px-8 flex flex-column align-items-center" style="border-radius: 53px">

                            <div v-if="paySchedule" class="w-full flex justify-content-between py-3 border-300 border-bottom-1 border-top-1 border-left-1 border-right-1">
                                <span class="ml-4 mt-3 flex flex-column">
                                    <h3 class="text-900 lg:text-xl font-medium mb-0 block">{{ paySchedule.name }}</h3>
                                </span>
                                <div class="mt-4 flex" style="height: 3.5rem; width: 6.5rem;  position: relative;">                                    
                                    <div class="dropdown ml-2">
                                        <button @click="openPayScheduleDialog()" class="dropdown-btn">⋮</button>
                                    </div>

                                </div>
                            </div>

                            <div v-if="employeeSalary" class="mt-3 w-full flex justify-content-between py-3 border-300 border-bottom-1 border-top-1 border-left-1 border-right-1">
                                <span class="ml-4 mt-3 flex flex-column">
                                    <h3  v-if="employeeSalary.salary_type=='Hourly'"  class="text-900 lg:text-xl font-medium mb-0 block">Hourly</h3>
                                    <h3  v-if="employeeSalary.salary_type=='Salaried'"  class="text-900 lg:text-xl font-medium mb-0 block">Salaried</h3>

                                    <span v-if="employeeSalary.salary_type=='Hourly'" class="text-500 lg:text-sm">Rate per Hour</span>
                                    <span v-if="employeeSalary.salary_type=='Salaried'" class="text-500 lg:text-sm">Yearly</span>
                                </span>
                                <div class="mt-4 flex" style="height: 3.5rem; width: 6.5rem;  position: relative;">
                                    <h3 v-if="employeeSalary.salary_type=='Salaried'" class="text-900 lg:text-xl font-medium mb-0 block">£{{ employeeSalary.anual_salary }}</h3>
                                    <h3 v-if="employeeSalary.salary_type=='Hourly'" class="text-900 lg:text-xl font-medium mb-0 block">£{{ employeeSalary.hourly_equivalent }}</h3>

                                    <div class="dropdown ml-2">
                                        <button @click="openSalaryDialog()" class="dropdown-btn">⋮</button>
                                    </div>

                                </div>
                            </div>
                          <br>
                      </div>
                  </div>
              </div>

              
            <Dialog v-model:visible="payScheduleDialog" :style="{ width: '450px' }" header="Change pay schedule" :modal="true" class="p-fluid">

                <div class="field">

                    <div class="field">
                        <label for="Forename">Pay Schedule*</label>
                        <Dropdown v-model="selectedPaySchedule" :options="paySchedules" optionLabel="name" placeholder="Select" style="width:100%;height:45px;"  />
                    </div>

                </div>

                <div>
                    <P style="background-color: #F5BEBB;border-radius: 5px;" class="p-3">
                        <Tag class="mr-2" icon="pi pi-info-circle" severity="danger" value=""> </Tag>
                        Are you sure you want to change this employee's pay schedule? If you proceed, 
                        the employee will be moved to the new pay schedule, and you will be responsible for ensuring
                        that there are no overpayments or underpayments.
                    </P>
                </div>

                <template #footer>
                    <Button label="Cancel" icon="pi pi-times" text="" @click="closePayScheduleDialog()" />
                    <Button label="Save" icon="pi pi-check" text="" @click="updateEmployeePaySchedule()" />
                </template>
            </Dialog>

            <Dialog v-model:visible="salaryDialog" :style="{ width: '650px' }" header="Edit salary" :modal="true" class="p-fluid">

                    <div class="field">
                        <label for="Forename">Salary Type*</label>
                        <Dropdown v-model="details.salary_type" :options="salaryTypes" optionLabel="name" placeholder="Select" style="width:100%;height:45px;"  />
                    </div>
                    <template v-if='details.salary_type.code=="Monthly"'>
                        <div class="field">
                            <label >Annual Salary*</label>
                            <InputText class="mt-1"  v-model="details.anual_salary" type="number" style="width:100%;height:45px;" />
                        </div>
                        <div class="grid">
                            <div class="field col-6">
                                <label >Monthly Salary*</label>
                                <InputText class="mt-1"  v-model="details.monthly_salary" type="number" style="width:100%;height:45px;" />
                            </div>
                            <div class="field col-6">
                                <label >Weekly Salary*</label>
                                <InputText class="mt-1"  v-model="details.weekly_salary" type="number" style="width:100%;height:45px;" />
                            </div>
                        </div>
                    </template>
                    <div class="grid">
                        <div class="field col-6">
                            <label >Hourly salary*</label>
                            <InputText class="mt-1" v-model="details.hourly_equivalent" type="number" style="width:100%;height:45px;" />
                        </div>
                        <div class="field col-6">
                            <label >Expected work hours per week*</label>
                            <InputText  class="mt-1"  v-model="details.expected_work_hours_per_week" type="number" style="width:100%;height:45px;" />
                        </div>
                    </div>

                <template #footer>
                    <Button label="Cancel" icon="pi pi-times" text="" @click="closeSalaryDialog()" />
                    <Button label="Save" icon="pi pi-check" text="" @click="updateEmployeeSalary()" />
                </template>
            </Dialog>


              <div class="col-12 md:col-6 ">
                  <div class="flex flex-column align-items-center justify-content-center">
                      <div class="w-full surface-card mt-4 pt-8 pb-3 px-5 sm:px-8 flex flex-column align-items-center" style="border-radius: 53px">
                          <div class="w-full flex align-items-center py-5 border-300 border-bottom-1"> 
                            <span class="ml-4 flex flex-column">
                                  <span class="lg:text-xl font-medium mb-1 block" style="color:#1F9A72;">Pay Schedule</span>
                                  <span class="lg:text-sm">The pay schedule refers to the frequency and timing with which you will pay this employee.</span>
                            </span>
                          </div>
                      </div>
                      <div class="w-full surface-card px-5 sm:px-8 flex flex-column align-items-center" style="border-radius: 53px">
                          <div class="w-full flex align-items-center py-5 border-300 border-bottom-1"> 
                            <span class="ml-4 flex flex-column">
                                  <span class="lg:text-xl font-medium mb-1 block" style="color:#1F9A72;">Salaried</span>
                                  <span class="lg:text-sm">Set up Company specific salaries and choose if they should be calculated on hours or units.</span>
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
  export default {
    data() {
      return {
        salaryTypes: [
            { name: 'Hourly', code: 'Hourly' },
            { name: 'Salaried', code: 'Salaried' }
        ],

        paySchedules:'',
        employeeSalary:'',
        paySchedule:'',
        selectedPaySchedule:'',
        payScheduleDialog:false,
        salaryDialog:false,
        salaries:'',

        details:{
            salary_type:'',
            anual_salary:'',
            monthly_salary:'',
            weekly_salary:'',
            expected_work_hours_per_week:'',
            hourly_equivalent:'',
        },

      };
    },
    mounted(){
      this.getEmployeePaySchedule();
    },
    methods: {
  
        addPayItems(){
            this.$router.push({ name: 'company-create-salaries' });
        },

        openPayScheduleDialog(){
            this.payScheduleDialog=true
            this.getPaymentSchedules()
        },

        closePayScheduleDialog(){
            this.payScheduleDialog=false
            this.selectedPaySchedule = {'name':this.paySchedule.name, 'code':this.paySchedule.id}
        },

        openSalaryDialog(){
            this.salaryDialog=true
        },

        closeSalaryDialog(){
            this.salarySetup()
            this.salaryDialog=false
        },

        //---------------EMPLOYEE PAYSCHEDULE--------------   
        async getEmployeePaySchedule(){
            let employee_id=this.$route.params.id
            const apiUrl = `/getEmployeePaySchedule/`+employee_id;
            try {
            let response=await this.$axios.get(apiUrl);
            let pay_schedule = response.data ? response.data.pay_schedule :null
            this.employeeSalary = response.data ? response.data :null
            this.paySchedule = pay_schedule
            this.selectedPaySchedule = {'name':pay_schedule.name, 'code':pay_schedule.id}
            this.salarySetup();
            } catch (error) {
            let errors=error.response.data.errors
            }
        },

        //-----------GET PAYMENT SCHEDULES-----------
        async getPaymentSchedules(){
            const apiUrl = `/get-pay-schedule-dropdown`;
            try {
            let response=await this.$axios.get(apiUrl);
            this.paySchedules=response.data
            } catch (error) {
            let errors=error.response.data.errors
            console.log('errors',errors)
            }
        },

        //-----------UPDATE PAYMENT SCHEDULE-----------
        async updateEmployeePaySchedule(){
            let employee_id=this.$route.params.id
            let data={
                'pay_schedule_id':this.selectedPaySchedule,
                'employee_id':employee_id
            }
            const apiUrl = `/updateEmployeePaySchedule`;
            try {
            await this.$axios.post(apiUrl,data);
            await this.getEmployeePaySchedule()
            this.payScheduleDialog=false
            this.$showToast('success','Employee pay schedule updated successfully.');
            } catch (error) {
            let errors=error.response.data.errors
            console.log('errors',errors)
            }
        },

        //-----------UPDATE EMPLOYEE SALARY-----------
        async updateEmployeeSalary(){
            let employee_id=this.$route.params.id
            let data=this.details
            const apiUrl = `/updateEmployeeSalary/`+employee_id;
            try {
            await this.$axios.post(apiUrl,data);
            await this.getEmployeePaySchedule()
            this.salaryDialog=false
            this.$showToast('success','Employee salary updated successfully.');
            } catch (error) {
            let errors=error.response.data.errors
            console.log('errors',errors)
            }
        },

        //-----------SET SALARY DETAIL-----------
        salarySetup(){
            this.details.salary_type={'name':this.employeeSalary.salary_type, 'code':this.employeeSalary.salary_type}
            this.details.anual_salary=this.employeeSalary.anual_salary
            this.details.monthly_salary=this.employeeSalary.monthly_salary
            this.details.weekly_salary=this.employeeSalary.weekly_salary
            this.details.hourly_equivalent=this.employeeSalary.hourly_equivalent
            this.details.expected_work_hours_per_week=this.employeeSalary.expected_work_hours_per_week
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