<template>
    <div class="grid">
      <div class="col-12 md:col-12 mt-5">
        <h5>Tax</h5>
          <div class="formgrid grid">
            <div class="field col-4">
              <label for="name">Gross for tax* </label>
              <InputText v-model="details.gross_for_tax" id="Forename" type="number" />
              <span v-if="validationErrors.gross_for_tax" class="font-medium validation-text p-2">
                {{validationErrors.gross_for_tax}}
              </span>
            </div>
            <div class="field col-4">
              <label for="Forename">Tax deducted*</label>
              <InputText v-model="details.tax_deducted" id="Forename" type="text" />
              <span v-if="validationErrors.tax_deducted" class="font-medium validation-text p-2">
                {{validationErrors.tax_deducted}}
              </span>
            </div>
            <div class="field col-4">
              <label for="Surname">Student loan*</label>
              <InputText v-model="details.student_loan" id="Surname" type="text" />
              <span v-if="validationErrors.student_loan" class="font-medium validation-text p-2">
                {{validationErrors.student_loan}}
              </span>
            </div>
          </div>
          <div class="formgrid grid">
            
            <div class="field col-4">
              <label for="gender">Postgraduate loan*</label>
              <InputText v-model="details.postgraduate_loan" id="Forename" type="text" />
              <span v-if="validationErrors.postgraduate_loan" class="font-medium validation-text p-2">
                {{validationErrors.postgraduate_loan}}
              </span>
            </div>
            <div class="field col-4 form-group">
              <p class="">Employee pension*</p>
              <InputText v-model="details.employee_pension" id="Forename" type="text" />
              <span v-if="validationErrors.employee_pension" class="font-medium validation-text p-2">
                {{validationErrors.employee_pension}}
              </span>
            </div>
            <div class="field col-4">
                <label for="WorkEmail">Employer pension*</label>
                <InputText v-model="details.employer_pension" id="Forename" type="text" />
                <span v-if="validationErrors.employer_pension" class="font-medium validation-text p-2">
                    {{validationErrors.employer_pension}}
                </span>
            </div>
          </div>
      </div>
    </div>
    <div class="grid">
      <div class="col-12 md:col-12">
        <h5>Benefits</h5>
        <div class="formgrid grid">
          
          <div class="field col-4">
            <label for="phone">Benefit in kind payrolled amount</label>
            <InputText v-model="details.benefit_in_kind_payrolled_amount" id="Forename" type="text" />
            <span v-if="validationErrors.benefit_in_kind_payrolled_amount" class="font-medium validation-text p-2">
                {{validationErrors.benefit_in_kind_payrolled_amount}}
              </span>
          </div>
          <div class="field col-4">
            <label for="phone">Employe net pay pension</label>
            <InputText v-model="details.employe_net_pay_pension" id="Forename" type="text" />
            <span v-if="validationErrors.employe_net_pay_pension" class="font-medium validation-text p-2">
                {{validationErrors.employe_net_pay_pension}}
              </span>
          </div>
        </div>
      </div>
    </div>

    <div class="grid">
      <div class="col-12 md:col-12">
        <h5>Statutory Payments</h5>
        <div class="formgrid grid">
          <div class="field col-4">
            <label for="NI_Category">Statutory maternity pay</label>
            <InputText v-model="details.statutory_maternity_pay" id="Forename" type="text" />
            <span v-if="validationErrors.statutory_maternity_pay" class="font-medium validation-text p-2">
                {{validationErrors.statutory_maternity_pay}}
              </span>
          </div>
          <div class="field col-4">
            <label for="NI_Number">Statutory paternity pay</label>
            <InputText v-model="details.statutory_paternity_pay" id="Forename" type="text" />
            <span v-if="validationErrors.statutory_paternity_pay" class="font-medium validation-text p-2">
                {{validationErrors.statutory_paternity_pay}}
              </span>
          </div>
          <div class="field col-4">
            <label for="NI_Number">Statutory adoption pay</label>
            <InputText v-model="details.statutory_adoption_pay" id="Forename" type="text" />
            <span v-if="validationErrors.statutory_adoption_pay" class="font-medium validation-text p-2">
                {{validationErrors.statutory_adoption_pay}}
              </span>
          </div>
        </div>
      </div>
    </div>

    <div class="grid">
      <div class="col-12 md:col-12">
        <div class="formgrid grid">
          <div class="field col-4">
            <label for="NI_Category">Statutory sick pay</label>
            <InputText v-model="details.statutory_sick_pay" id="Forename" type="text" />
            <span v-if="validationErrors.statutory_sick_pay" class="font-medium validation-text p-2">
                {{validationErrors.statutory_sick_pay}}
              </span>
          </div>
          <div class="field col-4">
            <label for="NI_Number">Parental bereavement</label>
            <InputText v-model="details.parental_bereavement" id="Forename" type="text" />
            <span v-if="validationErrors.parental_bereavement" class="font-medium validation-text p-2">
                {{validationErrors.parental_bereavement}}
              </span>
          </div>
          <div class="field col-4">
            <label for="NI_Number">Shared parental pay</label>
            <InputText v-model="details.shared_parental_pay" id="Forename" type="text" />
            <span v-if="validationErrors.shared_parental_pay" class="font-medium validation-text p-2">
                {{validationErrors.shared_parental_pay}}
              </span>
          </div>
        </div>
      </div>
    </div>

    <div class="grid">
      <div class="col-12 md:col-12">
        <h5>National Insurance</h5>
        <div class="formgrid grid">
          <div class="field col-4">
            <label for="NI_Category">National insurance category</label>
            <Dropdown v-model="details.national_insurance_category" :options="NICategories" optionLabel="name" placeholder="Select" style="width:100%;height:45px;"  />
            <span v-if="validationErrors.national_insurance_category" class="font-medium validation-text p-2">
                {{validationErrors.national_insurance_category}}
              </span>
          </div>
          <div class="field col-4">
            <label for="NI_Number">Earnings at LEL</label>
            <InputText v-model="details.earnings_at_LEL" id="Forename" type="text" />
            <span v-if="validationErrors.earnings_at_LEL" class="font-medium validation-text p-2">
                {{validationErrors.earnings_at_LEL}}
              </span>
          </div>
          <div class="field col-4">
            <label for="NI_Number">Earnings at PT</label>
            <InputText v-model="details.earnings_at_PT" id="Forename" type="text" />
            <span v-if="validationErrors.earnings_at_PT" class="font-medium validation-text p-2">
                {{validationErrors.earnings_at_PT}}
              </span>
          </div>
        </div>
      </div>
    </div>

    <div class="formgrid grid">
      <div class="field col-4">
        <label for="Forename">Earnings to UEL</label>
        <InputText v-model="details.earnings_to_UEL" id="Forename" type="text" />
        <span v-if="validationErrors.earnings_to_UEL" class="font-medium validation-text p-2">
          {{validationErrors.earnings_to_UEL}}
        </span>
      </div>

      <div class="field col-4">
        <label for="Surname">Employee national insurance*</label>
        <InputText v-model="details.employee_national_insurance" id="Forename" type="text" />
        <span v-if="validationErrors.employee_national_insurance" class="font-medium validation-text p-2">
          {{validationErrors.employee_national_insurance}}
        </span>
      </div>

      
      <div class="field col-4">
        <label for="Surname">Employer national insurance*</label>
        <InputText v-model="details.employer_national_insurance" id="Forename" type="text" />
        <span v-if="validationErrors.employer_national_insurance" class="font-medium validation-text p-2">
          {{validationErrors.employer_national_insurance}}
        </span>
      </div>
            
      <div class="field col-4">
        <label for="Surname">Gross pay for national insurance*</label>
        <InputText v-model="details.gross_pay_for_national_insurance" id="Forename" type="text" />
        <span v-if="validationErrors.gross_pay_for_national_insurance" class="font-medium validation-text p-2">
          {{validationErrors.gross_pay_for_national_insurance}}
        </span>
      </div>
    </div>

    <div class="grid">
      <div class="col-12 md:col-12">
        <h5>National Insurance Director</h5>
        <div class="formgrid grid">
          <div class="field col-4">
            <label for="NI_Category">Director Earnings at LEL</label>
            <InputText v-model="details.director_earnings_at_LEL" id="Forename" type="text" />
            <span v-if="validationErrors.director_earnings_at_LEL" class="font-medium validation-text p-2">
                {{validationErrors.director_earnings_at_LEL}}
              </span>
          </div>
          <div class="field col-4">
            <label for="NI_Number">Director Earnings to PT</label>
            <InputText v-model="details.director_earnings_to_PT" id="Forename" type="text" />
            <span v-if="validationErrors.director_earnings_to_PT" class="font-medium validation-text p-2">
                {{validationErrors.director_earnings_to_PT}}
              </span>
          </div>
          <div class="field col-4">
            <label for="NI_Number">Director Earnings to UEL</label>
            <InputText v-model="details.director_earnings_to_UEL" id="Forename" type="text" />
            <span v-if="validationErrors.director_earnings_to_UEL" class="font-medium validation-text p-2">
                {{validationErrors.director_earnings_to_UEL}}
              </span>
          </div>
        </div>
        <div class="formgrid grid">
          <div class="field col-4">
            <label for="NI_Category">Director national insurance</label>
            <InputText v-model="details.director_national_insurance" id="Forename" type="text" />
            <span v-if="validationErrors.director_national_insurance" class="font-medium validation-text p-2">
                {{validationErrors.director_national_insurance}}
              </span>
          </div>
          <div class="field col-4">
            <label for="NI_Number">Director Employer National Insurance</label>
            <InputText v-model="details.director_employer_national_insurance" id="Forename" type="text" />
            <span v-if="validationErrors.director_employer_national_insurance" class="font-medium validation-text p-2">
                {{validationErrors.director_employer_national_insurance}}
              </span>
          </div>
          <div class="field col-4">
            <label for="NI_Number">Director Gross Pay for National Insurance</label>
            <InputText v-model="details.director_gross_pay_for_national_insurance" id="Forename" type="text" />
            <span v-if="validationErrors.director_gross_pay_for_national_insurance" class="font-medium validation-text p-2">
                {{validationErrors.director_gross_pay_for_national_insurance}}
              </span>
          </div>
        </div>

        
        <br>
        <Button @click="cancel()" label="Cancel" severity="secondary" class="mt-5 ml-2"></Button>
        <Button @click="saveDetails()" label="Save" class="ml-2 mt-3"></Button>
      </div>
    </div>

  </template>
  
  <script>
  export default {
    data() {
      return {
        validationErrors:[],

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

        details: {

          // TAX
          employee_id: '',
          gross_for_tax: 0.00,
          tax_deducted: 0.00,
          student_loan: 0.00,
          postgraduate_loan: 0.00,
          employee_pension: 0.00,
          employer_pension: 0.00,

          // BENEFITS
          benefit_in_kind_payrolled_amount: 0.00,
          employe_net_pay_pension: 0.00,

          // Statutory Payments
          statutory_maternity_pay: 0.00,
          statutory_paternity_pay: 0.00,
          statutory_adoption_pay: 0.00,
          statutory_sick_pay: 0.00,
          parental_bereavement: 0.00,
          shared_parental_pay: 0.00,

          // National Insurance
          national_insurance_category:'',
          earnings_at_LEL: 0.00,
          earnings_at_PT: 0.00,
          earnings_to_UEL: 0.00,
          employee_national_insurance: 0.00,
          employer_national_insurance: 0.00,
          gross_pay_for_national_insurance: 0.00,

          // National Insurance Director
          director_earnings_at_LEL: 0.00,
          director_earnings_to_PT: 0.00,
          director_earnings_to_UEL: 0.00,
          director_national_insurance: 0.00,
          director_employer_national_insurance: 0.00,
          director_gross_pay_for_national_insurance: 0.00,
        }

      };
    },
    mounted(){
      this.editEmployeeYTD();
    },
    methods: {

      cancel(){
        this.$router.push({ name: 'employees' });
      },

      saveDetails(){
        // const optionalFields = [];
        // this.validationErrors = this.$validateFormData(this.details, optionalFields);
        // if (Object.keys(this.validationErrors).length === 0 ) {
            this.updateEmployeeYTD();
        // } else {
        // }
      },

      //-----------EDIT EMPLOYEE----------
      async editEmployeeYTD(){
        let employee_id=this.$route.params.id
        const apiUrl = `/getEmployeeYTD/`+employee_id;
        try {
        let response=await this.$axios.get(apiUrl);
        response=response.data
        if(response.employee_id !=undefined){
        this.details=response
        this.details.national_insurance_category=this.NICategories.find(item => item.code == response.national_insurance_category);
        }
        } catch (error) {
        let errors=error.response.data.errors
        console.log('errors',errors)
        }
      },

      //-----------UPDATE EMPLOYEE DETAILS----------
      async updateEmployeeYTD(){
        let employee_id=this.$route.params.id
        this.details.employee_id=employee_id
        let data=this.details
        const apiUrl = `/storeYTD`;
        try {
        let response=await this.$axios.post(apiUrl,data);
        this.$showToast('success','Employee YTD details Saved Successfully.');
        } catch (error) {
        let errors=error.response.data.errors
        console.log('errors',errors)
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