<script setup>
import { ref } from "vue";

const salaryTypes = ref([
  { name: 'Hourly', code: 'hour' },
  { name: 'Monthly', code: 'monthly' },
]);
const paymentSchedule = ref([
  { name: 'Test Schedule', code: 'Hr' },
]);
const salary = ref(null);
const payment = ref(null);
const radioValue = ref(null);
</script>

<template>
  <div class="grid">
    <div class="col-12 md:col-12 mt-5">
      <div class="formgrid grid">

        <div class="field col-6">
          <label for="Forename">Payroll ID*</label>
          <InputText id="Forename" type="text"  style="width:100%" />
        </div>
        <div class="field col-6">
          <label for="Surname">Employment Date</label>
          <InputText id="Surname" type="date"  style="width:100%"/>
        </div>
      </div>
      <div class="formgrid grid mt-3">

        <div class="field col-6">
          <label for="Forename">Payment Schedule*</label>
          <Dropdown v-model="payment" :options="paymentSchedule" optionLabel="name" placeholder="Select" style="width:100%;height:45px;"  />
        </div>
      </div>
      <div class="formgrid grid mt-3">

        <div class="field col-6">
          <label for="Forename">Salary Type*:</label>
          <Dropdown v-model="salary" :options="salaryTypes" optionLabel="name" placeholder="Select" style="width:100%;height:45px;"  />

        </div>
      </div>
      <div v-if="salary && salary.code === 'hour'" class="formgrid grid mt-3">

        <div class="field col-6">
          <label >Expected work hours per week*</label>
          <InputText class="mt-1"  v-model="hourlyRate" type="text" style="width:100%" />
        </div>
        <div class="field col-6">
          <label >Hourly equivalent*</label>
          <InputText class="mt-1"  v-model="hourlyRate" type="text" style="width:100%" />
        </div>
      </div>
      <div v-else-if="salary && salary.code === 'monthly'" class="formgrid grid mt-3">

        <div class="field col-4">
          <label >Annual Salary*</label>
          <InputText class="mt-1"  v-model="hourlyRate" type="text" style="width:100%" />
        </div>
        <div class="field col-4">
          <label >Monthly Salary*</label>
          <InputText class="mt-1"  v-model="hourlyRate" type="text" style="width:100%" />
        </div>
        <div class="field col-4">
          <label >Weekly Salary*</label>
          <InputText class="mt-1"  v-model="hourlyRate" type="text" style="width:100%" />
        </div>
        <div class="field col-4">
          <label >Expected work hours per week*</label>
          <InputText class="mt-1"  v-model="hourlyRate" type="text" style="width:100%" />
        </div>
        <div class="field col-4">
          <label >Hourly equivalent</label>
          <InputText class="mt-1"  v-model="hourlyRate" type="text" style="width:100%" />
        </div>
      </div>


      <div class="formgrid grid mt-3">
        <div class="field col-12" >
          <Strong for="Forename">During the current tax year, is/was this employee a director ?</Strong>

        </div>
        <div class="col-12 md:col-2">
          <div class="field-radiobutton mb-0">
            <RadioButton id="option1" name="option" value="No" v-model="radioValue" />
            <label for="option1">No</label>
          </div>
        </div>
        <div class="col-12 md:col-2">
          <div class="field-radiobutton mb-0">
            <RadioButton id="option2" name="option" value="Yes" v-model="radioValue" />
            <label for="option2">Yes</label>
          </div>
        </div>
      </div>
      <div v-if="radioValue === 'Yes'" class="formgrid grid mt-5">

        <div class="field col-4">
          <label >Date appointed director*</label>
          <InputText class="mt-1"  v-model="hourlyRate" type="date" style="width:100%" />
        </div>
        <div class="field col-4">
          <label >Calculation method*</label>
          <InputText class="mt-1"  v-model="hourlyRate" type="text" style="width:100%" />
        </div>
        <div class="field col-4">
          <label >Date directorship ended *</label>
          <InputText class="mt-1"  v-model="hourlyRate" type="date" style="width:100%" />
        </div>
      </div>

      <div class="formgrid grid mt-5">
        <div class="field col-6" style="width:100%">
          <Button label="Save And Finish Later" severity="secondary" class="mb-2 mr-2" />
          <Button label="Continue" severity="success" class="mb-2 mr-2" />
        </div>
      </div>
    </div>
  </div>

</template>
<script>

export default {

  data() {
    return {
      salary: null,
      salaryTypes: [
        { name: 'Hourly', code: 'hour' },
        { name: 'Monthly', code: 'monthly' }
      ],
      hourlyRate: '',
      hoursWorked: '',
      monthlyRate: '',
      bonus: '',
      deductions: '',
      radioValue: null,
      field1: '',
      field2: '',
      field3: ''
    }
  }
}
</script>

<style scoped lang="scss">

</style>