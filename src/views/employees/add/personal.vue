<template>
  <div class="grid">
    <div class="col-12 md:col-12 mt-5">
        <div class="formgrid grid">
          <div class="field col-4">
            <label for="name">Title* </label>
            <Dropdown v-model="details.title" :options="titleValues" optionLabel="name" placeholder="Select" style="width:100%;height:45px;" />
            <span v-if="validationErrors.title" class="font-medium validation-text p-2">
              {{validationErrors.title}}
            </span>
          </div>
          <div class="field col-4">
            <label for="Forename">Forename*</label>
            <InputText v-model="details.forename" id="Forename" type="text" />
            <span v-if="validationErrors.forename" class="font-medium validation-text p-2">
              {{validationErrors.forename}}
            </span>
          </div>
        </div>
        <div class="formgrid grid">
          <div class="field col-4">
            <label for="Surname">Surname*</label>
            <InputText v-model="details.surname" id="Surname" type="text" />
            <span v-if="validationErrors.surname" class="font-medium validation-text p-2">
              {{validationErrors.surname}}
            </span>
          </div>
          <div class="field col-4">
            <label for="gender">Gender*</label>
            <Dropdown v-model="details.gender" :options="genderValues" optionLabel="name" placeholder="Select" style="width:100%;height:45px;" />
            <span v-if="validationErrors.gender" class="font-medium validation-text p-2">
              {{validationErrors.gender}}
            </span>
          </div>
        </div>
        <div class="formgrid grid">
          <div class="field col-4 form-group">
            <p class="">Date of Birth*</p>
            <Calendar v-model="details.dob" :showIcon="true" :showButtonBar="true"></Calendar>
            <span v-if="validationErrors.dob" class="font-medium validation-text p-2">
              {{validationErrors.dob}}
            </span>
          </div>
        </div>
    </div>
  </div>
  <div class="grid">
    <div class="col-12 md:col-12">
      <div class="formgrid grid">
        <div class="field col-4">
          <label for="WorkEmail">Work Email*</label>
          <InputText v-model="details.work_email"  id="WorkEmail" type="email" />
          <span v-if="validationErrors.work_email" class="font-medium validation-text p-2">
              {{validationErrors.work_email}}
            </span>
        </div>
        <div class="field col-4">
          <label for="phone">Telephone (Optional)</label>
          <InputText v-model="details.telephone" id="phone" type="number" />
          <span v-if="validationErrors.telephone" class="font-medium validation-text p-2">
              {{validationErrors.telephone}}
            </span>
        </div>
      </div>
    </div>
  </div>
  <div class="grid">
    <div class="col-12 md:col-12">
      <div class="formgrid grid">
        <div class="field col-4">
          <label for="NI_Category">NI Category*</label>
          <Dropdown v-model="details.ni_category" :options="NICategories" optionLabel="name" placeholder="Select" style="width:100%;height:45px;"  />
          <span v-if="validationErrors.ni_category" class="font-medium validation-text p-2">
              {{validationErrors.ni_category}}
            </span>
        </div>
        <div class="field col-4">
          <label for="NI_Number">National Insurance Number (Optional)</label>
          <InputText v-model="details.nino" id="NI_Number" type="text" />
          <span v-if="validationErrors.nino" class="font-medium validation-text p-2">
              {{validationErrors.nino}}
            </span>
        </div>
      </div>
    </div>
  </div>
  <h5>Address Information</h5>
  <div class="grid">
    <div class="col-12 md:col-12 mt-2">
      <div class="formgrid grid">
        <div class="field col-4 form-group">
          <label for="postcode">Postcode* </label>
          <InputText v-model="details.postcode" id="postcode" type="text" />
          <span v-if="validationErrors.postcode" class="font-medium validation-text p-2">
              {{validationErrors.postcode}}
            </span>
        </div>
        <div class="field col-4">
          <label for="address1">Address Line 1*</label>
          <InputText v-model="details.address_line1" id="address1" type="text" />
          <span v-if="validationErrors.address_line1" class="font-medium validation-text p-2">
              {{validationErrors.address_line1}}
            </span>
        </div>
        
      </div>
      <div class="formgrid grid">
        <div class="field col-4">
          <label for="address2">Address Line 2 (Optional)</label>
          <InputText v-model="details.address_line2" id="address2" type="text" />
          <span v-if="validationErrors.address_line2" class="font-medium validation-text p-2">
              {{validationErrors.address_line2}}
            </span>
        </div>
        <div class="field col-4">
          <label for="city">City*</label>
          <InputText v-model="details.city" id="city" type="text" />
          <span v-if="validationErrors.city" class="font-medium validation-text p-2">
              {{validationErrors.city}}
            </span>
        </div>
      </div>
      <div class="formgrid grid">
        <div class="field col-4 form-group">
          <div for="country">Country* </div>
          <InputText v-model="details.country" id="country" type="text" />
          <span v-if="validationErrors.country" class="font-medium validation-text p-2">
              {{validationErrors.country}}
            </span>
        </div>
      </div>
      <br>
      <!-- <Button label="Save And Finish Later" severity="secondary" class="mt-5 ml-2"></Button> -->
      <Button @click="saveDetails()" label="Continue" class="ml-2 mt-3"></Button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      titleValues: [
        { name: 'Mr', code: 'Mr' },
        { name: 'Mrs', code: 'Mrs' },
        { name: 'Miss', code: 'Miss' },
        { name: 'Ms', code: 'Ms' },
      ],
      genderValues: [
        { name: 'Male', code: 'Male' },
        { name: 'Female', code: 'Female' },
      ],
      NICategories: [
        { name: 'A - All Employees Apart from those in groups B,C,H,J,M and Z in this table', code: 'A' },
        { name: 'B - Married women and widows entitled to pay reduced National insurance', code: 'B' },
        { name: 'C - Employees over the state pension age', code: 'C' },
        { name: 'D - Deferred rate contributions for employees in an investment zone special tax site', code: 'D' },
        { name: 'E - Married women reduced rate contribution for employees in an investment zone special tax site', code: 'E' },
        { name: 'F - All employees who work in freeports, apart from those in groups I, L, and S in this table', code: 'F' },
        { name: 'H - Apprentices under 25', code: 'H' },
        { name: 'I - Married women and widows who work in freeports and are entitled to pay reduced National Insurance', code: 'I' },
        { name: 'J - Employees who can defer National Insurance because they’re already paying it in another job', code: 'J' },
        { name: 'K - Employees who work in investment zones and are over State Pension age', code: 'K' },
        { name: 'L - Employees who work in freeports and can defer National Insurance because they’re already paying it in another job', code: 'L' },
        { name: 'M - Employees under 21', code: 'M' },
        { name: 'N - All employees who work in investment zones, apart from those in groups E, D and K in this table', code: 'N' },
        { name: 'S - Employees who work in freeports and are over the State Pension age', code: 'S' },
        { name: 'V - Employees who are working in their first job since leaving the armed forces', code: 'V' },
        { name: 'X - Employers use category letter X for employees who do not have to pay National Insurance, for example because they’re under 16.', code: 'X' },
        { name: 'Z - Employees under 21 who can defer National Insurance because they’re already paying it in another job', code: 'Z' },
      ],
      validationErrors:[],
      details:{
        title:'',
        forename:'',
        surname:'',
        gender:'',
        dob:'',
        work_email:'',
        telephone:'',
        ni_category:'',
        nino:'',
        postcode:'',
        address_line1:'',
        address_line2:'',
        city:'',
        country:''
      },
    };
  },

  methods: {
    saveDetails(){
      const optionalFields = ['telephone','nino','address_line2'];
      this.validationErrors = this.$validateFormData(this.details, optionalFields);
      if (Object.keys(this.validationErrors).length === 0 ) {
          this.details.dob=this.$moment(this.details.dob).format('YYYY-MM-DD');
          this.$emit('saveDetails', this.details);
      } else {
          // console.log('Validation errors:', this.validationErrors);
      }
    },
  },
  
};
</script>


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