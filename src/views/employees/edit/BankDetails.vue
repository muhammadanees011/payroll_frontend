<template>
    <!-- company details form -->
  <div class="col-12 md:col-12">
      <div class="card card-w-title">
          <div class="grid">
              <div class="mt-5 col-12 md:col-6 ">
                  <h5 class="mt-3" style="color:#1F9A72;">Bank details</h5>
                  <small>Here you can store your employee’s bank details.</small>
                  <div class="grid mt-3">

                      <div class="col-12 md:col-11">
                          <label for="accountsOfficeReference">Bank Name</label>
                          <br>
                          <InputText v-model="details.bank_name" class="mt-1" type="text" style="width:100%;height:45px;" />
                      </div>

                      <div class="col-12 md:col-11">
                          <label for="accountsOfficeReference">Sort Code</label>
                          <br>
                          <InputText v-model="details.sort_code" class="mt-1" type="text" style="width:100%;height:45px;" />
                      </div>
  
                      <div class="col-12 md:col-11">
                          <label for="accountsOfficeReference">Account Number</label>
                          <br>
                          <InputText v-model="details.account_number" class="mt-1" type="text" style="width:100%;height:45px;" />
                      </div>

                      <div class="col-12 md:col-11 flex justify-content-between">
                          <span>
                              <Button @click="isEdit=false" label="Cancel" class="ml-2"></Button>
                              <Button @click="updateBankDetails()" label="Save" class="ml-2"></Button>
                          </span>
                      </div>
                  </div>
      
              </div>
              <div class="col-12 md:col-6">
                  <div class="flex flex-column align-items-center justify-content-center">
                      <div class="w-full surface-card flex flex-column align-items-center" style="border-radius: 53px">
                          <div class="mt-5 w-full flex justify-content-between py-3 border-300 border-1">
                              <span class="ml-4 mt-3 flex flex-column">
                                  <h5 style="color:#1F9A72;" class="lg:text-sm font-medium mb-0 block">Bank Details</h5>
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

  export default {
    data() {
      return {
          isUpdating:false,
          isEdit:false,
          validationErrors:[],
          details:{
            employee_id:'',
            bank_name:'',
            sort_code:'',
            account_number:'',
          },
      };
    },
    mounted(){
        this.getBankDetails();
    },
    updated() {
        this.isUpdating=false
    },
    computed:{
    },
    methods: {

    //---------------EMPLOYEE PATERNITY--------------   
    async getBankDetails(){
        this.isUpdating=true
        let employee_id=this.$route.params.id
        const apiUrl = `/getBankDetails/`+employee_id;
        try {
        let response=await this.$axios.get(apiUrl);
        let bank_details = response.data ? response.data :null
        this.bankDetailsSetup(bank_details);
        } catch (error) {
        let errors=error.response.data.errors
        }
    },

    //-----------UPDATE Employee Paternity-----------
    async updateBankDetails(){
        let employee_id=this.$route.params.id
        this.details.employee_id=employee_id
    
        let data=this.details
        const apiUrl = `/updateBankDetails`;
        try {
        await this.$axios.post(apiUrl,data);
        this.$showToast('success','Employee Bank details updated successfully.');
        } catch (error) {
        let errors=error.response.data.errors
        console.log('errors',errors)
        }
    },

    //-----------SET PATERNITY DETAIL-----------
    bankDetailsSetup(bank_details){
        this.details.employee_id=bank_details.employee_id
        this.details.bank_name=bank_details.bank_name
        this.details.sort_code=bank_details.sort_code
        this.details.account_number=bank_details.account_number
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