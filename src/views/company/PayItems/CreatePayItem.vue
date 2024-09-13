<template>
  <!-- company details form -->
<div class="col-12 md:col-12">
    <div class="card card-w-title">
        <div class="grid">
            <div class="col-12 md:col-12 ">

                <div v-if="isSuccess" class="text-center mb-5 pt-2 pb-2" style="background-color: #80D1B4; border-radius: 5px !important;">
                    <span class="text-white font-medium">Saved Successfully</span>
                </div>

                <div v-if="isErrors" class="mb-5 py-4 pl-3" style="background-color: #E88D58; border-radius: 5px !important;">
                    <span v-for="error in errors" class="text-white font-medium">
                        {{ error }}
                        <br>
                    </span>
                </div>

                <div class="formgrid grid">
                <div class="field col-4">
                    <label for="companyName">Pay item name*</label>
                    <InputText v-model="payItem.name" id="companyName" optionLabel="companyName" type="text" style="width:100%;height:45px" />
                    <span v-if="validationErrors.name" class="font-medium validation-text p-2">
                        {{validationErrors.name}}
                    </span>
                </div>
                <div class="field col-4">
                    <label for="companyName">Pay item code <sapn class="text-sm">(will be shown on your payroll journal)</sapn></label>
                    <InputText v-model="payItem.code" id="companyName" optionLabel="companyName" type="text" style="width:100%;height:45px" />
                    <span v-if="validationErrors.code" class="font-medium validation-text p-2">
                        {{validationErrors.code}}
                    </span>
                </div>
            </div>
            </div>
        </div>
        <div class="grid">
            <div class="col-12 md:col-12">
            <div class="formgrid grid">
                <div class="field col-4">
                    <label for="name2">Payment Type*</label>
                    <Dropdown v-model="payItem.payment_type" :options="dropdownValues" optionLabel="name" placeholder="Select" style="width:100%;height:45px" />
                    <span v-if="validationErrors.payment_type" class="font-medium validation-text p-2">
                        {{validationErrors.payment_type}}
                    </span>
                </div>
            </div>
            </div>
        </div>
        <p>Pay items( Select all that apply )</p>

        <div class="grid">
            <div class="col-12">
                <div class="field-checkbox mb-0">
                    <Checkbox id="checkOption1" name="option" value="taxable" v-model="payItem.taxable" />
                    <label for="checkOption1l" class="text-lg">Taxable </label>
                </div>
                <sapn class="text-sm ml-4">(We will include this amount in the total sum used to calculate income tax.)</sapn>
            </div>
            <div class="col-12">
                <div class="field-checkbox mb-0">
                    <Checkbox id="checkOption2" name="option" value="subject_to_national_insurance" v-model="payItem.subject_to_national_insurance" />
                    <label for="checkOption2" class="text-lg">Subject to National Insurance</label>
                </div>
                <sapn class="text-sm ml-4">(We will include this amount in the total sum used to calculate national insurance.)</sapn>
            </div>
            <div class="col-12">
                <div class="field-checkbox mb-0">
                    <Checkbox id="checkOption2" name="option" value="pensionable" v-model="payItem.pensionable" />
                    <label for="checkOption2" >Pensionable </label>
                </div>
                <sapn class="text-sm ml-4">(We will include this amount in the total sum used to calculate pension contributions.)</sapn>
            </div>
        </div>
        <br>
        <Button @click="validateData" label="Save & Close" class="ml-2 mb-2"></Button>
        <Button @click="goBack()" label="Cancel" class="ml-2 mb-2"></Button>
    </div>
</div>
</template>

<script>
export default {
  data() {
    return {
        validationErrors:'',
        errors:null,
        isSuccess:false,
        isErrors:false,

        payItem:{
        name:'',
        code:'',
        is_benefit_in_kind:'',
        taxable:'',
        pensionable:'',
        subject_to_national_insurance:'',
        payment_type:''
        },

        dropdownValues: [
        { name: 'Gross Addition', code: 'Gross Addition' },
        { name: 'Gross Deduction', code: 'Gross Deduction' },
        { name: 'Net Addition', code: 'Net Addition' },
        { name: 'Net Deduction', code: 'Net Deduction' },
      ],
    };
  },
  methods: {
    validateData(){
        const optionalFields = ['taxable','pensionable','subject_to_national_insurance','is_benefit_in_kind'];
        this.validationErrors = this.$validateFormData(this.payItem, optionalFields);
        if (Object.keys(this.validationErrors).length === 0 ) {
          this.savePayItem()
        } else {
          console.log('Validation errors:', this.validationErrors);
        }
    },

    goBack(){
      this.$router.push({ name: 'company-payitems' });
    },

    //-----------SAVE Pay Item-----------
    async savePayItem(){
        let data = this.payItem
        const apiUrl = `/save-pay-item`;
        try {
        await this.$axios.post(apiUrl,data);
        this.$showToast('success','Pay Item created successfully.');
        this.isErrors=false
        this.isSuccess=true
        this.goBack()
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