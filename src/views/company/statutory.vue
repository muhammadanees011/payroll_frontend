<script setup>
import { ref } from "vue";
import StepProgress from 'vue-step-progress';
const checkboxValue = ref([]);
const dropdownValue = ref(null);
const currentStep = ref(0);
const dropdownValues = ref([
    { name: 'LTD-Private limited company', code: 'NY' },
    { name: 'LLP-Limited liability partnership', code: 'RM' },
    { name: 'LIMITED-PARTNERSHIP-Limited partnership', code: 'LDN' },
    { name: 'NORTHEREN-IRELAND-Northeren ireland company', code: 'IST' },
    { name: 'NORTHEREN-IRELAND-OTHER-Credit union (Northeren ireland)', code: 'PRS' },
    { name: 'OLD-PUBLIC-COMPANY-Old public company', code: 'RM' },
    { name: 'OTHER-Other company type', code: 'RM' },
    { name: 'OVERSEA-COMPANY-Overseas company', code: 'RM' },
    { name: 'PLC-Public limited company', code: 'RM' },
]);
const nestedRouteItems = ref([
    'Create Company Details', 'Basic Setup','Pay Schedule','Adding Employees' 
]);
</script>

<template>
  <!-- company details form -->
<div class="col-12 md:col-12">
    <div class="card card-w-title">
        <div class="grid">
            <div class="col-12 md:col-12 ">
                <div class="formgrid grid">
                <div class="field col-4">
                    <label for="companyName">Recovered SMP YTD</label>
                    <InputText id="companyName" optionLabel="companyName" placeholder="0.00" type="text" style="width:100%;height:45px" />
                </div>
                <div class="field col-4">
                    <label for="companyName">SMP NI Compensation YTD</label>
                    <InputText id="companyName" optionLabel="companyName" placeholder="0.00" type="text" style="width:100%;height:45px" />
                </div>
            </div>
            </div>
        </div>
        <div class="grid">
            <div class="col-12 md:col-12">
            <div class="formgrid grid">
                <div class="field col-4">
                <label for="yourpostCode">Recovered SPP YTD</label>
                <InputText id="yourpostCode" optionLabel="yourpostCode" placeholder="0.00" type="text" style="width:100%;height:45px" />
                </div>
                <div class="field col-4">
                <label for="postCode">SPP NI Compensation YTD</label>
                <InputText id="postCode" optionLabel="postCode" placeholder="0.00" type="text" style="width:100%;height:45px" />
                </div>
            </div>
            </div>
        </div>
        <div class="grid">
            <div class="col-12 md:col-12">
            <div class="formgrid grid">
                <div class="field col-4">
                <label for="address1">Recovered SAP YTD</label>
                <InputText id="address1" optionLabel="address1" placeholder="0.00" type="text" style="width:100%;height:45px" />
                </div>
                <div class="field col-4">
                <label for="address2">SAP NI Compensation YTD</label>
                <InputText id="address2" optionLabel="address2" placeholder="0.00" type="text" style="width:100%;height:45px" />
                </div>
            </div>
            </div>
        </div>
        <div class="grid">
            <div class="col-12 md:col-12">
            <div class="formgrid grid">
                <div class="field col-4">
                <label for="address1">Recovered SPBP YTD</label>
                <InputText id="address1" optionLabel="address1" placeholder="0.00" type="text" style="width:100%;height:45px" />
                </div>
                <div class="field col-4">
                <label for="address2">SPBP NI Compensation YTD</label>
                <InputText id="address2" optionLabel="address2" placeholder="0.00" type="text" style="width:100%;height:45px" />
                </div>
            </div>
            </div>
        </div>
        <div class="grid">
            <div class="col-12 md:col-12">
            <div class="formgrid grid">
                <div class="field col-4">
                <label for="address1">Recovered ShPP YTD</label>
                <InputText id="address1" optionLabel="address1" placeholder="0.00" type="text" style="width:100%;height:45px" />
                </div>
                <div class="field col-4">
                <label for="address2">ShPP NI Compensation YTD</label>
                <InputText id="address2" optionLabel="address2" placeholder="0.00" type="text" style="width:100%;height:45px" />
                </div>
            </div>
            </div>
        </div>
        <br>
        <Button label="Save" class="ml-2 mb-2"></Button>
        <Button label="Discard" class="ml-2 mb-2"></Button>
    </div>
</div>
</template>

<style scoped lang="scss">

</style>