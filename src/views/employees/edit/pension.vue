<template>
    <!-- company details form -->
  <div class="col-12 md:col-12">
      <div class="card card-w-title">
          <div class="grid">
              <div v-if="isEdit" class="mt-5 col-12 md:col-6 ">
                  <h5 class="mt-3" style="color:#1F9A72;">Edit Pension Settings</h5>
                  <div class="grid">
                      <div class="col-12 md:col-11 mt-4">
                          <label for="accountsOfficeReference">Pension Type*</label>
                          <Dropdown v-model="details.pension_type" :options="pensionTypes" optionLabel="name" placeholder="Select" style="width:100%;height:45px;" />
                          <span v-if="validationErrors.pension_type" class="font-medium validation-text p-2">
                              {{validationErrors.pension_type}}
                          </span>
                      </div>
                      <div class="col-12 md:col-11">
                          <label for="accountsOfficeReference">Pension Calculation*</label>
                          <Dropdown v-model="details.pension_calculation" :options="pensionCalculations" optionLabel="name" placeholder="Select" style="width:100%;height:45px;" />
                          <span v-if="validationErrors.pension_calculation" class="font-medium validation-text p-2">
                              {{validationErrors.pension_calculation}}
                          </span>
                      </div>
                      <div class="col-12 md:col-11">
                        <div class="grid">

                            <div class="col-5 md:col-6">
                                <label for="accountsOfficeReference">Employer Contribution*</label>
                                <InputText v-model="details.employer_contribution" id="accountsOfficeReference" optionLabel="accountsOfficeReference"  type="number" min="0"/>
                                <span v-if="validationErrors.employer_contribution" class="font-medium validation-text p-2">
                                    {{validationErrors.employer_contribution}}
                                </span>
                            </div>

                            <div class="col-5 md:col-6">
                                <label for="accountsOfficeReference">Employee Contribution*</label>
                                <InputText v-model="details.employee_contribution" id="accountsOfficeReference" optionLabel="accountsOfficeReference" type="number" min="0"/>
                                <span v-if="validationErrors.employee_contribution" class="font-medium validation-text p-2">
                                    {{validationErrors.employee_contribution}}
                                </span>
                            </div>
                            
                        </div>

                      </div>
  
                      <div class="col-12 md:col-11 flex justify-content-between">
                          <span>
                              <Button @click="isEdit=false" label="Cancel" class="ml-2"></Button>
                              <Button @click="updateEmployeePension()" label="Save" class="ml-2"></Button>
                          </span>
                      </div>
  
                  </div>
      
              </div>
              <div v-else class="col-12 md:col-6">
                  <div class="">
                      <div class="w-full surface-card flex flex-column" style="border-radius: 53px">
                          <div class="mt-4 w-full flex justify-content-between py-3 pr-3 border-300 border-top-1 border-left-1 border-right-1">
                              <span class="ml-4 mt-3 flex flex-column">
                                  <h5 style="color:#1F9A72;" class="lg:text-sm font-medium mb-0 block">Pension Settings</h5>
                              </span>
                              <span class="mt-2 edit-btn">
                                  <h3 @click="isEdit=true" class=" lg:text-xl font-medium mb-0">Edit</h3>
                              </span>
                          </div>
                          <div class="w-full flex justify-content-between py-3 pr-3 border-300 border-top-1 border-left-1 border-right-1">
                              <span class="ml-4 mt-3 flex flex-column">
                                  <h5 class="text-900 lg:text-lg sm:text-sm font-medium mb-0 block">Pension Provider</h5>
                              </span>
                              <span class="mt-3">
                                  <h3 class="text-900 text-sm font-medium mb-0 block">Collegia</h3>
                              </span>
                          </div>
                          <div class="w-full flex justify-content-between py-3 pr-3 border-300 border-top-1 border-left-1 border-right-1">
                              <span class="ml-4 mt-3 flex flex-column">
                                  <h5 class="text-900 lg:text-lg font-medium mb-0 block">Pension Type</h5>
                              </span>
                              <span class="mt-3">
                                  <h3 class="text-900 text-sm font-medium mb-0 block">{{ this.details.pension_type ? this.details.pension_type.name :'-'}}</h3>
                              </span>
                          </div>
                          <div class="w-full flex justify-content-between py-3 pr-3 border-300 border-top-1 border-left-1 border-right-1">
                              <span class="ml-4 mt-3 flex flex-column">
                                  <h3 class="text-900 text-xl font-medium mb-0 block">Pension Calculation Basis</h3>
                              </span>
                              <span class="mt-3">
                                  <h3 class="text-900 text-sm font-medium mb-0 block">{{ this.details.pension_type ? this.details.pension_calculation.name :'-' }}</h3>
                              </span>
                          </div>
                          <div class="w-full flex justify-content-between py-3 pr-3 border-300 border-bottom-1 border-top-1 border-left-1 border-right-1">
                              <span class="ml-4 mt-3 flex flex-column">
                                  <h3 class="text-900 lg:text-xl font-medium mb-0 block">Eligible For tax relief</h3>
                              </span>
                              <span class="mt-3">
                                  <h3 class="text-900 text-sm font-medium mb-0 block">Yes</h3>
                              </span>
                          </div>
                          <div class="w-full flex justify-content-between py-3 pr-3 border-300 border-bottom-1 border-top-1 border-left-1 border-right-1">
                              <span class="ml-4 mt-3 flex flex-column">
                                  <h3 class="text-900 lg:text-xl font-medium mb-0 block">Employee Contribution</h3>
                              </span>
                              <span class="mt-3">
                                  <h3 class="text-900 text-sm font-medium mb-0 block">{{ this.details.employee_contribution }}%</h3>
                              </span>
                          </div>
                          <div class="w-full flex justify-content-between py-3 pr-3 border-300 border-bottom-1 border-top-1 border-left-1 border-right-1">
                              <span class="ml-4 mt-3 flex flex-column">
                                  <h3 class="text-900 lg:text-xl font-medium mb-0 block">Employer Contribution</h3>
                              </span>
                              <span class="mt-3">
                                  <h3 class="text-900 text-sm font-medium mb-0 block">{{ this.details.employer_contribution }}%</h3>
                              </span>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="col-12 md:col-6">
                  <div class="flex flex-column align-items-center justify-content-center">
                      <div class="w-full surface-card flex flex-column align-items-center" style="border-radius: 53px">
                          <div class="mt-4 w-full flex justify-content-between py-3 border-300 border-top-1 border-left-1 border-right-1">
                              <span class="ml-4 mt-3 flex flex-column">
                                  <h5 style="color:#1F9A72;" class="lg:text-sm font-medium mb-0 block">Eligibility assessment</h5>
                                  <br>
                                  <small>Eligible jobholders earn more than £833 per month, are aged between 22 and their State Pension age. They have to be enrolled into a qualifying workplace pension scheme.</small>
                                  <br>
                              </span>
                          </div>
                          <div class="w-full flex justify-content-between py-3 pr-3 border-300 border-top-1 border-left-1 border-right-1">
                              <span class="ml-4 mt-3 flex flex-column">
                                  <h5 class="text-900 lg:text-lg font-medium mb-0 block">Worker type</h5>
                              </span>
                              <span class="mt-3">
                                  <h3 class="text-900 lg:text-sm font-medium mb-0 block">Not Assessed</h3>
                              </span>
                          </div>
                          <div class="w-full flex justify-content-between py-3 border-300 pr-3 border-top-1 border-left-1 border-right-1">
                              <span class="ml-4 mt-3 flex flex-column">
                                  <h5 class="text-900 lg:text-lg font-medium mb-0 block">Eligibity Date</h5>
                              </span>
                              <span class="mt-3">
                                  <h3 class="text-900 lg:text-sm font-medium mb-0 block">N/A</h3>
                              </span>
                          </div>
                          <div class="w-full flex justify-content-between py-3 pr-3 border-300 border-top-1 border-left-1 border-right-1">
                              <span class="ml-4 mt-3 flex flex-column">
                                  <h3 class="text-900 lg:text-xl font-medium mb-0 block">Age</h3>
                              </span>
                              <span class="mt-3" >
                                  <h3 class="text-900 lg:text-sm font-medium mb-0 block">23</h3>
                              </span>
                          </div>
                          <div class="w-full flex justify-content-between py-3 pr-3 border-300 border-bottom-1 border-top-1 border-left-1 border-right-1">
                              <span class="ml-4 mt-3 flex flex-column">
                                  <h3 class="text-900 lg:text-xl font-medium mb-0 block">Status</h3>
                              </span>
                              <span class="mt-3">
                                  <h3 class="text-900 lg:text-sm font-medium mb-0 block">not-enrolled</h3>
                              </span>
                          </div>
                          <div class="w-full flex justify-content-between py-3 pr-3 border-300 border-bottom-1 border-top-1 border-left-1 border-right-1">
                              <span class="ml-4 mt-3 flex flex-column">
                                  <h3 class="text-900 lg:text-xl font-medium mb-0 block">Enrollment Date</h3>
                              </span>
                              <span class="mt-3">
                                  <h3 class="text-900 lg:text-sm font-medium mb-0 block">N/A</h3>
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
          isEdit:false,
          validationErrors:[],
          details:{
            pension_type:'',
            pension_calculation:'',
            employee_contribution:'',
            employer_contribution:'',
          },
        pensionTypes: [
            { name: 'Relief at source', code: 'Relief at source' },
            { name: 'Salary sacrifice', code: 'Salary sacrifice' },
        ],
        pensionCalculations: [
            { name: 'Pensionable Earnings', code: 'Pensionable Earnings' },
            { name: 'Qualifying Earnings', code: 'Qualifying Earnings' },
        ],
      };
    },
    mounted(){
        this.getEmployeePension();
    },
    methods: {

    addPayItems(){
        this.$router.push({ name: 'company-create-payitems' });
    },

    //---------------EMPLOYEE PENSION--------------   
    async getEmployeePension(){
        let employee_id=this.$route.params.id
        const apiUrl = `/getEmployeePension/`+employee_id;
        try {
        let response=await this.$axios.get(apiUrl);
        let employee_pension = response.data ? response.data :null
        this.pensionSetup(employee_pension);
        } catch (error) {
        let errors=error.response.data.errors
        }
    },

    //-----------UPDATE Employee Pension-----------
    async updateEmployeePension(){
        let employee_id=this.$route.params.id
        let data=this.details
        const apiUrl = `/updateEmployeePension/`+employee_id;
        try {
        await this.$axios.post(apiUrl,data);
        this.$showToast('success','Employee Pension details updated successfully.');
        } catch (error) {
        let errors=error.response.data.errors
        console.log('errors',errors)
        }
    },

    //-----------SET PENSION DETAIL-----------
    pensionSetup(employee_pension){
        this.details.pension_type = {'name':employee_pension.pension_type, 'code':employee_pension.pension_type}
        this.details.pension_calculation = {'name':employee_pension.pension_calculation, 'code':employee_pension.pension_calculation}
        this.details.employee_contribution=employee_pension.employee_contribution
        this.details.employer_contribution=employee_pension.employer_contribution
    },

    }
  }
  </script>
  
  <style scoped>
  ::v-deep input{
      width:100%;
      height:45px !important;
  }
  .edit-btn{
      cursor: pointer;
      padding-left: 8px;
      padding-top: 7px;
      padding-bottom: 6px;
      width: 48px !important;
      height: 35px !important;
      border: 1px solid gainsboro;
      border-radius: 10px;
      background-color:#1F9A72;
  }
  .edit-btn h3{
      color: white !important;
      font-size: 16px !important;
  }
  </style> 