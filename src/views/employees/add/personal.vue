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
          <div class="field col-4">
            <label for="name2">Title: </label>
            <Dropdown v-model="title" :options="titleValues" optionLabel="name" placeholder="Select" style="width:100%;height:45px;" />
          </div>
          <div class="field col-4">
            <label for="Forename">Forename</label>
            <InputText id="Forename" type="text" />
          </div>
        </div>
        <div class="formgrid grid">
          <div class="field col-4">
            <label for="Surname">Surname</label>
            <InputText id="Surname" type="email" />
          </div>
          <div class="field col-4">
            <label for="Gender">Gender</label>
            <Dropdown v-model="title" :options="titleValues" optionLabel="gender" placeholder="Select Gender" style="width:100%;height:45px;" />
          </div>
        </div>
        <div class="formgrid grid">
          <div class="field col-4 form-group">
            <p class="">Date of Birth*</p>
            <Calendar :showIcon="true" :showButtonBar="true"></Calendar>
          </div>
        </div>
    </div>
  </div>
  <div class="grid">
    <div class="col-12 md:col-12">
      <div class="formgrid grid">
        <div class="field col-4">
          <label for="WorkEmail">Work Email</label>
          <InputText id="WorkEmail" type="email" />
        </div>
        <div class="field col-4">
          <label for="phone">Telephone (Optional)</label>
          <InputText id="phone" type="number" />
        </div>
      </div>
    </div>
  </div>
  <div class="grid">
    <div class="col-12 md:col-12">
      <div class="formgrid grid">
        <div class="field col-4">
          <label for="NI_Category">NI Category</label>
          <InputText id="NI_Category" type="email" />
        </div>
        <div class="field col-4">
          <label for="NI_Category">National Insurance Number (Optional)</label>
          <InputText id="NI_Number" type="email" />
        </div>
      </div>
    </div>
  </div>
  <h5>Address Information</h5>
  <div class="grid">
    <div class="col-12 md:col-12 mt-2">
      <div class="formgrid grid">
        <div class="field col-4 form-group">
          <label for="name2">Postcode* </label>
          <InputText id="name2" type="text" />
        </div>
        <div class="field col-4">
          <label for="WorkEmail">Address Line 1*</label>
          <InputText id="WorkEmail" type="email" />
        </div>
        
      </div>
      <div class="formgrid grid">
        <div class="field col-4">
          <label for="phone">Address Line 2 (Optional)</label>
          <InputText id="phone" type="number" />
        </div>
        <div class="field col-4">
          <label for="NI_Category">City*</label>
          <InputText id="NI_Category" type="email" />
        </div>
      </div>
      <div class="formgrid grid">
        <div class="field col-4 form-group">
          <div for="country">Country* </div>
          <InputText id="country" type="text" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.p-calendar{
  width: 100%;
}
::v-deep input{
    width:100%;
    height:45px !important;
}

::v-deep .step-progress__wrapper-before,
::v-deep .step-progress__wrapper-after{
  height: 1px !important;
}
::v-deep .step-progress__step-label{
  font-size: 12px;
}
::v-deep .step-progress__step span{
  font-size: 15px;
}


::v-deep .step-progress__wrapper {
    margin: 0 auto;
    position: relative;
    width: 90%
}

::v-deep .step-progress__wrapper-before {
    background-color: #27A07A;
    transform: translateY(-50%) perspective(1000px)
}

::v-deep .step-progress__wrapper-after,
::v-deep .step-progress__wrapper-before {
    content: "";
    height: 12px;
    left: 0;
    position: absolute;
    top: 50%;
    width: 100%
}

::v-deep .step-progress__wrapper-after {
    background-color: #27A07A;
    transform: scaleX(0) translateY(-50%) perspective(1000px);
    transform-origin: left center;
    transition: transform .5s ease
}

::v-deep .step-progress__bar {
    align-items: center;
    display: flex;
    height: 100px;
    justify-content: space-between;
    margin-bottom: 40px;
    width: 100%
}

::v-deep .step-progress__step {
    --activeColor: #27A07A !important;
    --passiveColor: #27A07A;
    --activeBorder: 1px;
    --passiveBorder: 1px;
    position: relative;
    z-index: 2
}

::v-deep .step-progress__step span {
    color: var(--passiveColor);
    display: block;
    font-size: 13px !important;
    font-weight: 600;
    opacity: 1;
    text-align: center;
    transform: translateZ(0) scale(1) perspective(1000px);
    transition: .3s ease
}

@media(max-width:767px) {
    .step-progress__step span {
        font-size: 13px
    }
}

::v-deep .step-progress__step--active .step-progress__step-label,
::v-deep .step-progress__step--active span {
    color: var(--activeColor)
}

::v-deep .step-progress__step--active .step-progress__step-icon {
    opacity: 1
}

::v-deep .step-progress__step--valid .step-progress__step-icon {
    opacity: 1;
    transform: translate3d(-50%, -50%, 0) scale(1) perspective(1000px)
}

::v-deep .step-progress__step--valid span {
    color: var(--activeColor);
    opacity: 0;
    transform: translateZ(0) scale(2) perspective(1000px)
}

::v-deep .step-progress__step--valid .step-progress__step-label {
    color: var(--activeColor)
}

::v-deep .step-progress__step:after {
    background-color: #fff;
    border: 3px solid #27A07A;
    border-radius: 50%;
    content: "";
    height: 25px;
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%) perspective(1000px);
    transition: .3s ease;
    width: 25px;
    z-index: -1
}

@media(max-width:767px) {
    .step-progress__step:after {
        height: 25px;
        width: 25px
    }
}

::v-deep .step-progress__step--active:after,
.step-progress__step--valid:after {
    border: 5px solid #27A07A;
}

::v-deep .step-progress__step--valid:after {
    background-color: var(--activeColor);
}

::v-deep .step-progress__step-label {
    color: #27A07A;
    font-size: 12px;
    font-weight: 600;
    left: 50%;
    position: absolute;
    top: calc(100% + 25px);
    transform: translateX(-50%) perspective(1000px);
    transition: .3s ease;
    white-space: nowrap
}

::v-deep .step-progress__step-icon {
    color: #fff;
    font-size: 12px;
    left: 50%;
    opacity: 0;
    position: absolute;
    top: 50%;
    transform: translate3d(-50%, -50%, 0) scale(0) perspective(1000px);
    transition: transform .3s ease
}

@media(max-width:767px) {
    .step-progress__step-icon {
        font-size: 12px
    }
}

</style>