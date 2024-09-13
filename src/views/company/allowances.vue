<template>
  <!-- company details form -->
<div class="col-12 md:col-12">
    <div class="card card-w-title">
        <div class="grid">
            <div class="col-12 md:col-6 ">
                <div class="flex flex-column align-items-center justify-content-center">
                    <div class="w-full surface-card py-8 px-5 sm:px-8 flex flex-column align-items-center" style="border-radius: 53px">
                        
                        <div class="mt-4 w-full border-300  border-bottom-1 border-top-1 border-left-1 border-right-1">
                            <div class="flex  align-items-center py-3">
                                <span class="ml-4 flex flex-column">
                                    <h3 class="text-900 lg:text-xl font-medium mb-0 block">Employment allowance</h3>
                                </span>
                                <span class="mt-4 ml-4" style="min-height: 3.5rem; width: 3.5rem">
                                    <Button @click="enableEmploymentAllownace()" label="Enable" class="ml-5"></Button>
                                </span>
                            </div>
                            <br>

                            <template v-if="isEnableEmploymentAllownace">

                                <div v-if="isSuccess" class="text-center mb-5 pt-2 pb-2" style="background-color: #80D1B4; border-radius: 5px !important;">
                                    <span class="text-white font-medium">Saved Successfully</span>
                                </div>

                                <div v-if="isErrors" class="text-center mb-5 pt-2 pb-2" style="background-color: #E88D58; border-radius: 5px !important;">
                                    <span v-for="error in errors" class="text-white font-medium">
                                        {{ error }}
                                        <br>
                                    </span>
                                </div>

                                <div class="row">
                                    <small class="ml-4 block">
                                        If you have already claimed Employment Allowance in the current
                                        <br> tax year, add the claimed amount here. Otherwise, 
                                        <br>leave it at £ 0.00.
                                    </small>
                                    <br>
                                    <span class="ml-4" style="height: 4.5rem; width: 3rem">
                                        <label for="postCode">Allowance already claimed*</label>
                                        <InputText v-model="employmentAllownace.allowance_claimed" class="ml-3" id="postCode" optionLabel="postCode" type="text" style="width:93%;height:45px" />
                                        <span v-if="validationErrors.allowance_claimed" class="ml-3 font-medium validation-text p-2">
                                            {{validationErrors.allowance_claimed}}
                                        </span>
                                    </span>
                                    <br>
                                    <br>
                                    <span class="ml-4" style="height: 4.5rem; width: 1rem">
                                        <label class="mt-5" for="postCode">Remaining allowance*</label>
                                        <InputText v-model="employmentAllownace.allowance_remaining" class="ml-3" id="postCode" optionLabel="postCode" type="text" style="width:93%;height:45px" />
                                        <span v-if="validationErrors.allowance_remaining" class="ml-3 font-medium validation-text p-2">
                                            {{validationErrors.allowance_remaining}}
                                        </span>
                                    </span>
                                    <br>

                                    <div class="py-1 mt-3 flex" style="height: 3.2rem !important; width: 100%">
                                        <Button @click="saveEmploymentAllownace('enabled')" label="Save" class="ml-3"></Button>
                                        <Button @click="isEnableEmploymentAllownace=false" label="Cancel" class="ml-3" style="background-color: transparent;color: black;"></Button>
                                    </div>
                                    <br>
                                </div>
                            </template>
                        </div>
                        <div class="mt-3 w-full border-300  border-bottom-1 border-top-1 border-left-1 border-right-1">
                            <div class="flex align-items-center py-3">
                                <span class="ml-4 mr-3 flex flex-column">
                                    <h3 class="text-900 lg:text-xl font-medium mb-0 block">Apprenticeship Levy</h3>
                                </span>
                                <span class="mt-4 ml-5" style="height: 3.5rem; width: 3.5rem">
                                    <Button @click="enableApprenticeshipLevy()" label="Enable" class="ml-5"></Button>
                                </span>
                            </div>
                            <br>

                            <template v-if="isEnableApprenticeshipLevy">

                                <div v-if="isSuccess" class="text-center mb-5 pt-2 pb-2" style="background-color: #80D1B4; border-radius: 5px !important;">
                                    <span class="text-white font-medium">Saved Successfully</span>
                                </div>

                                <div v-if="isErrors" class="text-center mb-5 pt-2 pb-2" style="background-color: #E88D58; border-radius: 5px !important;">
                                    <span v-for="error in errors" class="text-white font-medium">
                                        {{ error }}
                                        <br>
                                    </span>
                                </div>

                                <div class="row">
                                    <small class="ml-4 block">
                                        If you have an annual pay bill of more than £3 million,
                                        <br>you are required to pay the Apprenticeship Levy. You can
                                        <br>use the Apprenticeship Levy each month.
                                    </small>
                                    <br>
                                    <span class="ml-4" style="height: 4.5rem; width: 3rem">
                                        <label for="postCode">Pay bill YTD*</label>
                                        <InputText v-model="apprenticeshipLevy.pay_bill_ytd" class="ml-3" id="postCode" optionLabel="postCode" type="text" style="width:93%;height:45px" />
                                        <span v-if="validationErrors.pay_bill_ytd" class="ml-3 font-medium validation-text p-2">
                                            {{validationErrors.pay_bill_ytd}}
                                        </span>
                                    </span>
                                    <br>
                                    <br>
                                    <span class="ml-4" style="height: 4.5rem; width: 1rem">
                                        <label class="mt-5" for="postCode">Levy due YTD*</label>
                                        <InputText v-model="apprenticeshipLevy.levy_due_ytd" class="ml-3" id="postCode" optionLabel="postCode" type="text" style="width:93%;height:45px" />
                                        <span v-if="validationErrors.levy_due_ytd" class="ml-3 font-medium validation-text p-2">
                                            {{validationErrors.levy_due_ytd}}
                                        </span>
                                    </span>
                                    <br>

                                    <div class="py-1 mt-3 flex" style="height: 3.2rem !important; width: 100%">
                                        <Button @click="saveApprenticeshipLevy('enabled')" label="Save" class="ml-3"></Button>
                                        <Button @click="isEnableApprenticeshipLevy=false" label="Cancel" class="ml-3" style="background-color: transparent;color: black;"></Button>
                                    </div>
                                    <br>
                                </div>
                            </template>

                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 md:col-6 ">
                <div class="flex flex-column align-items-center justify-content-center">
                    <div class="w-full surface-card py-8 px-5 sm:px-8 flex flex-column align-items-center" style="border-radius: 53px">
                        
                        <div class="w-full flex align-items-center py-5 border-300 border-bottom-1">
                            <span class="p-2 flex justify-content-center align-items-center bg-cyan-400 border-round" style="height: 3.5rem; width: 3.5rem">
                                <i class="text-50 pi pi-fw pi-table text-2xl"></i>
                            </span>
                            <span class="ml-4 flex flex-column">
                                <span class="text-900 lg:text-xl font-medium mb-0 block">Employment allowance</span>
                                <span class="text-600 lg:text-sm">An allowance of £5,000 per tax year is available to offset against your Class 1 NICs liability.</span>
                            </span>
                        </div>
                        <div class="w-full flex align-items-center py-5 border-300 border-bottom-1">
                            <span class="p-2 flex justify-content-center align-items-center bg-orange-400 border-round" style="height: 3.5rem; width: 3.5rem">
                                <i class="pi pi-fw pi-question-circle text-50 text-2xl"></i>
                            </span>
                            <span class="ml-4 flex flex-column">
                                <span class="text-900 lg:text-xl font-medium mb-0">Apprenticeship Levy</span>
                                <span class="text-600 lg:text-sm">The Apprenticeship Levy is a levy on UK employers to fund new apprenticeships. An allowance of £15,000 per tax year is available to offset against your payments.</span>
                            </span>
                        </div>
                    </div>
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
        validationErrors:'',
        errors:null,
        isSuccess:false,
        isErrors:false,
        employmentAllownace:{
            allowance_claimed:'0.00',
            allowance_remaining:'5000.00',
            status:''
        },
        apprenticeshipLevy:{
            pay_bill_ytd:'0.00',
            levy_due_ytd:'0.00',
            shares_apprentice_levy_allowance:'',
            status:''
        },
        isEnableEmploymentAllownace : false,
        isEnableApprenticeshipLevy:false
    }
  },
  mounted(){
    this.getAllowances()
  },
  methods: {

    validateData(data,optional){
        const optionalFields = optional;
        this.validationErrors = this.$validateFormData(data, optionalFields);
        if (Object.keys(this.validationErrors).length === 0 ) {
            return true
        } else {
            return false
       }
    },

    enableEmploymentAllownace(){
        this.isErrors=false
        this.isSuccess=false
        this.isEnableEmploymentAllownace=true
        this.isEnableApprenticeshipLevy=false
    },

    enableApprenticeshipLevy(){
        this.isErrors=false
        this.isSuccess=false
        this.isEnableApprenticeshipLevy=true
        this.isEnableEmploymentAllownace=false
    },

    async getAllowances(){
        const apiUrl = `/get-allowances`;
        try {
        let response=await this.$axios.get(apiUrl);
        console.log(response)
        let employment_allowance=response.data.employment_allowance
        let apprenticeship_levy=response.data.apprenticeship_levy

        if(employment_allowance){
            this.employmentAllownace.allowance_claimed = employment_allowance.allowance_claimed
            this.employmentAllownace.allowance_remaining = employment_allowance.allowance_remaining
        }
        if(apprenticeship_levy){
            this.apprenticeshipLevy.pay_bill_ytd = apprenticeship_levy.pay_bill_ytd
            this.apprenticeshipLevy.levy_due_ytd = apprenticeship_levy.levy_due_ytd
            this.apprenticeshipLevy.shares_apprentice_levy_allowance = apprenticeship_levy.shares_apprentice_levy_allowance
        }

        } catch (error) {
        let errors=error.response.data.errors
        console.log('errors',errors)
        }
    },

    //-----------SAVE Employment Allownac-----------
    async saveEmploymentAllownace(status){
        this.employmentAllownace.status=status
        let data = this.employmentAllownace
        if(!this.validateData(data,[])){
           return 
        }
        const apiUrl = `/employment-allowance`;
        try {
        await this.$axios.post(apiUrl,data);
        this.isErrors=false
        this.isSuccess=true
        } catch (error) {
        this.errors=error.response.data.errors
        this.isSuccess=false
        this.isErrors=true
        }
    },

    //-----------SAVE Apprenticeship Levy-----------
    async saveApprenticeshipLevy(status){
        this.apprenticeshipLevy.status=status
        let data = this.apprenticeshipLevy
        if(!this.validateData(data,['shares_apprentice_levy_allowance'])){
           return 
        }
        const apiUrl = `/apprenticeship-levy`;
        try {
        await this.$axios.post(apiUrl,data);
        this.isErrors=false
        this.isSuccess=true
        } catch (error) {
        this.errors=error.response.data.errors
        this.isSuccess=false
        this.isErrors=true
        }
    },

  }
}


</script>

<style scoped lang="scss">

</style>