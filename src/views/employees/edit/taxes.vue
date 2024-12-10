<template>
    <!-- company details form -->
  <div class="col-12 md:col-12">
      <div class="card card-w-title">
          <div class="grid">
              <div class="col-12 md:col-6 ">
                <span class="mt-3 lg:text-xl font-medium mb-0" style="color:#1F9A72;">Modify employee's Tax Information</span>
                  <div class="mt-5 flex flex-column align-items-center justify-content-center">
                      <div class="w-full surface-card flex flex-column align-items-center" style="border-radius: 53px">
                            <div class="field col-12 px-0">
                                <label for="Forename">Starter Type*</label>
                                <Dropdown v-model="details.starter_type" :options="starterType" optionLabel="name" placeholder="Select" style="width:100%;height:45px;" />
                            </div>
                            <template v-if="details.starter_type && details.starter_type.code=='New Employee With P45'">
                            <div class="grid">
                                <div class="field col-6">
                                    <label >Tax Code*</label>
                                    <InputText class="mt-1"  v-model="details.tax_code" type="text" style="width:100%;height:45px;" />
                                </div>
                                <div class="field col-6">
                                    <label >Tax Basis*</label>
                                    <Dropdown v-model="details.tax_basis" :options="taxBasis" optionLabel="name" placeholder="Select" style="width:100%;height:45px;" />
                                </div>
                            </div>
                            <div class="grid">
                                <div class="field col-6">
                                    <label >Previous taxable pay*</label>
                                    <InputText class="mt-1" v-model="details.previous_taxable_salary" type="number" style="width:100%;height:45px;" />
                                </div>
                                <div class="field col-6">
                                    <label >Previous tax paid*</label>
                                    <InputText  class="mt-1"  v-model="details.previous_tax_paid" type="number" style="width:100%;height:45px;" />
                                </div>
                            </div>                            
                            </template>

                            <template v-if="details.starter_type && details.starter_type.code=='New Employee Without P45'">
                                <div class="field col-12 px-0">
                                    <label >Starter Decleration*</label>
                                    <Dropdown v-model="details.starter_declaration" :options="starterDeclaration" optionLabel="name" placeholder="Select" style="width:100%;height:45px;" />
                                </div>
                                <div class="grid">
                                    <div class="field col-6">
                                        <label >Tax Code*</label>
                                        <InputText class="mt-1"  v-model="details.tax_code" type="text" style="width:100%;height:45px;" />
                                    </div>
                                    <div class="field col-6">
                                        <label >Tax Basis*</label>
                                        <Dropdown v-model="details.tax_basis" :options="taxBasis" optionLabel="name" placeholder="Select" style="width:100%;height:45px;" />
                                    </div>
                                </div>
                            </template>

                            <template v-if="details.starter_type && details.starter_type.code=='Existing Employee'">
                                <div class="grid">
                                    <div class="field col-6">
                                        <label >Tax Code*</label>
                                        <InputText class="mt-1"  v-model="details.tax_code" type="text" style="width:100%;height:45px;" />
                                    </div>
                                    <div class="field col-6">
                                        <label >Tax Basis*</label>
                                        <Dropdown v-model="details.tax_basis" :options="taxBasis" optionLabel="name" placeholder="Select" style="width:100%;height:45px;" />
                                    </div>
                                </div>
                            </template>

                          <br>
                      </div>
                  </div>
            
                    <div class="d-flex">
                        <!-- <Button class="align-items-end" label="Cancel" icon="pi pi-times" text="" /> -->
                        <Button class="align-items-end" label="Save" icon="pi pi-check" text="" @click="updateEmployeeTaxes()" />
                    </div>
              </div>


              <div class="col-12 md:col-6 ">
                  <div class="flex flex-column align-items-center justify-content-center">
                      <div class="w-full surface-card pt-4 pb-3 px-5 sm:px-8 flex flex-column align-items-center" style="border-radius: 53px">
                          <div class="w-full flex align-items-center py-5 border-300 border-bottom-1"> 
                            <span class="ml-4 flex flex-column">
                                  <span class="lg:text-xl font-medium mb-1 block" style="color:#1F9A72;">Tax Code</span>
                                  <span class="lg:text-sm">Enter the employee’s tax code. If you receive a letter from HMRC, please update the tax code accordingly.</span>
                            </span>
                          </div>
                      </div>
                      <div class="w-full surface-card px-5 sm:px-8 flex flex-column align-items-center" style="border-radius: 53px">
                          <div class="w-full flex align-items-center py-5 border-300 border-bottom-1"> 
                            <span class="ml-4 flex flex-column">
                                  <span class="lg:text-xl font-medium mb-1 block" style="color:#1F9A72;">Previous taxable pay</span>
                                  <span class="lg:text-sm">If a new employee with a P45 was chosen as the starter type, please state the employee’s previous taxable pay (before current employment) from their P45 statement.</span>
                            </span>
                          </div>
                      </div>
                      <div class="w-full surface-card px-5 sm:px-8 flex flex-column align-items-center" style="border-radius: 53px">
                          <div class="w-full flex align-items-center py-5 border-300 border-bottom-1"> 
                            <span class="ml-4 flex flex-column">
                                  <span class="lg:text-xl font-medium mb-1 block" style="color:#1F9A72;">Previous Tax Paid</span>
                                  <span class="lg:text-sm">If a new employee with a P45 was chosen as the starter type, please state the employee’s previous tax paid (before current employment) from their P45 statement.</span>
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
        starterType: [
            { name: 'New Employee With P45', code: 'New Employee With P45' },
            { name: 'New Employee Without P45', code: 'New Employee Without P45' },
            { name: 'Existing Employee', code: 'Existing Employee' },
        ],
        starterDeclaration: [
            { name: 'First job since start of tax year', code: 'First job since start of tax year' },
            { name: 'Currently only job', code: 'Currently only job' },
            { name: 'Got another job or pension', code: 'Got another job or pension' },
        ],
        taxBasis: [
            { name: 'Cumulative', code: 'Cumulative' },
            { name: 'Non-Cumulative', code: 'Non-Cumulative' },
        ],

        paySchedules:'',
        employeeSalary:'',
        paySchedule:'',
        selectedPaySchedule:'',
        salaries:'',

        details:{
            starter_type:'',
            tax_basis:'',
            tax_code:'',
            previous_taxable_salary:'',
            previous_tax_paid:'',
            starter_declaration:'',
        },

      };
    },
    mounted(){
      this.getEmployeeTaxes();
    },
    methods: {
  
        addPayItems(){
            this.$router.push({ name: 'company-create-salaries' });
        },
        
        //---------------EMPLOYEE PAYSCHEDULE--------------   
        async getEmployeeTaxes(){
            let employee_id=this.$route.params.id
            const apiUrl = `/getEmployeeTaxes/`+employee_id;
            try {
            let response=await this.$axios.get(apiUrl);
            let employee_taxes = response.data ? response.data :null
            this.taxesSetup(employee_taxes);
            } catch (error) {
            let errors=error.response.data.errors
            }
        },

        //-----------UPDATE PAYMENT SCHEDULE-----------
        async updateEmployeeTaxes(){
            let employee_id=this.$route.params.id
            let data=this.details
            const apiUrl = `/updateEmployeeTaxes/`+employee_id;
            try {
            await this.$axios.post(apiUrl,data);
            this.$showToast('success','Employee Taxes detail updated successfully.');
            } catch (error) {
            let errors=error.response.data.errors
            console.log('errors',errors)
            }
        },

        //-----------SET SALARY DETAIL-----------
        taxesSetup(employee_taxes){
            this.details.starter_type = {'name':employee_taxes.starter_type, 'code':employee_taxes.starter_type}
            this.details.tax_code= employee_taxes.tax_code
            this.details.tax_basis= {'name':employee_taxes.tax_basis, 'code':employee_taxes.tax_basis}
            this.details.previous_taxable_salary=employee_taxes.previous_taxable_salary
            this.details.previous_tax_paid=employee_taxes.previous_tax_paid
            this.details.starter_declaration= {'name':employee_taxes.starter_declaration, 'code':employee_taxes.starter_declaration}
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