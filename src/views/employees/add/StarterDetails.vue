<template>

  <div class="grid">
    <div class="col-12 md:col-12 mt-5">

      <div class="formgrid grid">
        <div class="field col-4">
          <label for="name2">Starter Type* </label>
          <Dropdown v-model="details.starter_type" :options="starterType" optionLabel="name" placeholder="Select" style="width:100%;height:45px;" />
          <span v-if="validationErrors.starter_type" class="font-medium validation-text p-2">
              {{validationErrors.starter_type}}
            </span>
        </div>
      </div>
    </div>
  </div>

  <!-- WITH P45 SECTION  -->
  <template v-if="details.starter_type && details.starter_type.code=='New Employee With P45'">
    <div class="grid">
      <div class="col-12 md:col-12">

          <div class="formgrid grid">
            <div class="field col-4">
              <label for="Surname">TaxCode*</label>
              <InputText v-model="details.tax_code" id="Surname" type="text" />
              <span v-if="validationErrors.tax_code" class="font-medium validation-text p-2">
              {{validationErrors.tax_code}}
            </span>
            </div>
          </div>

          <div class="formgrid grid mt-3">
            <div class="field col-12" >
              <Strong for="Forename">Tax Basis*</Strong>
              <span v-if="validationErrors.tax_basis" class="font-medium validation-text p-2">
              {{validationErrors.tax_basis}}
            </span>

            </div>
            <div class="col-12 md:col-2">
              <div class="field-radiobutton mb-0">
                <RadioButton id="option1" name="option" value="Cumulative" v-model="details.tax_basis" />
                <label for="option1">Cumulative</label>
              </div>
            </div>
            <div class="col-12 md:col-2">
              <div class="field-radiobutton mb-0">
                <RadioButton id="option2" name="option" value="Non-Cumulative" v-model="details.tax_basis" />
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
            <InputText v-model="details.previous_taxable_salary" id="WorkEmail" type="number" />
            <span v-if="validationErrors.previous_taxable_salary" class="font-medium validation-text p-2">
              {{validationErrors.previous_taxable_salary}}
            </span>
          </div>
          <div class="field col-4">
            <label for="phone">Previous tax paid*</label>
            <InputText v-model="details.previous_tax_paid" id="phone" type="number" />
            <span v-if="validationErrors.previous_tax_paid" class="font-medium validation-text p-2">
              {{validationErrors.previous_tax_paid}}
            </span>
          </div>
        </div>
      </div>
    </div>
  </template>

  <!-- WITHOUT P45 SECTION  -->
  <template v-if="details.starter_type && details.starter_type.code=='New Employee Without P45'">
    <div class="grid">
      <div class="col-12 md:col-12">

          <div class="formgrid grid">
            <div class="field col-4">
              <label for="name2">Starter Declaration*</label>
              <Dropdown v-model="details.starter_declaration" :options="starterDeclaration" optionLabel="name" placeholder="Select" style="width:100%;height:45px;" />
              <span v-if="validationErrors.starter_declaration" class="font-medium validation-text p-2">
              {{validationErrors.starter_declaration}}
            </span>
            </div>
          </div>

          <div class="formgrid grid">
            <div class="field col-4">
              <label for="Surname">TaxCode*</label>
              <InputText v-model="details.tax_code" id="Surname" type="text" />
              <span v-if="validationErrors.tax_code" class="font-medium validation-text p-2">
              {{validationErrors.tax_code}}
            </span>
            </div>
          </div>

          <div class="formgrid grid mt-3">
            <div class="field col-12" >
              <Strong for="Forename">Tax Basis*</Strong>
              <span v-if="validationErrors.tax_basis" class="font-medium validation-text p-2">
              {{validationErrors.tax_basis}}
            </span>

            </div>
            <div class="col-12 md:col-2">
              <div class="field-radiobutton mb-0">
                <RadioButton id="option1" name="option" value="Cumulative" v-model="details.tax_basis" />
                <label for="option1">Cumulative</label>
              </div>
            </div>
            <div class="col-12 md:col-2">
              <div class="field-radiobutton mb-0">
                <RadioButton id="option2" name="option" value="Non-Cumulative" v-model="details.tax_basis" />
                <label for="option2">Non-Cumulative(W1/M1)</label>
              </div>
            </div>
          </div>
          
      </div>
    </div>

  </template>

  <!-- EXISTING EMPLOYEE SECTION  -->
  <template v-if="details.starter_type && details.starter_type.code=='Existing Employee'">
    <h5>Tax details for the year to date</h5>
    <hr>

    <div class="grid">
      <div class="col-12 md:col-12">

          <div class="formgrid grid">
            <div class="field col-4">
              <label for="name2">Starter Declaration*</label>
              <Dropdown v-model="details.starter_declaration" :options="starterDeclaration" optionLabel="name" placeholder="Select" style="width:100%;height:45px;" />
              <span v-if="validationErrors.starter_declaration" class="font-medium validation-text p-2">
              {{validationErrors.starter_declaration}}
            </span>
            </div>
          </div>

          <div class="formgrid grid">
            <div class="field col-4">
              <label for="Surname">TaxCode*</label>
              <InputText v-model="details.tax_code" id="Surname" type="text" />
              <span v-if="validationErrors.tax_code" class="font-medium validation-text p-2">
              {{validationErrors.tax_code}}
            </span>
            </div>
          </div>

          <div class="formgrid grid mt-3">
            <div class="field col-12" >
              <Strong for="Forename">Tax Basis*</Strong>
              <span v-if="validationErrors.tax_basis" class="font-medium validation-text p-2">
              {{validationErrors.tax_basis}}
            </span>
            </div>

            <div class="col-12 md:col-2">
              <div class="field-radiobutton mb-0">
                <RadioButton id="option1" name="option" value="Cumulative" v-model="details.tax_basis" />
                <label for="option1">Cumulative</label>
              </div>
            </div>

            <div class="col-12 md:col-2">
              <div class="field-radiobutton mb-0">
                <RadioButton id="option2" name="option" value="Non-Cumulative" v-model="details.tax_basis" />
                <label for="option2">Non-Cumulative(W1/M1)</label>
              </div>
            </div>

          </div>

          <div class="formgrid grid mt-5">
            <div class="field col-4">
              <label for="Surname">Current Employment Taxable Pay YTD*</label>
              <InputText v-model="details.current_employment_taxable_pay_ytd" id="Surname" type="number" />
              <span v-if="validationErrors.current_employment_taxable_pay_ytd" class="font-medium validation-text p-2">
              {{validationErrors.current_employment_taxable_pay_ytd}}
            </span>
            </div>
            <div class="field col-4">
              <label for="Surname">Current Employment Tax Paid YTD*</label>
              <InputText v-model="details.current_employment_tax_paid_ytd" id="Surname" type="number" />
              <span v-if="validationErrors.current_employment_tax_paid_ytd" class="font-medium validation-text p-2">
              {{validationErrors.current_employment_tax_paid_ytd}}
            </span>
            </div>
          </div>

          <h5>National insurance details for the year to date</h5>
          <hr>

          <div class="formgrid grid mt-5">
            <div class="field col-4">
              <label for="Surname">NI Category*</label>
              <Dropdown v-model="details.ni_category" :options="NICategories" optionLabel="name" placeholder="Select" style="width:100%;height:45px;"  />
              <span v-if="validationErrors.ni_category" class="font-medium validation-text p-2">
              {{validationErrors.ni_category}}
            </span>
            </div>
            <div class="field col-4">
              <label for="Surname">Gross earnings for NIC YTD*</label>
              <InputText v-model="details.gross_earnings_for_nic_ytd" id="Surname" type="number" />
              <span v-if="validationErrors.gross_earnings_for_nic_ytd" class="font-medium validation-text p-2">
              {{validationErrors.gross_earnings_for_nic_ytd}}
            </span>
            </div>
          </div>

          <div class="formgrid grid mt-5">
            <div class="field col-4">
              <label for="Surname">Earnings at LEL YTD*</label>
              <InputText v-model="details.earnings_at_lel_ytd" id="Surname" type="number" />
              <span v-if="validationErrors.earnings_at_lel_ytd" class="font-medium validation-text p-2">
              {{validationErrors.earnings_at_lel_ytd}}
            </span>
            </div>
            <div class="field col-4">
              <label for="Surname">Earnings at PT YTD*</label>
              <InputText v-model="details.earnings_at_pt_ytd" id="Surname" type="number" />
              <span v-if="validationErrors.earnings_at_pt_ytd" class="font-medium validation-text p-2">
              {{validationErrors.earnings_at_pt_ytd}}
            </span>
            </div>
          </div>

          <div class="formgrid grid mt-5">
            <div class="field col-4">
              <label for="Surname">Earnings at UEL YTD*</label>
              <InputText v-model="details.earnings_at_uel_ytd" id="Surname" type="number" />
              <span v-if="validationErrors.earnings_at_uel_ytd" class="font-medium validation-text p-2">
              {{validationErrors.earnings_at_uel_ytd}}
            </span>
            </div>
            <div class="field col-4">
              <label for="Surname">Employee NIC YTD*</label>
              <InputText v-model="details.employee_nic_ytd" id="Surname" type="text" />
              <span v-if="validationErrors.employee_nic_ytd" class="font-medium validation-text p-2">
              {{validationErrors.employee_nic_ytd}}
            </span>
            </div>
          </div>

          <div class="formgrid grid mt-5">
            <div class="field col-4">
              <label for="Surname">Employer NIC YTD*</label>
              <InputText v-model="details.employer_nic_ytd" id="Surname" type="text" />
              <span v-if="validationErrors.employer_nic_ytd" class="font-medium validation-text p-2">
              {{validationErrors.employer_nic_ytd}}
            </span>
            </div>
          </div>


          <h5>Pension contributions and payrolled benefits for the year to date</h5>
          <hr>

          <div class="formgrid grid mt-5">
            <div class="field col-4">
              <label for="Surname">Employee pension contributions YTD*</label>
              <InputText v-model="details.employee_pension_contributions_ytd" id="Surname" type="number" />
              <span v-if="validationErrors.employee_pension_contributions_ytd" class="font-medium validation-text p-2">
              {{validationErrors.employee_pension_contributions_ytd}}
            </span>
            </div>
            <div class="field col-4">
              <label for="Surname">Payrolled benefits YTD*</label>
              <InputText v-model="details.payrolled_benefits_ytd" id="Surname" type="number" />
              <span v-if="validationErrors.payrolled_benefits_ytd" class="font-medium validation-text p-2">
              {{validationErrors.payrolled_benefits_ytd}}
            </span>
            </div>
          </div>
          
          
          <h5>Current employment statutory payments and loans for the year to date</h5>
          <hr>

          <div class="formgrid grid mt-3">
            <div class="field col-12" >
              <p for="Forename">Has the employee been paid statutory or student loans ?</p>
              <span v-if="validationErrors.employment_statutory_payments_loans" class="font-medium validation-text p-2">
              {{validationErrors.employment_statutory_payments_loans}}
            </span>
            </div>

            <div class="col-12 md:col-2">
              <div class="field-radiobutton mb-0">
                <RadioButton id="option1" name="option" value="Yes" v-model="details.employment_statutory_payments_loans" />
                <label for="option1">Yes</label>
              </div>
            </div>

            <div class="col-12 md:col-2">
              <div class="field-radiobutton mb-0">
                <RadioButton id="option2" name="option" value="No" v-model="details.employment_statutory_payments_loans" />
                <label for="option2">No</label>
              </div>
            </div>

          </div>

          <template v-if="details.employment_statutory_payments_loans=='Yes'">

            
          <div class="formgrid grid mt-5">
            <div class="field col-4">
              <label for="Surname">Total Statutory Sick Pay</label>
              <InputText v-model="details.total_statutory_sick_pay" id="Surname" type="number" />
              <span v-if="validationErrors.total_statutory_sick_pay" class="font-medium validation-text p-2">
              {{validationErrors.total_statutory_sick_pay}}
            </span>
            </div>
            <div class="field col-4">
              <label for="Surname">Total Statutory Maternity Pay</label>
              <InputText v-model="details.total_statutory_maternity_pay" id="Surname" type="number" />
              <span v-if="validationErrors.total_statutory_maternity_pay" class="font-medium validation-text p-2">
              {{validationErrors.total_statutory_maternity_pay}}
            </span>
            </div>
          </div>

          <div class="formgrid grid mt-5">
            <div class="field col-4">
              <label for="Surname">Total Statutory Paternity Pay</label>
              <InputText v-model="details.total_statutory_paternity_pay" id="Surname" type="number" />
              <span v-if="validationErrors.total_statutory_paternity_pay" class="font-medium validation-text p-2">
              {{validationErrors.total_statutory_paternity_pay}}
            </span>
            </div>
            <div class="field col-4">
              <label for="Surname">Total Shared Parental Pay</label>
              <InputText v-model="details.total_shared_parental_pay" id="Surname" type="number" />
              <span v-if="validationErrors.total_shared_parental_pay" class="font-medium validation-text p-2">
              {{validationErrors.total_shared_parental_pay}}
            </span>
            </div>
          </div>

          <div class="formgrid grid mt-5">
            <div class="field col-4">
              <label for="Surname">Total Statutory Adoption Pay</label>
              <InputText v-model="details.total_statutory_adoption_pay" id="Surname" type="number" />
              <span v-if="validationErrors.total_statutory_adoption_pay" class="font-medium validation-text p-2">
              {{validationErrors.total_statutory_adoption_pay}}
            </span>
            </div>
            <div class="field col-4">
              <label for="Surname">Total Statutory Parental Bereavement Pay</label>
              <InputText v-model="details.total_statutory_parental_bereavement_pay" id="Surname" type="number" />
              <span v-if="validationErrors.total_statutory_parental_bereavement_pay" class="font-medium validation-text p-2">
              {{validationErrors.total_statutory_parental_bereavement_pay}}
            </span>
            </div>
          </div>

          <div class="formgrid grid mt-5">
            <div class="field col-4">
              <label for="Surname">Total student loan deductions</label>
              <InputText v-model="details.total_student_loan_deductions" id="Surname" type="number" />
              <span v-if="validationErrors.total_student_loan_deductions" class="font-medium validation-text p-2">
              {{validationErrors.total_student_loan_deductions}}
            </span>
            </div>
            <div class="field col-4">
              <label for="Surname">Total postgraduate loan deductions</label>
              <InputText v-model="details.total_postgraduate_loan_deductions" id="Surname" type="number" />
              <span v-if="validationErrors.total_postgraduate_loan_deductions" class="font-medium validation-text p-2">
              {{validationErrors.total_postgraduate_loan_deductions}}
            </span>
            </div>
          </div>
          
          </template>
      </div>
    </div>
  </template>

  <Button @click="saveDetails()" label="Continue" class="ml-2 mt-3"></Button>
</template>


<script>
export default {
  data() {
    return {
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
      selectedDeclaration: null,
      gender: null,
      validationErrors:[],
      details:{
        starter_type:'',
        tax_code:'',
        previous_taxable_salary:'',
        previous_tax_paid:'',
        tax_basis:'',
        starter_declaration:'',
        current_employment_taxable_pay_ytd:'',
        current_employment_tax_paid_ytd:'',
        employee_pension_contributions_ytd:'',
        payrolled_benefits_ytd:'',
        employment_statutory_payments_loans:'',

        ni_category:'',
        gross_earnings_for_nic_ytd:'',
        earnings_at_lel_ytd:'',
        earnings_at_pt_ytd:'',
        earnings_at_uel_ytd:'',
        employee_nic_ytd:'',
        employer_nic_ytd:'',

        total_statutory_maternity_pay:'',
        total_statutory_paternity_pay:'',
        total_shared_parental_pay:'',
        total_statutory_adoption_pay:'',
        total_statutory_parental_bereavement_pay:'',
        total_postgraduate_loan_deductions:'',
        total_student_loan_deductions:'',
        total_statutory_sick_pay:'',
      },

    };
  },
  methods:{

    saveDetails(){
      let optionalFields=[]
      
      const salaryTypeCode = this.details.starter_type.code;
      if (salaryTypeCode === 'New Employee With P45') {
        optionalFields = [
        'starter_declaration',
        'current_employment_taxable_pay_ytd',
        'current_employment_tax_paid_ytd',
        'employee_pension_contributions_ytd',
        'payrolled_benefits_ytd',
        'employment_statutory_payments_loans',
        'ni_category',
        'gross_earnings_for_nic_ytd',
        'earnings_at_lel_ytd',
        'earnings_at_pt_ytd',
        'earnings_at_uel_ytd',
        'employee_nic_ytd',
        'employer_nic_ytd',
        'total_statutory_maternity_pay',
        'total_statutory_paternity_pay',
        'total_shared_parental_pay',
        'total_statutory_adoption_pay',
        'total_statutory_parental_bereavement_pay',
        'total_postgraduate_loan_deductions',
        'total_student_loan_deductions',
        'total_statutory_sick_pay',
        ];
      } else if (salaryTypeCode === 'New Employee Without P45') {
        optionalFields = [
        'previous_taxable_salary',
        'previous_tax_paid',
        'current_employment_taxable_pay_ytd',
        'current_employment_tax_paid_ytd',
        'employee_pension_contributions_ytd',
        'payrolled_benefits_ytd',
        'employment_statutory_payments_loans',
        'ni_category',
        'gross_earnings_for_nic_ytd',
        'earnings_at_lel_ytd',
        'earnings_at_pt_ytd',
        'earnings_at_uel_ytd',
        'employee_nic_ytd',
        'employer_nic_ytd',
        'total_statutory_maternity_pay',
        'total_statutory_paternity_pay',
        'total_shared_parental_pay',
        'total_statutory_adoption_pay',
        'total_statutory_parental_bereavement_pay',
        'total_postgraduate_loan_deductions',
        'total_student_loan_deductions',
        'total_statutory_sick_pay',
        ];
      } else if (salaryTypeCode === 'Existing Employee') {
        if(this.details.employment_statutory_payments_loans=='No'){
          optionalFields = [
          'previous_taxable_salary',
          'previous_tax_paid',
          'total_statutory_maternity_pay',
          'total_statutory_paternity_pay',
          'total_shared_parental_pay',
          'total_statutory_adoption_pay',
          'total_statutory_parental_bereavement_pay',
          'total_postgraduate_loan_deductions',
          'total_student_loan_deductions',
          'total_statutory_sick_pay',
          ];
        }else if(this.details.employment_statutory_payments_loans=='Yes'){
          optionalFields = [
          'previous_taxable_salary',
          'previous_tax_paid',
          ];
        }
      }

      this.validationErrors = this.$validateFormData(this.details, optionalFields);
      console.log('validations',this.validationErrors)
      if (Object.keys(this.validationErrors).length === 0 ) {
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