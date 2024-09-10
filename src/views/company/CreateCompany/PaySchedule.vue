<template>
  <!-- company details form -->
  <div>
  <div class="grid">
    <div class="col-12 md:col-12 ">
        <div class="formgrid grid">
          <div class="field col-4">
            <label for="companyName">Schedule name*</label>
            <InputText v-model="details.payschedule_name" id="companyName" optionLabel="companyName" type="text" style="width:100%;height:45px" />
            <span v-if="validationErrors.payschedule_name" class="font-medium validation-text p-2">
                {{validationErrors.payschedule_name}}
            </span>
          </div>
          <div class="field col-4">
            <label for="name2">Pay frequency*</label>
            <Dropdown v-model="details.pay_frequency" :options="dropdownValues" optionLabel="name" placeholder="Select" style="width:100%;height:45px" />
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
            <label for="name2">Paydays*</label>
            <Dropdown v-model="details.paydays" :options="paydays" optionLabel="name" placeholder="Select" style="width:100%;height:45px" />
            <span v-if="validationErrors.paydays" class="font-medium validation-text p-2">
                {{validationErrors.paydays}}
            </span>
          </div>
        <div class="field col-4">
          <label for="postCode">First pay date*</label>
          <Calendar :showIcon="true" :showButtonBar="true" v-model="details.first_paydate" style="width:100%;height:45px" ></Calendar>
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
            <Dropdown v-model="details.day_rate_method" :options="dayRateMethod" optionLabel="name" placeholder="Select" style="width:100%;height:45px" />
            <span v-if="validationErrors.day_rate_method" class="font-medium validation-text p-2">
                {{validationErrors.day_rate_method}}
            </span>
          </div>
      </div>
    </div>
  </div>

  <br>
  <Button @click="saveDetails()" label="Continue" class="mt-5 ml-2"></Button>
</div>
</template>

<script>
import StepProgress from 'vue-step-progress';

export default {
  components: {
    StepProgress
  },
  data() {
    return {
      validationErrors:[],
      details:{
        payschedule_name:'',
        pay_frequency:'',
        paydays:'',
        first_paydate:'',
        day_rate_method:'',
      },
      checkboxValue: [],
      dropdownValue: null,
      currentStep: 0,
      dropdownValues: [
        { name: 'Weekly', code: 'Weekly' },
        { name: 'Fortnightly', code: 'Fortnightly' },
        { name: 'Four Weekly', code: 'Four Weekly' },
        { name: 'Monthly', code: 'Monthly' }
      ],
      paydays: [
        ...Array.from({ length: 30 }, (_, i) => ({
          name: `${i + 1}`, // "1 Day", "2 Days", ..., "30 Days"
          code: `Day${i + 1}`
        })),
        { name: 'Last Day of Month', code: 'lastday' }
      ],
      dayRateMethod: [
        { name: 'Calander Month', code: 'Calander Month' },
        { name: 'Yearly Working Days', code: 'Yearly Working Days' }
      ],
      nestedRouteItems: [
        'Create Company Details', 'Basic Setup', 'Pay Schedule', 'Adding Employees'
      ]
    };
  },
  methods: {
    saveDetails(){
        this.details.first_paydate=this.$moment(this.details.first_paydate).format('YYYY-MM-DD');
        const optionalFields = [];
        this.validationErrors = this.$validateFormData(this.details, optionalFields);
        if (Object.keys(this.validationErrors).length === 0 ) {
            this.$emit('saveDetails', this.details);
        } else {
            console.log('Validation errors:', this.validationErrors);
        }
    },
  }
};
</script>

<style scoped lang="scss">

</style>