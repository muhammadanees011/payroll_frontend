<template>
    <!-- company details form -->
    <div class="col-12 md:col-12">
        <div class="card card-w-title">
        <h5>Why do we need to ask for this?</h5>
        <small class="">Pay schedules refer to the regular intervals at which your workers receive their wages or salaries. 
        <br>In other words, it is how often you pay them.
        You can set up more than one pay schedule, but each worker can be assigned to only one pay schedule.</small>

        <div v-if="isSuccess" class="text-center mb-5 pt-2 pb-2" style="background-color: #80D1B4; border-radius: 5px !important;">
            <span class="text-white font-medium">Saved Successfully</span>
        </div>

        <div v-if="isErrors" class="mb-5 py-4 pl-3" style="background-color: #E88D58; border-radius: 5px !important;">
            <span v-for="error in errors" class="text-white font-medium">
                {{ error }}
                <br>
            </span>
        </div>

        <div class="grid mt-3">
        <div class="col-12 md:col-12 ">
            <div class="formgrid grid">
                <div class="field col-4">
                <label for="companyName">Schedule name*</label>
                <InputText v-model="paySchedule.name" id="companyName" optionLabel="companyName" type="text" style="width:100%;height:45px" />
                <span v-if="validationErrors.name" class="font-medium validation-text p-2">
                    {{validationErrors.name}}
                </span>
                </div>
                <div class="field col-4">
                <label for="name2">Pay frequency*</label>
                <Dropdown v-model="paySchedule.pay_frequency" :options="dropdownValues" optionLabel="name" placeholder="Select" style="width:100%;height:45px" />
                <span v-if="validationErrors.pay_frequency" class="font-medium validation-text p-2">
                    {{validationErrors.pay_frequency}}
                </span>
                </div>
            </div>
        </div>
        </div>
        <div class="grid">
        <div class="col-12 md:col-12">
            <div class="formgrid grid">
            <div class="field col-4">
                <label for="name2">Pay days*</label>
                <Dropdown v-model="paySchedule.paydays" :options="payDays" optionLabel="name" placeholder="Select" style="width:100%;height:45px" />
                <span v-if="validationErrors.paydays" class="font-medium validation-text p-2">
                    {{validationErrors.paydays}}
                </span>
            </div>
            <div class="field col-4 ">
                <label for="name2">First Payday*</label>
                <Calendar :showIcon="true" :showButtonBar="true" v-model="paySchedule.first_paydate" style="width: 100%;"></Calendar>
                <span v-if="validationErrors.first_paydate" class="font-medium validation-text p-2">
                    {{validationErrors.first_paydate}}
                </span>
            </div>
            </div>
        </div>
        </div>
        <div class="grid">
        <div class="col-12 md:col-12">
            <div class="formgrid grid">
            <div class="field col-4">
                <label for="name2">Day rate method*</label>
                <Dropdown v-model="paySchedule.day_rate_method" :options="dayRatemethod" optionLabel="name" placeholder="Select" style="width:100%;height:45px" />
                <span v-if="validationErrors.day_rate_method" class="font-medium validation-text p-2">
                    {{validationErrors.day_rate_method}}
                </span>
            </div>
            </div>
        </div>
        </div>
        <br>
        <Button @click="validateData()" label="Save" class="mt-5 ml-2"></Button>
        <Button @click="goBack()" label="Cancel" class="mt-5 ml-2" style="background-color: transparent;color: black;"></Button>
        </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        validationErrors:[],
        errors:null,
        isSuccess:false,
        isErrors:false,

        paySchedule:{
          name:'',
          pay_frequency:'',
          paydays:'',
          first_paydate:'',
          day_rate_method:'',
        },
        checkboxValue: [],
        dropdownValue: null,
        dropdownValues: [
          { name: 'Weekly', code: 'Weekly' },
          { name: 'Fortnightly', code: 'Fortnightly' },
          { name: 'Four Weekly', code: 'Four' },
          { name: 'Monthly', code: 'Monthly' },
        ],
        payDays: [
          { name: 'Monday', code: 'Monday' },
          { name: 'Tuesday', code: 'Tuesday' },
          { name: 'Wednesday', code: 'Wednesday' },
          { name: 'Thursday', code: 'Thursday' },
          { name: 'Friday', code: 'Friday' },
        ],
        dayRatemethod: [
          { name: 'Calander Month', code: 'Calander Month' },
          { name: 'Yearly Working Days', code: 'Yearly Working Days' },
        ],
      };
    },
    mounted(){
        this.editPaySchedule()
    },
    methods:{

    goBack(){
      this.$router.push({ name: 'company-pay-schedules' });
    },

    validateData(){
        const optionalFields = [];
        this.validationErrors = this.$validateFormData(this.paySchedule, optionalFields);
        if (Object.keys(this.validationErrors).length === 0 ) {
          this.updatePaySchedule();
        } else {
          console.log('Validation errors:', this.validationErrors);
        }
    },

    async editPaySchedule(){
        let id = this.$route.params.id
        const apiUrl = `/edit-pay-schedule/`+id;
        try {
        let response=await this.$axios.get(apiUrl);
        response=response.data
        this.paySchedule.name=response.name
        this.paySchedule.pay_frequency={name:response.pay_frequency, code:response.pay_frequency}
        this.paySchedule.paydays={name:response.paydays, code:response.paydays}
        this.paySchedule.first_paydate=response.first_paydate
        this.paySchedule.day_rate_method={name:response.day_rate_method, code:response.day_rate_method}
        } catch (error) {
        let errors=error.response.data.errors
        }
    },

    async updatePaySchedule(){
        this.paySchedule.first_paydate=this.$moment(this.paySchedule.first_paydate).format('YYYY-MM-DD')
        let data = this.paySchedule
        let id = this.$route.params.id
        const apiUrl = `/update-pay-schedule/`+id;
        try {
        await this.$axios.post(apiUrl,data);
        this.$showToast('success','Pay Schedule updated successfully.');
        this.isErrors=false
        this.isSuccess=true
        this.goBack()
        } catch (error) {
        this.errors=error.response.data.errors
        this.isSuccess=false
        this.isErrors=true
        }
    },

    },
  };
  </script>
  
  
  <style scoped lang="scss">

    ::v-deep input{
        width:100%;
        height:45px !important;
    }
  
  </style>