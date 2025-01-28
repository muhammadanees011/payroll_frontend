<template>
    <!-- company details form -->
  <div class="col-12 md:col-12">
      <div class="card card-w-title">
          <div class="grid">
              <div class="mt-5 col-12 md:col-6 ">
                  <h5 class="mt-3" style="color:#1F9A72;">Paternity Pay</h5>
                  <small>Setup a statutory leave for the employee and let FreePayroll calculate the payments.</small>
                  <div class="grid">
                      <div class="col-12 md:col-11 mt-4">
                          <label for="accountsOfficeReference">Expected due date*</label>
                          <br>
                          <Calendar v-model="details.expected_due_date" :showIcon="true" :showButtonBar="true" style="width:100%;"></Calendar>
                      </div>
                      <div class="col-12 md:col-11">
                          <label for="accountsOfficeReference">How will the employee take the leave?</label>
                          <Dropdown v-model="details.leave_type" :options="leaveChoice" optionLabel="name" placeholder="Select" style="width:100%;height:45px;" />
                          <span v-if="validationErrors.leave_type" class="font-medium validation-text p-2">
                              {{validationErrors.leave_type}}
                          </span>
                      </div>
                      <div class="col-12 md:col-11">
                        <div class="grid">

                            <div class="col-5 md:col-6">
                                <label for="accountsOfficeReference">Leave start date</label>
                                <Calendar v-model="start_date" :showIcon="true" :showButtonBar="true" style="width:100%;"></Calendar>
                                <span v-if="validationErrors.start_date" class="font-medium validation-text p-2">
                                    {{validationErrors.start_date}}
                                </span>
                            </div>

                            <div class="col-5 md:col-6">
                                <label for="accountsOfficeReference">Leave end date</label>
                                <Calendar v-model="end_date" :showIcon="true" :showButtonBar="true" style="width:100%;"></Calendar>
                                <span v-if="validationErrors.end_date" class="font-medium validation-text p-2">
                                    {{validationErrors.end_date}}
                                </span>
                            </div>
                            
                        </div>

                      </div>

                      <div v-if="details.leave_type.code == 'My employee will take 2 weeks of leave in seperate blocks'" class="col-12 md:col-11">
                        <h5>Second block of leave</h5>
                        <div class="grid">
                            <div class="col-5 md:col-6">
                                <label for="accountsOfficeReference">Leave start date</label>
                                <Calendar v-model="second_block_start_date" :showIcon="true" :showButtonBar="true" style="width:100%;"></Calendar>
                                <span v-if="validationErrors.second_block_start_date" class="font-medium validation-text p-2">
                                    {{validationErrors.second_block_start_date}}
                                </span>
                            </div>

                            <div class="col-5 md:col-6">
                                <label for="accountsOfficeReference">Leave end date</label>
                                <Calendar v-model="second_block_end_date" :showIcon="true" :showButtonBar="true" style="width:100%;"></Calendar>
                                <span v-if="validationErrors.second_block_end_date" class="font-medium validation-text p-2">
                                    {{validationErrors.second_block_end_date}}
                                </span>
                            </div>
                            
                        </div>

                      </div>

                      <div class="col-12 md:col-11">
                          <label for="accountsOfficeReference">Average weekly earnings</label>
                          <br>
                          <br>
                          <small>FreePayroll can only calculate the average weekly earnings, if we have at least 52 weeks of data. Otherwise, you will need to input manually.</small>
                          <InputText v-model="details.average_weekly_earnings" class="mt-1" type="number" min="0" style="width:100%;height:45px;" />
                      </div>
  
                      <div class="col-12 md:col-11 flex justify-content-between">
                          <span>
                              <Button @click="isEdit=false" label="Cancel" class="ml-2"></Button>
                              <Button @click="updateEmployeePaternity()" label="Save" class="ml-2"></Button>
                          </span>
                      </div>
  
                  </div>
      
              </div>
              <div class="col-12 md:col-6">
                  <div class="flex flex-column align-items-center justify-content-center">
                      <div class="w-full surface-card flex flex-column align-items-center" style="border-radius: 53px">
                          <div class="mt-5 w-full flex justify-content-between py-3 border-300 border-1">
                              <span class="ml-4 mt-3 flex flex-column">
                                  <h5 style="color:#1F9A72;" class="lg:text-sm font-medium mb-0 block">Statutory pay claims</h5>
                                  <br>
                                  <small>
                                    If you have paid any Statutory Maternity Pay or Statutory Paternity Pay, we will claim 92% of it from HMRC. If you qualify for Small Employer's Relief, it will be 103%.
                                  </small>
                                  <br>
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
  import cloneDeep from 'lodash/cloneDeep';

  export default {
    data() {
      return {
        due_date:'',
          isUpdating:false,
          isEdit:false,
          validationErrors:[],
          details:{
            leave_type:'',
            expected_due_date:'',
            start_date:'',
            end_date:'',
            average_weekly_earnings:'',
            second_block_start_date:'',
            second_block_end_date:''
          },
        leaveChoice: [
            { name: 'My employee will take 1 week of leave', code: 'My employee will take 1 week of leave' },
            { name: 'My employee will take 2 weeks of leave in a row', code: 'My employee will take 2 weeks of leave in a row' },
            { name: 'My employee will take 2 weeks of leave in seperate blocks', code: 'My employee will take 2 weeks of leave in seperate blocks' },
        ],
      };
    },
    mounted(){
        this.getEmployeePaternity();
    },
    updated() {
        this.isUpdating=false
    },
    watch:{
        due_date:{
            handler(newVal,oldVal){
                console.log(newVal)
            }
        },
        start_date:{
            handler(newVal,oldVal){
                if(this.isUpdating){
                    return
                }
                let daysToAdd = 7;
                if(this.details.leave_type.code==='My employee will take 1 week of leave'){
                    this.details.second_block_start_date=null;
                    this.details.second_block_end_date=null;
                    daysToAdd = 7;
                }else if(this.details.leave_type.code==='My employee will take 2 weeks of leave in a row'){
                    this.details.second_block_start_date=null;
                    this.details.second_block_end_date=null;
                    daysToAdd = 14;
                }else if(this.details.leave_type.code=='My employee will take 2 weeks of leave in seperate blocks'){
                    daysToAdd = 7;
                }
                let startDate = this.$moment(newVal, 'DD/MM/YYYY').toDate();
                let endDate = new Date(startDate);
                endDate.setDate(endDate.getDate() + daysToAdd);
                this.end_date = endDate.toISOString().slice(0, 10);
            },
            deep:true,
        },
        second_block_start_date:{
            handler(newVal,oldVal){
                if(this.isUpdating){
                    return
                }
                let daysToAdd = 7;
                let startDate = this.$moment(newVal, 'DD/MM/YYYY').toDate();
                let endDate = new Date(startDate);
                endDate.setDate(endDate.getDate() + daysToAdd);
                this.second_block_end_date = endDate.toISOString().slice(0, 10);
            },
            deep:true,
        },
    },
    computed:{
        start_date:{
            get(){
                return this.details.start_date;
            },
            set(data){
                this.details.start_date= this.$moment(data).format('DD/MM/YYYY');
            }
        },
        end_date:{
            get(){
                return this.details.end_date;
            },
            set(data){
                this.details.end_date= this.$moment(data).format('DD/MM/YYYY');
            }
        },
        second_block_start_date:{
            get(){
                return this.details.second_block_start_date;
            },
            set(data){
                this.details.second_block_start_date= this.$moment(data).format('DD/MM/YYYY');
            }
        },
        second_block_end_date:{
            get(){
                return this.details.second_block_end_date;
            },
            set(data){
                this.details.second_block_end_date= this.$moment(data).format('DD/MM/YYYY');
            }
        },
    },
    methods: {

    addPayItems(){
        this.$router.push({ name: 'company-create-payitems' });
    },

    //---------------EMPLOYEE PATERNITY--------------   
    async getEmployeePaternity(){
        this.isUpdating=true
        let employee_id=this.$route.params.id
        const apiUrl = `/getPaternityLeave/`+employee_id;
        try {
        let response=await this.$axios.get(apiUrl);
        let employee_paternity = response.data ? response.data :null
        this.paternitySetup(employee_paternity);
        } catch (error) {
        let errors=error.response.data.errors
        }
    },

    //-----------UPDATE Employee Paternity-----------
    async updateEmployeePaternity(){
        let employee_id=this.$route.params.id
        let data=cloneDeep(this.details)

        data.expected_due_date = this.$moment(data.expected_due_date, 'DD/MM/YYYY').format('YYYY-MM-DD');
        data.start_date = this.$moment(data.start_date, 'DD/MM/YYYY').format('YYYY-MM-DD');
        data.end_date = this.$moment(data.end_date, 'DD/MM/YYYY').format('YYYY-MM-DD');
        data.second_block_start_date = data.second_block_start_date ? this.$moment(data.second_block_start_date, 'DD/MM/YYYY').format('YYYY-MM-DD'): null;
        data.second_block_end_date = data.second_block_end_date ? this.$moment(data.second_block_end_date, 'DD/MM/YYYY').format('YYYY-MM-DD'):null;

        if(this.details.leave_type.code!=='My employee will take 2 weeks of leave in seperate blocks'){
            data.second_block_start_date=null;
            data.second_block_end_date=null;
        }
        const apiUrl = `/updatePaternityLeave/`+employee_id;
        try {
        await this.$axios.post(apiUrl,data);
        this.$showToast('success','Employee Paternity details updated successfully.');
        } catch (error) {
        let errors=error.response.data.errors
        console.log('errors',errors)
        }
    },

    //-----------SET PATERNITY DETAIL-----------
    paternitySetup(employee_paternity){
        this.details.leave_type = {'name':employee_paternity.leave_type, 'code':employee_paternity.leave_type}
        this.details.expected_due_date = this.$moment(employee_paternity.expected_due_date).toDate();
        this.details.start_date=this.$moment(employee_paternity.start_date).toDate()//.format('DD/MM/YYYY')
        this.details.end_date=this.$moment(employee_paternity.end_date).toDate()//.format('DD/MM/YYYY')
        this.details.second_block_start_date=employee_paternity.second_block_start_date ? this.$moment(employee_paternity.second_block_start_date).toDate():null//.format('DD/MM/YYYY') :null
        this.details.second_block_end_date=employee_paternity.second_block_end_date ? this.$moment(employee_paternity.second_block_end_date).toDate():null//.format('DD/MM/YYYY') :null
        this.details.average_weekly_earnings=employee_paternity.average_weekly_earnings
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