<script setup>
import { ref } from "vue";
import StepProgress from 'vue-step-progress';
const checkboxValue = ref([]);
const dropdownValue = ref(null);
const currentStep = ref(0);
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
</div>
</template>

<style scoped lang="scss">
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

/*# sourceMappingURL=main.css.map*/
</style>