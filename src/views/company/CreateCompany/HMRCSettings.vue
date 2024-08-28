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
                        <InputText id="accountsOfficeReference" optionLabel="accountsOfficeReference" type="text"/>
                    </div>
                    <div class="col-12 md:col-4 mt-5">
                        <label for="accountsOfficeReference">Employer PAYE reference*</label>
                        <InputText id="accountsOfficeReference" optionLabel="accountsOfficeReference" type="text"/>
                    </div>
                </div>
                <div class="grid">
                    <div class="col-12 md:col-4 mt-5">
                        <label for="accountsOfficeReference">Unique Taxpayer reference (optional)</label>
                        <InputText id="accountsOfficeReference" optionLabel="accountsOfficeReference" type="text"/>
                    </div>
                </div>
    
                <h5>Is your company eligible to the Employement Allowance or the Small Employer's Relief? Check the boxes below if applicable.</h5>
                <p>The former reduces your National Insurance liability while the latter allows you to claim 103% of your employees' statutory payments.</p>
                <div class="grid mt-4">
                    <div class="col-12 md:col-4">
                        <div class="field-checkbox mb-0">
                            <Checkbox id="checkOption1" name="option" value="Chicago" v-model="checkboxValue" />
                            <label for="checkOption1">Employement Allowance</label>
                        </div>
                    </div>
                    <div class="col-12 md:col-4">
                        <div class="field-checkbox mb-0">
                            <Checkbox id="checkOption2" name="option" value="Los Angeles" v-model="checkboxValue" />
                            <label for="checkOption2">Small Employer's Relief</label>
                        </div>
                    </div>
                </div>
    
    
                <h5>What is your company's bussiness sector?</h5>
                <div class="grid mt-4">
                    <div class="col-12 md:col-3">
                        <div class="field-checkbox mb-0">
                            <Checkbox id="checkOption1" name="option" value="Chicago" v-model="checkboxValue" />
                            <label for="checkOption1">Agriculture products sector</label>
                        </div>
                    </div>
                    <div class="col-12 md:col-3">
                        <div class="field-checkbox mb-0">
                            <Checkbox id="checkOption2" name="option" value="Los Angeles" v-model="checkboxValue" />
                            <label for="checkOption2">Fisheries and Aquaculture sector</label>
                        </div>
                    </div>
                    <div class="col-12 md:col-3">
                        <div class="field-checkbox mb-0">
                            <Checkbox id="checkOption2" name="option" value="Los Angeles" v-model="checkboxValue" />
                            <label for="checkOption2">Road transport sector</label>
                        </div>
                    </div>
                    <div class="col-12 md:col-3">
                        <div class="field-checkbox mb-0">
                            <Checkbox id="checkOption2" name="option" value="Los Angeles" v-model="checkboxValue" />
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
                        <InputText id="accountsOfficeReference" optionLabel="accountsOfficeReference" type="text"/>
                    </div>
                    <div class="col-12 md:col-4 mt-5">
                        <label for="accountsOfficeReference">HMRC Password*</label>
                        <InputText id="accountsOfficeReference" optionLabel="accountsOfficeReference" type="password"/>
                    </div>
                </div>
    
            </div>
        </div>
    </div>
    </template>
    
    
    <script>
    export default {
      components: {
    
      },
      data() {
        return {
            calendarValue: null,
            isFirstPayday: null,
            isFirstPayroll: null,
    
        }
      },
      computed: {
        
      },
      methods: {
      }
    }
    </script>
    
    <style scoped lang="scss">
    
    </style>