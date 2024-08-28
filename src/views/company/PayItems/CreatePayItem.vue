<template>
  <!-- company details form -->
<div class="col-12 md:col-12">
    <div class="card card-w-title">
        <div class="grid">
            <div class="col-12 md:col-12 ">
                <div class="formgrid grid">
                <div class="field col-4">
                    <label for="companyName">Pay item name*</label>
                    <InputText id="companyName" optionLabel="companyName" type="text" style="width:100%;height:45px" />
                </div>
                <div class="field col-4">
                    <label for="companyName">Pay item code <sapn class="text-sm">(will be shown on your payroll journal)</sapn></label>
                    <InputText id="companyName" optionLabel="companyName" type="text" style="width:100%;height:45px" />
                </div>
            </div>
            </div>
        </div>
        <div class="grid">
            <div class="col-12 md:col-12">
            <div class="formgrid grid">
                <div class="field col-4">
                    <label for="name2">Payment Type*</label>
                    <Dropdown v-model="dropdownValue" :options="dropdownValues" optionLabel="name" placeholder="Select" style="width:100%;height:45px" />
                </div>
            </div>
            </div>
        </div>
        <p>Pay items( Select all that apply )</p>

        <div class="grid">
            <div class="col-12">
                <div class="field-checkbox mb-0">
                    <Checkbox id="checkOption1" name="option" value="Chicago" v-model="checkboxValue" />
                    <label for="checkOption1l" class="text-lg">Taxable </label>
                </div>
                <sapn class="text-sm ml-4">(We will include this amount in the total sum used to calculate income tax.)</sapn>
            </div>
            <div class="col-12">
                <div class="field-checkbox mb-0">
                    <Checkbox id="checkOption2" name="option" value="Los Angeles" v-model="checkboxValue" />
                    <label for="checkOption2" class="text-lg">Subject to National Insurance</label>
                </div>
                <sapn class="text-sm ml-4">(We will include this amount in the total sum used to calculate national insurance.)</sapn>
            </div>
            <div class="col-12">
                <div class="field-checkbox mb-0">
                    <Checkbox id="checkOption2" name="option" value="Los Angeles" v-model="checkboxValue" />
                    <label for="checkOption2" >Pensionable </label>
                </div>
                <sapn class="text-sm ml-4">(We will include this amount in the total sum used to calculate pension contributions.)</sapn>
            </div>
        </div>
        <br>
        <Button label="Save & Close" class="ml-2 mb-2"></Button>
        <Button @click="goBack()" label="Cancel" class="ml-2 mb-2"></Button>
    </div>
</div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  methods: {
    goBack(){
      this.$router.push({ name: 'company-payitems' });

    }
  }
}
</script>


<style scoped lang="scss">

</style>