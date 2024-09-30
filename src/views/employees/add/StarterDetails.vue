<template>

  <div class="grid">
    <div class="col-12 md:col-12 mt-5">

      <div class="formgrid grid">
        <div class="field col-4">
          <label for="name2">Starter Type* </label>
          <Dropdown v-model="selectedType" :options="starterType" optionLabel="name" placeholder="Select" style="width:100%;height:45px;" />
        </div>
      </div>
    </div>
  </div>

  <!-- WITH P45 SECTION  -->
  <template v-if="selectedType && selectedType.code=='New Employee With P45'">
    <div class="grid">
      <div class="col-12 md:col-12">

          <div class="formgrid grid">
            <div class="field col-4">
              <label for="Surname">TaxCode*</label>
              <InputText id="Surname" type="email" />
            </div>
          </div>

          <div class="formgrid grid mt-3">
            <div class="field col-12" >
              <Strong for="Forename">Tax Basis*</Strong>

            </div>
            <div class="col-12 md:col-2">
              <div class="field-radiobutton mb-0">
                <RadioButton id="option1" name="option" value="No" v-model="radioValue" />
                <label for="option1">Cumulative</label>
              </div>
            </div>
            <div class="col-12 md:col-2">
              <div class="field-radiobutton mb-0">
                <RadioButton id="option2" name="option" value="Yes" v-model="radioValue" />
                <label for="option2">Non-Cumulative(W1/M1)</label>
              </div>
            </div>
          </div>
          
      </div>
    </div>

    <div class="grid">
      <div class="col-12 md:col-12">
        <div class="formgrid grid">
          <div class="field col-4">
            <label for="WorkEmail">Previous taxable salary*</label>
            <InputText id="WorkEmail" type="number" />
          </div>
          <div class="field col-4">
            <label for="phone">Previous tax paid*</label>
            <InputText id="phone" type="number" />
          </div>
        </div>
      </div>
    </div>
  </template>

  <!-- WITHOUT P45 SECTION  -->
  <template v-if="selectedType && selectedType.code=='New Employee Without P45'">
    <div class="grid">
      <div class="col-12 md:col-12">

          <div class="formgrid grid">
            <div class="field col-4">
              <label for="name2">Starter Declaration*</label>
              <Dropdown v-model="selectedDeclaration" :options="starterDeclaration" optionLabel="name" placeholder="Select" style="width:100%;height:45px;" />
            </div>
          </div>

          <div class="formgrid grid">
            <div class="field col-4">
              <label for="Surname">TaxCode*</label>
              <InputText id="Surname" type="email" />
            </div>
          </div>

          <div class="formgrid grid mt-3">
            <div class="field col-12" >
              <Strong for="Forename">Tax Basis*</Strong>

            </div>
            <div class="col-12 md:col-2">
              <div class="field-radiobutton mb-0">
                <RadioButton id="option1" name="option" value="No" v-model="radioValue" />
                <label for="option1">Cumulative</label>
              </div>
            </div>
            <div class="col-12 md:col-2">
              <div class="field-radiobutton mb-0">
                <RadioButton id="option2" name="option" value="Yes" v-model="radioValue" />
                <label for="option2">Non-Cumulative(W1/M1)</label>
              </div>
            </div>
          </div>
          
      </div>
    </div>

  </template>

  <!-- WITHOUT P45 SECTION  -->
  <template v-if="selectedType && selectedType.code=='Existing Employee'">
    <h5>Tax details for the year to date</h5>
    <hr>

    <div class="grid">
      <div class="col-12 md:col-12">

          <div class="formgrid grid">
            <div class="field col-4">
              <label for="name2">Starter Declaration*</label>
              <Dropdown v-model="selectedDeclaration" :options="starterDeclaration" optionLabel="name" placeholder="Select" style="width:100%;height:45px;" />
            </div>
          </div>

          <div class="formgrid grid">
            <div class="field col-4">
              <label for="Surname">TaxCode*</label>
              <InputText id="Surname" type="email" />
            </div>
          </div>

          <div class="formgrid grid mt-3">
            <div class="field col-12" >
              <Strong for="Forename">Tax Basis*</Strong>
            </div>

            <div class="col-12 md:col-2">
              <div class="field-radiobutton mb-0">
                <RadioButton id="option1" name="option" value="No" v-model="radioValue" />
                <label for="option1">Cumulative</label>
              </div>
            </div>

            <div class="col-12 md:col-2">
              <div class="field-radiobutton mb-0">
                <RadioButton id="option2" name="option" value="Yes" v-model="radioValue" />
                <label for="option2">Non-Cumulative(W1/M1)</label>
              </div>
            </div>

          </div>

          <div class="formgrid grid mt-5">
            <div class="field col-4">
              <label for="Surname">Current Employment Taxable Pay YTD*</label>
              <InputText id="Surname" type="email" />
            </div>
            <div class="field col-4">
              <label for="Surname">Current Employment Tax Paid YTD*</label>
              <InputText id="Surname" type="email" />
            </div>
          </div>

          <h5>National insurance details for the year to date</h5>
          <hr>

          <div class="formgrid grid mt-5">
            <div class="field col-4">
              <label for="Surname">NI Category*</label>
              <InputText id="Surname" type="email" />
            </div>
            <div class="field col-4">
              <label for="Surname">Gross earnings for NIC YTD*</label>
              <InputText id="Surname" type="email" />
            </div>
          </div>

          <div class="formgrid grid mt-5">
            <div class="field col-4">
              <label for="Surname">Earnings at LEL YTD*</label>
              <InputText id="Surname" type="email" />
            </div>
            <div class="field col-4">
              <label for="Surname">Earnings at PT YTD*</label>
              <InputText id="Surname" type="email" />
            </div>
          </div>

          <div class="formgrid grid mt-5">
            <div class="field col-4">
              <label for="Surname">Earnings at UEL YTD*</label>
              <InputText id="Surname" type="email" />
            </div>
            <div class="field col-4">
              <label for="Surname">Employee NIC YTD*</label>
              <InputText id="Surname" type="email" />
            </div>
          </div>

          <div class="formgrid grid mt-5">
            <div class="field col-4">
              <label for="Surname">Employer NIC YTD*</label>
              <InputText id="Surname" type="email" />
            </div>
          </div>


          <h5>Pension contributions and payrolled benefits for the year to date</h5>
          <hr>

          <div class="formgrid grid mt-5">
            <div class="field col-4">
              <label for="Surname">Employee pension contributions YTD*</label>
              <InputText id="Surname" type="number" />
            </div>
            <div class="field col-4">
              <label for="Surname">Payrolled benefits YTD*</label>
              <InputText id="Surname" type="number" />
            </div>
          </div>
          
          
          <h5>Current employment statutory payments and loans for the year to date</h5>
          <hr>

          <div class="formgrid grid mt-3">
            <div class="field col-12" >
              <p for="Forename">Has the employee been paid statutory or student loans ? {{ has_statutory_or_student_loans }}</p>
            </div>

            <div class="col-12 md:col-2">
              <div class="field-radiobutton mb-0">
                <RadioButton id="option1" name="option" value="Yes" v-model="has_statutory_or_student_loans" />
                <label for="option1">Yes</label>
              </div>
            </div>

            <div class="col-12 md:col-2">
              <div class="field-radiobutton mb-0">
                <RadioButton id="option2" name="option" value="No" v-model="has_statutory_or_student_loans" />
                <label for="option2">No</label>
              </div>
            </div>

          </div>

          <template v-if="has_statutory_or_student_loans=='Yes'">

            
          <div class="formgrid grid mt-5">
            <div class="field col-4">
              <label for="Surname">Total Statutory Sick Pay</label>
              <InputText id="Surname" type="number" />
            </div>
            <div class="field col-4">
              <label for="Surname">Total Statutory Maternity Pay</label>
              <InputText id="Surname" type="number" />
            </div>
          </div>

          <div class="formgrid grid mt-5">
            <div class="field col-4">
              <label for="Surname">Total Statutory Paternity Pay</label>
              <InputText id="Surname" type="number" />
            </div>
            <div class="field col-4">
              <label for="Surname">Total Shared Parental Pay</label>
              <InputText id="Surname" type="number" />
            </div>
          </div>

          <div class="formgrid grid mt-5">
            <div class="field col-4">
              <label for="Surname">Total Statutory Adoption Pay</label>
              <InputText id="Surname" type="number" />
            </div>
            <div class="field col-4">
              <label for="Surname">Total Statutory Parental Bereavement Pay</label>
              <InputText id="Surname" type="number" />
            </div>
          </div>

          <div class="formgrid grid mt-5">
            <div class="field col-4">
              <label for="Surname">Total student loan deductions</label>
              <InputText id="Surname" type="number" />
            </div>
            <div class="field col-4">
              <label for="Surname">Total postgraduate loan deductions</label>
              <InputText id="Surname" type="number" />
            </div>
          </div>
          
          </template>

      </div>
    </div>
  </template>
 

</template>


<script>
export default {
  data() {
    return {
      starterType: [
        { name: 'New Employee With P45', code: 'New Employee With P45' },
        { name: 'New Employee Without P45', code: 'New Employee Without P45' },
        { name: 'Existing Employee', code: 'Existing Employee' },
      ],
      starterDeclaration: [
        { name: 'First job since start of tax year', code: 'First job since start of tax year' },
        { name: 'Currently only job', code: 'Currently only job' },
        { name: 'Got another job or pension', code: 'Got another job or pension' },
      ],
      selectedType: null,
      selectedDeclaration: null,
      has_statutory_or_student_loans:null,
      gender: null,
    };
  },
  methods:{
    
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