<template>
  <!-- company details form -->
<div class="col-12 md:col-12">
    <div class="card card-w-title">
        <div class="grid">
            <div v-if="isEdit" class="mt-5 col-12 md:col-6 ">
                <h5 class="mt-3" style="color:#1F9A72;">HMRC Settings</h5>
                <div class="grid">
                    <div class="col-12 md:col-8 mt-4">
                        <label for="accountsOfficeReference">Accounts office reference*</label>
                        <InputText v-model="details.account_office_reference" id="accountsOfficeReference" optionLabel="accountsOfficeReference" type="text"/>
                        <span v-if="validationErrors.account_office_reference" class="font-medium validation-text p-2">
                            {{validationErrors.account_office_reference}}
                        </span>
                    </div>
                    <div class="col-12 md:col-8">
                        <label for="accountsOfficeReference">Employer PAYE reference*</label>
                        <InputText v-model="details.paye_reference" id="accountsOfficeReference" optionLabel="accountsOfficeReference" type="text"/>
                        <span v-if="validationErrors.paye_reference" class="font-medium validation-text p-2">
                            {{validationErrors.paye_reference}}
                        </span>
                    </div>
                
                    <div class="col-12 md:col-8">
                        <label for="accountsOfficeReference">HMRC Gateway User ID*</label>
                        <InputText v-model="details.hmrc_gateway_id" id="accountsOfficeReference" optionLabel="accountsOfficeReference" type="text"/>
                        <span v-if="validationErrors.hmrc_gateway_id" class="font-medium validation-text p-2">
                            {{validationErrors.hmrc_gateway_id}}
                        </span>
                    </div>
                    <div class="col-12 md:col-8">
                        <label for="accountsOfficeReference">HMRC Gateway User Password*</label>
                        <InputText v-model="details.hmrc_password" id="accountsOfficeReference" optionLabel="accountsOfficeReference" type="password"/>
                        <span v-if="validationErrors.hmrc_password" class="font-medium validation-text p-2">
                            {{validationErrors.hmrc_password}}
                        </span>
                    </div>

                    <div class="col-12 md:col-8 flex justify-content-between">
                        <Button @click="saveDetails()" label="Test Connection" class="ml-2"></Button>
                        <span>
                            <Button @click="isEdit=false" label="Cancel" class="ml-2"></Button>
                            <Button @click="saveDetails()" label="Save" class="ml-2"></Button>
                        </span>
                    </div>

                </div>
    
            </div>
            <div v-else class="col-12 md:col-6 ">
                <div class="flex flex-column align-items-center justify-content-center">
                    <div class="w-full surface-card py-8 px-5 sm:px-8 flex flex-column align-items-center" style="border-radius: 53px">
                        <div class="mt-4 w-full flex justify-content-between py-3 border-300 border-top-1 border-left-1 border-right-1">
                            <span class="ml-4 mt-3 flex flex-column">
                                <h5 style="color:#1F9A72;" class="lg:text-sm font-medium mb-0 block">Connected</h5>
                            </span>
                            <span class="mt-2 mr-5 edit-btn" style="height: 2rem; width: 2rem">
                                <h3 @click="isEdit=true" class=" lg:text-xl font-medium mb-0">Edit</h3>
                            </span>
                        </div>
                        <div class="w-full flex justify-content-between py-3 border-300 border-top-1 border-left-1 border-right-1">
                            <span class="ml-4 mt-3 flex flex-column">
                                <h5 class="text-900 lg:text-lg font-medium mb-0 block">PAYE reference</h5>
                            </span>
                            <span class="mt-3 mr-5" style="height: 2rem; width: 7.5rem">
                                <h3 class="text-900 lg:text-xl font-medium mb-0 block">120/MB23649</h3>
                            </span>
                        </div>
                        <div class="w-full flex justify-content-between py-3 border-300 border-top-1 border-left-1 border-right-1">
                            <span class="ml-4 mt-3 flex flex-column">
                                <h5 class="text-900 lg:text-lg font-medium mb-0 block">Accounts office reference</h5>
                            </span>
                            <span class="mt-3 mr-5" style="height: 2rem; width: 9rem">
                                <h3 class="text-900 lg:text-xl font-medium mb-0 block">210PA04693513</h3>
                            </span>
                        </div>
                        <div class="w-full flex justify-content-between py-3 border-300 border-top-1 border-left-1 border-right-1">
                            <span class="ml-4 mt-3 flex flex-column">
                                <h3 class="text-900 lg:text-xl font-medium mb-0 block">HMRC Gateway User ID</h3>
                            </span>
                            <span class="mt-3 mr-5" style="height: 2rem; width: 8.5rem">
                                <h3 class="text-900 lg:text-xl font-medium mb-0 block">317636695836</h3>
                            </span>
                        </div>
                        <div class="w-full flex justify-content-between py-3 border-300 border-bottom-1 border-top-1 border-left-1 border-right-1">
                            <span class="ml-4 mt-3 flex flex-column">
                                <h3 class="text-900 lg:text-xl font-medium mb-0 block">HMRC Gateway Password</h3>
                            </span>
                            <span class="mt-3 mr-5" style="height: 2rem; width: 4rem">
                                <h3 class="text-900 lg:text-xl font-medium mb-0 block">xxxxxx</h3>
                            </span>
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
                                <span class="text-900 lg:text-xl font-medium mb-0 block">HMRC</span>
                                <span class="text-600 lg:text-sm">PAYE is the HMRC system for collecting income tax and National Insurance from employment.</span>
                            </span>
                        </div>
                        <div class="w-full flex align-items-center py-5 border-300 border-bottom-1">
                            <span class="p-2 flex justify-content-center align-items-center bg-orange-400 border-round" style="height: 3.5rem; width: 3.5rem">
                                <i class="pi pi-fw pi-question-circle text-50 text-2xl"></i>
                            </span>
                            <span class="ml-4 flex flex-column">
                                <span class="text-900 lg:text-xl font-medium mb-0">RTI Submission</span>
                                <span class="text-600 lg:text-sm">Each time you run payroll for your employees, we perform a RTI Submission to HMRC.</span>
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
  data() {
    return {
        isEdit:false,
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
    };
  },
  methods: {
    addPayItems(){
      this.$router.push({ name: 'company-create-payitems' });

    }
  }
}
</script>

<style scoped>
::v-deep input{
    width:100%;
    height:45px !important;
}
.edit-btn{
    cursor: pointer;
    padding-left: 8px;
    padding-top: 7px;
    padding-bottom: 6px;
    width: 48px !important;
    height: 35px !important;
    border: 1px solid gainsboro;
    border-radius: 10px;
    background-color:#1F9A72;
}
.edit-btn h3{
    color: white !important;
    font-size: 16px !important;
}
</style> 