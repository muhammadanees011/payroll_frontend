<script setup>
import { ref } from "vue";
import StepProgress from 'vue-step-progress';
const checkboxValue = ref([]);
const dropdownValue = ref(null);
const currentStep = ref(0);
const dropdownValues = ref([
    { name: 'Weekly', code: 'Weekly' },
    { name: 'Fortnightly', code: 'Fortnightly' },
    { name: 'Four Weekly', code: 'Four Weekly' },
    { name: 'Monthly', code: 'Monthly' },
]);
const paydays = ref([
    ...Array.from({ length: 30 }, (_, i) => ({
        name: `${i + 1}`, // "1 Day", "2 Days", ..., "30 Days"
        code: `Day${i + 1}`
    })),
    { name: 'Last Day of Month', code: 'lastday' },
]);
const dayRateMethod = ref([
    { name: 'Calander Month', code: 'Calander Month' },
    { name: 'Yearly Working Days', code: 'Yearly Working Days' },
]);
const nestedRouteItems = ref([
    'Create Company Details', 'Basic Setup','Pay Schedule','Adding Employees' 
]);
</script>

<template>
  <!-- company details form -->
  <div>
  <div class="grid">
    <div class="col-12 md:col-12 ">
        <div class="formgrid grid">
          <div class="field col-4">
            <label for="companyName">Schedule name*</label>
            <InputText id="companyName" optionLabel="companyName" type="text" style="width:100%;height:45px" />
          </div>
          <div class="field col-4">
            <label for="name2">Pay frequency*</label>
            <Dropdown v-model="dropdownValue" :options="dropdownValues" optionLabel="name" placeholder="Select" style="width:100%;height:45px" />
          </div>
      </div>
    </div>
  </div>
  <div class="grid">
    <div class="col-12 md:col-12">
      <div class="formgrid grid">
        <div class="field col-4">
            <label for="name2">Paydays*</label>
            <Dropdown v-model="dropdownValue" :options="paydays" optionLabel="name" placeholder="Select" style="width:100%;height:45px" />
          </div>
        <div class="field col-4">
          <label for="postCode">First pay date*</label>
          <Calendar :showIcon="true" :showButtonBar="true" v-model="calendarValue" style="width:100%;height:45px" ></Calendar>
        </div>
      </div>
    </div>
  </div>
  <div class="grid">
    <div class="col-12 md:col-12">
      <div class="formgrid grid">
        <div class="field col-4">
            <label for="name2">Day rate method*</label>
            <Dropdown v-model="dropdownValue" :options="dayRateMethod" optionLabel="name" placeholder="Select" style="width:100%;height:45px" />
          </div>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped lang="scss">

</style>