<template>
  <!-- company details form -->
<div class="col-12 md:col-12">
    <div class="card card-w-title">
        <div class="grid">
            <div class="col-12 md:col-12 ">

                <div v-if="isErrors" class="mb-5 py-4 pl-3" style="background-color: #E88D58; border-radius: 5px !important;">
                    <span v-for="error in errors" class="text-white font-medium">
                        {{ error }}
                        <br>
                    </span>
                </div>
                <div class="formgrid grid">
                <div class="field col-4">
                    <label for="companyName">Recovered SMP YTD</label>
                    <InputText v-model="statutoryPay.recovered_smp_ytd" id="companyName" optionLabel="companyName" placeholder="0.00" type="text" style="width:100%;height:45px" />
                    <span v-if="validationErrors.recovered_smp_ytd" class="font-medium validation-text p-2">
                        {{validationErrors.recovered_smp_ytd}}
                    </span>
                </div>
                <div class="field col-4">
                    <label for="companyName">SMP NI Compensation YTD</label>
                    <InputText v-model="statutoryPay.smp_ni_compensation_ytd" id="companyName" optionLabel="companyName" placeholder="0.00" type="text" style="width:100%;height:45px" />
                    <span v-if="validationErrors.smp_ni_compensation_ytd" class="font-medium validation-text p-2">
                        {{validationErrors.smp_ni_compensation_ytd}}
                    </span>
                </div>
            </div>
            </div>
        </div>
        <div class="grid">
            <div class="col-12 md:col-12">
            <div class="formgrid grid">
                <div class="field col-4">
                <label for="yourpostCode">Recovered SPP YTD</label>
                <InputText v-model="statutoryPay.recovered_spp_ytd" id="yourpostCode" optionLabel="yourpostCode" placeholder="0.00" type="text" style="width:100%;height:45px" />
                <span v-if="validationErrors.recovered_spp_ytd" class="font-medium validation-text p-2">
                    {{validationErrors.recovered_spp_ytd}}
                </span>
                </div>
                <div class="field col-4">
                <label for="postCode">SPP NI Compensation YTD</label>
                <InputText v-model="statutoryPay.spp_ni_compensation_ytd" id="postCode" optionLabel="postCode" placeholder="0.00" type="text" style="width:100%;height:45px" />
                <span v-if="validationErrors.spp_ni_compensation_ytd" class="font-medium validation-text p-2">
                     {{validationErrors.spp_ni_compensation_ytd}}
                </span>
                </div>
            </div>
            </div>
        </div>
        <div class="grid">
            <div class="col-12 md:col-12">
            <div class="formgrid grid">
                <div class="field col-4">
                <label for="address1">Recovered SAP YTD</label>
                <InputText v-model="statutoryPay.recovered_sap_ytd" id="address1" optionLabel="address1" placeholder="0.00" type="text" style="width:100%;height:45px" />
                <span v-if="validationErrors.recovered_sap_ytd" class="font-medium validation-text p-2">
                     {{validationErrors.recovered_sap_ytd}}
                </span>
                </div>
                <div class="field col-4">
                <label for="address2">SAP NI Compensation YTD</label>
                <InputText v-model="statutoryPay.sap_ni_compensation_ytd" id="address2" optionLabel="address2" placeholder="0.00" type="text" style="width:100%;height:45px" />
                <span v-if="validationErrors.sap_ni_compensation_ytd" class="font-medium validation-text p-2">
                    {{validationErrors.sap_ni_compensation_ytd}}
                </span>
                </div>
            </div>
            </div>
        </div>
        <div class="grid">
            <div class="col-12 md:col-12">
            <div class="formgrid grid">
                <div class="field col-4">
                <label for="address1">Recovered SPBP YTD</label>
                <InputText v-model="statutoryPay.recovered_spbp_ytd" id="address1" optionLabel="address1" placeholder="0.00" type="text" style="width:100%;height:45px" />
                <span v-if="validationErrors.recovered_spbp_ytd" class="font-medium validation-text p-2">
                    {{validationErrors.recovered_spbp_ytd}}
                </span>
                </div>
                <div class="field col-4">
                <label for="address2">SPBP NI Compensation YTD</label>
                <InputText v-model="statutoryPay.spbp_ni_compensation_ytd" id="address2" optionLabel="address2" placeholder="0.00" type="text" style="width:100%;height:45px" />
                <span v-if="validationErrors.spbp_ni_compensation_ytd" class="font-medium validation-text p-2">
                    {{validationErrors.spbp_ni_compensation_ytd}}
                </span>
                </div>
            </div>
            </div>
        </div>
        <div class="grid">
            <div class="col-12 md:col-12">
            <div class="formgrid grid">
                <div class="field col-4">
                <label for="address1">Recovered ShPP YTD</label>
                <InputText v-model="statutoryPay.recovered_shpp_ytd" id="address1" optionLabel="address1" placeholder="0.00" type="text" style="width:100%;height:45px" />
                <span v-if="validationErrors.recovered_shpp_ytd" class="font-medium validation-text p-2">
                    {{validationErrors.recovered_shpp_ytd}}
                </span>
                </div>
                <div class="field col-4">
                <label for="address2">ShPP NI Compensation YTD</label>
                <InputText v-model="statutoryPay.shpp_ni_compensation_ytd" id="address2" optionLabel="address2" placeholder="0.00" type="text" style="width:100%;height:45px" />
                <span v-if="validationErrors.shpp_ni_compensation_ytd" class="font-medium validation-text p-2">
                    {{validationErrors.shpp_ni_compensation_ytd}}
                </span>
                </div>
            </div>
            </div>
        </div>
        <br>
        <Button @click="validateData()" label="Save" class="ml-2 mb-2"></Button>
        <Button label="Discard" class="ml-2 mb-2"></Button>
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
        isErrors:false,

        statutoryPay:{
            recovered_smp_ytd:'',
            smp_ni_compensation_ytd:'',
            recovered_spp_ytd:'',
            spp_ni_compensation_ytd:'',
            recovered_sap_ytd:'',
            sap_ni_compensation_ytd:'',
            recovered_spbp_ytd:'',
            spbp_ni_compensation_ytd:'',
            recovered_shpp_ytd:'',
            shpp_ni_compensation_ytd:''
        },
    }
  },
  mounted(){
    this.getstatutoryPay()
  },
  methods: {

    validateData(){
        const optionalFields = [];
        this.validationErrors = this.$validateFormData(this.statutoryPay, optionalFields);
        if (Object.keys(this.validationErrors).length === 0 ) {
            this.saveStatutoryPay()
        } else {
            
       }
    },

    //-----------SAVE Statutory Pay-----------
    async saveStatutoryPay(){
        let data = this.statutoryPay
        const apiUrl = `/save-statutory-pay`;
        try {
        await this.$axios.post(apiUrl,data);
        this.isErrors=false
        this.$showToast('success','Statutory updated.');
        } catch (error) {
        this.errors=error.response.data.errors
        this.isErrors=true
        }
    },

    //-----------GET Statutory Pay-----------
    async getstatutoryPay(){
        const apiUrl = `/get-statutory-pay`;
        try {
        let response=await this.$axios.get(apiUrl);
        response=response.data
        this.statutoryPay.recovered_smp_ytd=response.recovered_smp_ytd
        this.statutoryPay.smp_ni_compensation_ytd =response.smp_ni_compensation_ytd
        this.statutoryPay.recovered_spp_ytd =response.recovered_spp_ytd
        this.statutoryPay.spp_ni_compensation_ytd =response.spp_ni_compensation_ytd
        this.statutoryPay.recovered_sap_ytd =response.recovered_sap_ytd
        this.statutoryPay.sap_ni_compensation_ytd =response.sap_ni_compensation_ytd
        this.statutoryPay.recovered_spbp_ytd =response.recovered_spbp_ytd
        this.statutoryPay.spbp_ni_compensation_ytd =response.spbp_ni_compensation_ytd
        this.statutoryPay.recovered_shpp_ytd =response.recovered_shpp_ytd
        this.statutoryPay.shpp_ni_compensation_ytd =response.shpp_ni_compensation_ytd
        } catch (error) {
        let errors=error.response.data.errors
        }
    },

  }
}


</script>
<style scoped lang="scss">

</style>