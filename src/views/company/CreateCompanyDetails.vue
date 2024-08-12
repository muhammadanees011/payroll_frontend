<script setup>
import { ref } from "vue";
const checkboxValue = ref([]);
const dropdownValue = ref(null);
const dropdownValues = ref([
    { name: 'LTD-Private limited company', code: 'NY' },
    { name: 'LLP-Limited liability partnership', code: 'RM' },
    { name: 'LIMITED-PARTNERSHIP-Limited partnership', code: 'LDN' },
    { name: 'NORTHEREN-IRELAND-Northeren ireland company', code: 'IST' },
    { name: 'NORTHEREN-IRELAND-OTHER-Credit union (Northeren ireland)', code: 'PRS' },
    { name: 'OLD-PUBLIC-COMPANY-Old public company', code: 'RM' },
    { name: 'OTHER-Other company type', code: 'RM' },
    { name: 'OVERSEA-COMPANY-Overseas company', code: 'RM' },
    { name: 'PLC-Public limited company', code: 'RM' },
]);
const nestedRouteItems = ref([
  {
    label: 'Create Company Details',
    to: '/personal/details'
  },
  {
    label: 'Basic Setup',
    to: '/dashboard'
  },
  {
    label: 'Pay Schedule',
    to: '/uikit/menu/payment'
  },
  {
    label: 'Adding Employees',
    to: '/uikit/menu/payment'
  },
]);
</script>

<template>
  <h2>Create Company</h2>
  <div class="col-12 md:col-12">
    <div class="card card-w-title">
      <h4>Steps</h4>
      <p>Follow the four steps below to add a new Company.<br/>
        Please make sure all information is accurate.</p>
      <Steps :model="nestedRouteItems" @click="alert('Hello')" :readonly="false" />
      <router-view />
    </div>
  </div>

  <!-- company details form -->
  <div class="ml-3">
  <div class="grid">
    <div class="col-12 md:col-12 ">
        <div class="formgrid grid">
          <div class="field col-4">
            <label for="companyName">Company/Business name*</label>
            <InputText id="companyName" optionLabel="companyName" type="text" style="width:100%;height:45px" />
          </div>
          <div class="field col-4">
            <label for="name2">Legal Structure*</label>
            <Dropdown v-model="dropdownValue" :options="dropdownValues" optionLabel="name" placeholder="Select" style="width:100%;height:45px" />
          </div>
      </div>
    </div>
  </div>
  <div class="grid">
    <div class="col-12 md:col-12">
      <div class="formgrid grid">
        <div class="field col-4">
          <label for="yourpostCode">Type your postcode</label>
          <InputText id="yourpostCode" optionLabel="yourpostCode" type="text" style="width:100%;height:45px" />
        </div>
        <div class="field col-4">
          <label for="postCode">Postcode*</label>
          <InputText id="postCode" optionLabel="postCode" type="text" style="width:100%;height:45px" />
        </div>
      </div>
    </div>
  </div>
  <div class="grid">
    <div class="col-12 md:col-12">
      <div class="formgrid grid">
        <div class="field col-4">
          <label for="address1">Address Line 1*</label>
          <InputText id="address1" optionLabel="address1" type="text" style="width:100%;height:45px" />
        </div>
        <div class="field col-4">
          <label for="address2">Address Line 2</label>
          <InputText id="address2" optionLabel="address2" type="text" style="width:100%;height:45px" />
        </div>
      </div>
    </div>
  </div>
  <div class="grid">
    <div class="col-12 md:col-12 ">
      <div class="formgrid grid">
        <div class="field col-12">
          <label for="address2">City*</label>
          <br>
          <InputText id="address2" optionLabel="address2" type="text" style="width:29%;height:45px" />
        </div>
      </div>
    </div>
  </div>
  <h5>Director / Authorised Signatory</h5>
  <p>Which Director or Authorised Signatory is going up on behalf of the company?</p>
  <div class="grid">
    <div class="col-12 md:col-12 mt-5">
      <div class="formgrid grid">
        <div class="field col-12">
          <label for="dir">Full Name*</label>
          <br>
          <InputText id="address2" optionLabel="address2" type="text" style="width:29%;height:45px" />
        </div>
      </div>
    </div>
  </div>
  <p>You can only setup an account for a company that you lawfully represent or work for.</p>

  <div class="grid">
      <div class="col-12">
          <div class="field-checkbox mb-0">
              <Checkbox id="checkOption1" name="option" value="Chicago" v-model="checkboxValue" />
              <label for="checkOption1">I confirm that I'm authorised to act on behalf of the company</label>
          </div>
      </div>
      <div class="col-12">
          <div class="field-checkbox mb-0">
              <Checkbox id="checkOption2" name="option" value="Los Angeles" v-model="checkboxValue" />
              <label for="checkOption2">I confirm that I have read and agreed the terms and conditions</label>
          </div>
      </div>
  </div>
  <br>
  <Button label="Continue" class="mr-2 mb-2"></Button>
</div>
</template>

<style scoped lang="scss">

</style>