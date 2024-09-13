<template>
    <!-- company details form -->
    <div class="col-12 md:col-12">
      <div class="card card-w-title">
    <div class="grid">
      <div class="col-12 md:col-12 ">
          <div class="formgrid grid">
            <div class="field col-4">
              <label for="companyName">Company/Business name*</label>
              <InputText v-model="details.name" id="companyName" optionLabel="companyName" type="text" style="width:100%;height:45px" />
              <span v-if="validationErrors.name" class="font-medium validation-text p-2">
                {{validationErrors.name}}
              </span>
            </div>
            <div class="field col-4">
              <label for="name2">Legal Structure*</label>
              <Dropdown v-model="details.legal_structure" :options="dropdownValues" optionLabel="name" placeholder="Select" style="width:100%;height:45px" />
              <span v-if="validationErrors.legal_structure" class="font-medium validation-text p-2">
                {{validationErrors.legal_structure}}
              </span>
            </div>
        </div>
      </div>
    </div>
    <div class="grid">
      <div class="col-12 md:col-12">
        <div class="formgrid grid">
          <div class="field col-4">
            <label for="yourpostCode">Type your postcode</label>
            <InputText v-model="details.post_code" id="yourpostCode" optionLabel="yourpostCode" type="text" style="width:100%;height:45px" />
            <span v-if="validationErrors.post_code" class="font-medium validation-text p-2">
                {{validationErrors.post_code}}
            </span>
          </div>
          <div class="field col-4">
            <label for="postCode">Postcode*</label>
            <InputText  v-model="details.post_code" id="postCode" optionLabel="postCode" type="text" style="width:100%;height:45px" />
            <span v-if="validationErrors.post_code" class="font-medium validation-text p-2">
                {{validationErrors.post_code}}
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="grid">
      <div class="col-12 md:col-12">
        <div class="formgrid grid">
          <div class="field col-4">
            <label for="address1">Address Line 1*</label>
            <InputText  v-model="details.address_line_1" id="address1" optionLabel="address1" type="text" style="width:100%;height:45px" />
            <span v-if="validationErrors.address_line_1" class="font-medium validation-text p-2">
                {{validationErrors.address_line_1}}
            </span>
          </div>
          <div class="field col-4">
            <label for="address2">Address Line 2</label>
            <InputText  v-model="details.address_line_2" id="address2" optionLabel="address2" type="text" style="width:100%;height:45px" />
            <span v-if="validationErrors.address_line_2" class="font-medium validation-text p-2">
                {{validationErrors.address_line_2}}
            </span>
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
            <InputText  v-model="details.city" id="address2" optionLabel="address2" type="text" style="width:29%;height:45px" />
            <br>
            <span v-if="validationErrors.city" class="font-medium validation-text p-2">
                {{validationErrors.city}}
            </span>
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
            <InputText  v-model="details.director_name" id="address2" optionLabel="address2" type="text" style="width:29%;height:45px" />
            <br>
            <span v-if="validationErrors.director_name" class="font-medium validation-text p-2">
                {{validationErrors.director_name}}
            </span>
          </div>
        </div>
      </div>
    </div>
    <p>You can only setup an account for a company that you lawfully represent or work for.</p>
  
    <div class="grid">
        <div class="col-12">
            <div class="field-checkbox mb-0">
                <Checkbox id="checkOption1" name="option" value="authorized_to_act" v-model="details.authorized_to_act" />
                <label for="checkOption1">I confirm that I'm authorised to act on behalf of the company</label>
            </div>
            <span v-if="validationErrors.authorized_to_act" class="font-medium validation-text p-2 ml-4">
              {{validationErrors.authorized_to_act}}
            </span>
        </div>
        <div class="col-12">
            <div class="field-checkbox mb-0">
                <Checkbox id="checkOption2" name="option" 
                value="agreed_to_terms" v-model="details.agreed_to_terms" />
                <label for="checkOption2">I confirm that I have read and agreed the terms and conditions</label>
            </div>
            <span v-if="validationErrors.agreed_to_terms" class="font-medium validation-text p-2 ml-4">
              {{validationErrors.agreed_to_terms}}
            </span>
        </div>
    </div>
    <br>
    <Button @click="validateData()" label="Save" class="mt-5 ml-2"></Button>
  
  </div>
  </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        validationErrors:[],
        details:{
          name:'',
          legal_structure:'',
          post_code:'',
          address_line_1:'',
          address_line_2:'',
          city:'',
          director_name:'',
          authorized_to_act:false,
          agreed_to_terms:false
        },
        checkboxValue: [],
        dropdownValue: null,
        dropdownValues: [
          { name: 'LTD-Private limited company', code: 'LTD-Private limited company' },
          { name: 'LLP-Limited liability partnership', code: 'LLP-Limited liability partnership' },
          { name: 'LIMITED-PARTNERSHIP-Limited partnership', code: 'LIMITED-PARTNERSHIP-Limited partnership' },
          { name: 'NORTHEREN-IRELAND-Northeren ireland company', code: 'NORTHEREN-IRELAND-Northeren ireland company' },
          { name: 'NORTHEREN-IRELAND-OTHER-Credit union (Northeren ireland)', code: 'NORTHEREN-IRELAND-OTHER-Credit union (Northeren ireland)' },
          { name: 'OLD-PUBLIC-COMPANY-Old public company', code: 'OLD-PUBLIC-COMPANY-Old public company' },
          { name: 'OTHER-Other company type', code: 'OTHER-Other company type' },
          { name: 'OVERSEA-COMPANY-Overseas company', code: 'OVERSEA-COMPANY-Overseas company' },
          { name: 'PLC-Public limited company', code: 'PLC-Public limited company' },
        ],
      };
    },
    mounted(){
        this.getCompanyDetails()
    },
    methods:{

      validateData(){
        const optionalFields = [];
        this.validationErrors = this.$validateFormData(this.details, optionalFields);
        if (Object.keys(this.validationErrors).length === 0 ) {
          this.saveDetails()
        } else {
          console.log('Validation errors:', this.validationErrors);
        }
      },

      //-------------Get Company Details---------------
      async getCompanyDetails(){
        const apiUrl = `/get-company-details`;
        try {
        let response=await this.$axios.get(apiUrl);
        response=response.data
        this.details.name=response.name
        this.details.legal_structure={name:response.legal_structure, code:response.legal_structure}
        this.details.post_code=response.post_code
        this.details.address_line_1=response.address_line_1
        this.details.address_line_2=response.address_line_2
        this.details.city=response.city
        this.details.director_name=response.director_name
        this.details.agreed_to_terms= response.agreed_to_terms==true ?  ['agreed_to_terms'] :[]
        this.details.authorized_to_act = response.authorized_to_act==true ? ['authorized_to_act']:[]
        } catch (error) {
        let errors=error.response.data.errors
        console.log('errors',errors)
        }
      },

      //-----------SAVE COMPANY DETAILS----------
      async saveDetails(){
          const apiUrl = `/update-company-details`;
          try {
          let response=await this.$axios.post(apiUrl,this.details);
          this.$showToast('success','Company Details updated successfully.');
          } catch (error) {
          let errors=error.response.data.errors
          console.log('errors',errors)
          }
      },

    },
  };
  </script>
  
  
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