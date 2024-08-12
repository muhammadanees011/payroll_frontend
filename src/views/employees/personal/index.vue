<script setup>
import { ref } from "vue";

const titleValues = ref([
  { name: 'Mr', code: 'Mr' },
  { name: 'Mrs', code: 'Mrs' },
]);
const genderValues = ref([
  { name: 'Male', code: 'male'},
  { name: 'Female',code: 'female'},
]);
const title = ref(null);
const gender = ref(null);

</script>

<template>
  <div class="grid">
    <div class="col-12 md:col-12 mt-5">
        <div class="formgrid grid">
          <div class="field col-3">
            <label for="name2">Title: </label>
            <Dropdown v-model="title" :options="titleValues" optionLabel="name" placeholder="Select" style="width:100%" />
          </div>
          <div class="field col">
            <label for="Forename">Forename</label>
            <InputText id="Forename" type="text" />
          </div>
          <div class="field col">
            <label for="Surname">Surname</label>
            <InputText id="Surname" type="email" />
          </div>
          <div class="field col-3">
            <label for="Gender">Gender</label>
            <Dropdown v-model="title" :options="titleValues" optionLabel="gender" placeholder="Select Gender" style="width:100%" />
          </div>
<!--          <div class="field col">-->
<!--            <label for="email">Email</label>-->
<!--            <InputText id="email" type="email" />-->
<!--          </div>-->
      </div>
    </div>
  </div>
  <div class="grid">
    <div class="col-12 md:col-12 mt-5">
      <div class="formgrid grid">
        <div class="field col form-group">
          <label for="name2">Date of Birth* </label>
          <InputText id="name2" type="text" />
        </div>
        <div class="field col">
          <label for="WorkEmail">Work Email</label>
          <InputText id="WorkEmail" type="email" />
        </div>
        <div class="field col">
          <label for="phone">Telephone (Optional)</label>
          <InputText id="phone" type="number" />
        </div>
        <div class="field col">
          <label for="NI_Category">NI Category</label>
          <InputText id="NI_Category" type="email" />
        </div>
      </div>
    </div>
  </div>
  <h5>Address</h5>
  <div class="grid">
    <div class="col-12 md:col-12 mt-5">
      <div class="formgrid grid">
        <div class="field col form-group">
          <label for="name2">Postcode* </label>
          <InputText id="name2" type="text" />
        </div>
        <div class="field col">
          <label for="WorkEmail">Address Line 1*</label>
          <InputText id="WorkEmail" type="email" />
        </div>
        <div class="field col">
          <label for="phone">Address Line 2 (Optional)</label>
          <InputText id="phone" type="number" />
        </div>
        <div class="field col">
          <label for="NI_Category">City*</label>
          <InputText id="NI_Category" type="email" />
        </div>
      </div>
      <div class="formgrid grid">
        <div class="field col form-group">
          <div for="country">Country* </div>
          <InputText id="country" type="text" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>