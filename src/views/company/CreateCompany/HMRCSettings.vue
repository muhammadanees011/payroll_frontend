<template>
    <!-- company details form -->
    <div class="ml-3">
        <div class="grid">
            <div class="col-12 md:col-12 mt-3">

                <h5 class="" style="color:#1F9A72;">HMRC Settings</h5>
                <p>We need the following information to properly calculate taxes due and report them to HMRC.</p>
                <div class="grid">
                    <div class="col-12 md:col-4 mt-5">
                        <label for="accountsOfficeReference">Accounts office reference*</label>
                        <InputText v-model="details.account_office_reference" id="accountsOfficeReference" optionLabel="accountsOfficeReference" type="text"/>
                        <span v-if="validationErrors.account_office_reference" class="font-medium validation-text p-2">
                            {{validationErrors.account_office_reference}}
                        </span>
                    </div>
                    <div class="col-12 md:col-4 mt-5">
                        <label for="accountsOfficeReference">Employer PAYE reference*</label>
                        <InputText v-model="details.paye_reference" id="accountsOfficeReference" optionLabel="accountsOfficeReference" type="text"/>
                        <span v-if="validationErrors.paye_reference" class="font-medium validation-text p-2">
                            {{validationErrors.paye_reference}}
                        </span>
                    </div>
                </div>
                <div class="grid">
                    <div class="col-12 md:col-4 mt-5">
                        <label for="accountsOfficeReference">Unique Taxpayer reference (optional)</label>
                        <InputText v-model="details.taxpayer_reference" id="accountsOfficeReference" optionLabel="accountsOfficeReference" type="text"/>
                        <span v-if="validationErrors.taxpayer_reference" class="font-medium validation-text p-2">
                            {{validationErrors.taxpayer_reference}}
                        </span>
                    </div>
                </div>
    
                <h5>Is your company eligible to the Employement Allowance or the Small Employer's Relief? Check the boxes below if applicable.</h5>
                <span v-if="validationErrors.employment_allowance" class="font-medium validation-text p-2">
                    {{validationErrors.employment_allowance}}
                </span>
                <p>The former reduces your National Insurance liability while the latter allows you to claim 103% of your employees' statutory payments.</p>
                <div class="grid mt-4">
                    <div class="col-12 md:col-4">
                        <div class="field-checkbox mb-0">
                            <Checkbox id="checkOption1" name="option" value="eligible_for_employment_allowance" v-model="details.employment_allowance" />
                            <label for="checkOption1">Employement Allowance</label>
                        </div>
                    </div>
                    <div class="col-12 md:col-4">
                        <div class="field-checkbox mb-0">
                            <Checkbox id="checkOption2" name="option" value="eligible_for_small_employers_relief" v-model="details.employment_allowance" />
                            <label for="checkOption2">Small Employer's Relief</label>
                        </div>
                    </div>
                </div>
    
    
                <h5>What is your company's bussiness sector?</h5>
                <span v-if="validationErrors.business_sector" class="font-medium validation-text p-2">
                    {{validationErrors.business_sector}}
                </span>
                <div class="grid mt-4">
                    <div class="col-12 md:col-3">
                        <div class="field-checkbox mb-0">
                            <Checkbox id="checkOption1" name="option" value="agriculture_products" v-model="details.business_sector" />
                            <label for="checkOption1">Agriculture products sector</label>
                        </div>
                    </div>
                    <div class="col-12 md:col-3">
                        <div class="field-checkbox mb-0">
                            <Checkbox id="checkOption2" name="option" value="fisheries_and_aquaculture" v-model="details.business_sector" />
                            <label for="checkOption2">Fisheries and Aquaculture sector</label>
                        </div>
                    </div>
                    <div class="col-12 md:col-3">
                        <div class="field-checkbox mb-0">
                            <Checkbox id="checkOption2" name="option" value="road_transport" v-model="details.business_sector" />
                            <label for="checkOption2">Road transport sector</label>
                        </div>
                    </div>
                    <div class="col-12 md:col-3">
                        <div class="field-checkbox mb-0">
                            <Checkbox id="checkOption2" name="option" value="industrial_other" v-model="details.business_sector" />
                            <label for="checkOption2">Industrial/other sector</label>
                        </div>
                    </div>
                </div>
    
    
                <h5 class="" style="color:#1F9A72;">Real Time Information (RTI)</h5>
                <p>RTI is the system used in to report payroll information to HMRC, the UK's tax authority.
                    <br>
                    XEPayroll automates HMRC reporting, allowing you to focus on running your bussiness.
                </p>
                <h5 class="" style="color:#1F9A72;">Some of the reports we send to HMRC on your behalf</h5>
                <p>Full Payment Submission (FPS): This report must be submitted each time employees are paid, and include details
                    <br>
                    such as employee earnings, tax and national insurance contributions, and other deductions.
                </p>
                <p>Employer Payment Summary (EPS): This report is used to claim Employement Allowance, recover statutory payments,
                    <br>
                    and report any other adjustments to the amounts previously reported in FPS submission.
                </p>
                <div class="grid">
                    <div class="col-12 md:col-4 mt-5">
                        <label for="accountsOfficeReference">HMRC Gateway ID*</label>
                        <InputText v-model="details.hmrc_gateway_id" id="accountsOfficeReference" optionLabel="accountsOfficeReference" type="text"/>
                        <span v-if="validationErrors.hmrc_gateway_id" class="font-medium validation-text p-2">
                            {{validationErrors.hmrc_gateway_id}}
                        </span>
                    </div>
                    <div class="col-12 md:col-4 mt-5">
                        <label for="accountsOfficeReference">HMRC Password*</label>
                        <InputText v-model="details.hmrc_password" id="accountsOfficeReference" optionLabel="accountsOfficeReference" type="password"/>
                        <span v-if="validationErrors.hmrc_password" class="font-medium validation-text p-2">
                            {{validationErrors.hmrc_password}}
                        </span>
                    </div>
                </div>
    
            </div>
            <br>
            <Button @click="saveDetails()" label="Continue" class="mt-5 ml-2"></Button>
        </div>
    </div>
    </template>
    
    
    <script>
    export default {
      components: {
    
      },
      data() {
        return {
            validationErrors:[],
            details:{
                account_office_reference:'',
                paye_reference:'',
                taxpayer_reference:'',
                employment_allowance:'',
                business_sector:'',
                hmrc_gateway_id:'',
                hmrc_password:'',
            },
            calendarValue: null,
            isFirstPayday: null,
            isFirstPayroll: null,
    
        }
      },
      computed: {
        
      },
      methods: {
        saveDetails(){
            const optionalFields = [];
            this.validationErrors = this.$validateFormData(this.details, optionalFields);
            if (Object.keys(this.validationErrors).length === 0 ) {
                this.$emit('saveDetails', this.details);
            } else {
                console.log('Validation errors:', this.validationErrors);
            }
        },
      }
    }
    </script>
    
    <style scoped lang="scss">
    
    </style>