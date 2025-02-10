<template>
    <div class="col-12">
      <div class="card">
        <div class="p-3">
          <div style="display:flex " class="justify-content-between align-content-start">
            <div>
                <h5>Payment Summary</h5>            
            </div>
          </div>

          <div style="display:flex">
            <div class="formgrid grid mr-3">
                <div class="field col-12">
                    <label for="name2">Tax year</label>
                    <Dropdown @change="getP32TaxesFilings()" v-model="taxes_filings_data.tax_year" :options="tax_year" optionLabel="name" placeholder="Select an option" style="width:100%;height:35px;" />
                </div>
            </div>
            <div class="formgrid grid mr-3">
                <div class="field col-12">
                    <label for="name2">From tax month</label>
                    <Dropdown @change="getP32TaxesFilings()" v-model="taxes_filings_data.from_tax_month" :options="taxMonths" optionLabel="name" placeholder="Select an option" style="width:100%;height:35px;" />
                </div>
            </div>
            <div class="formgrid grid mr-3">
                <div class="field col-12">
                    <label for="name2">To tax month</label>
                    <Dropdown @change="getP32TaxesFilings()" v-model="taxes_filings_data.to_tax_month" :options="taxMonths" optionLabel="name" placeholder="Select an option" style="width:100%;height:35px;" />
                </div>
            </div>
          </div>
          
          <DataTable
            ref="table"
            :value="taxesFilings"
            :paginator="true"
            :rows="20"
            dataKey="id"
            :rowHover="true"
            v-model:filters="filters1"
            filterDisplay="menu"  
            :loading="false"
            :filters="filters1"
            :globalFilterFields="['name', 'representative.name', 'balance', 'status']"
            showGridlines
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            :rowsPerPageOptions="[20, 40, 80, 100, 200]"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} team members"
          >

            <template #header>
              <div class="flex justify-content-between flex-column sm:flex-row">
                <span></span>
                <Button @click="exportTableToXLS()" type="button" class="mr-3" label="Download CSV Report"/>
              </div>
            </template>
            <template #empty  v-if="!loading1"> No Team Members found. </template>
            <template v-if="loading1"> Loading Team Member's data. Please wait.... </template>
  
            <Column field="tax_month" header="Tax Month" :sortable="true" />            
            <Column field="total_paye" header="Total PAYE" :sortable="true">
                <template #body="slotProps">
                    <span>{{formatCurrency(slotProps.data.total_paye)}}</span>
                </template>
            </Column>
            <Column field="gross_national_insurance" header="Gross National Insurance" :sortable="true">
                <template #body="slotProps">
                    <span>{{formatCurrency(slotProps.data.gross_national_insurance)}}</span>
                </template>
            </Column>
            <Column field="claimed_employment_allowance" header="Claimed Employment Allowance" :sortable="true">
                <template #body="slotProps">
                    <span>{{formatCurrency(slotProps.data.claimed_employment_allowance)}}</span>
                </template>
            </Column>
            <Column field="total_statutory_recoveries" header="Total Statutory Recoveries" :sortable="true">
                <template #body="slotProps">
                    <span>{{formatCurrency(slotProps.data.total_statutory_recoveries)}}</span>
                </template>
            </Column>
            <Column field="apprentice_levy" header="Apprentice Levy" :sortable="true">
                <template #body="slotProps">
                    <span>{{formatCurrency(slotProps.data.apprentice_levy)}}</span>
                </template>
            </Column>
            <Column field="cis_deductions" header="CIS Deductions" :sortable="true">
                <template #body="slotProps">
                    <span>{{formatCurrency(slotProps.data.cis_deductions)}}</span>
                </template>
            </Column>
            <Column field="amount_due" header="Amount Due" :sortable="true">
                <template #body="slotProps">
                    <span>{{formatCurrency(slotProps.data.amount_due)}}</span>
                </template>
            </Column>

          </DataTable>
        </div>
      </div>
    </div>
  </template>
  <script>
  import { saveAs } from "file-saver";
  import * as XLSX from 'xlsx';

  export default {
    data() {
      return {
        isSubmitting:false,
        displayConfirmation:false,
        taxesFilings:'',
        tax_year: [
            { name: '24-25', code: '24-25' },
        ],
        taxMonths: [
            { name: 'Tax month 1', code: '1' },
            { name: 'Tax month 2', code: '2' },
            { name: 'Tax month 3', code: '3' },
            { name: 'Tax month 4', code: '4' },
            { name: 'Tax month 5', code: '5' },
            { name: 'Tax month 6', code: '6' },
            { name: 'Tax month 7', code: '7' },
            { name: 'Tax month 8', code: '8' },
            { name: 'Tax month 9', code: '9' },
            { name: 'Tax month 10', code: '10' },
            { name: 'Tax month 11', code: '11' },
            { name: 'Tax month 12', code: '12' },
        ],
        taxes_filings_data:{
          tax_year:{ name: '24-25', code: '24-25' },
          from_tax_month:{ name: 'Tax month 1', code: '1' },
          to_tax_month:{ name: 'Tax month 12', code: '12' }
        }
      };
    },
    mounted(){
      this.getP32TaxesFilings()
    },
    methods: {

    //-----------EXPORT DATA XLSX-----------
    exportTableToXLS() {
        const filteredData = this.taxesFilings.map(({ id, created_at, updated_at, ...rest }) => rest);
        const worksheet = XLSX.utils.json_to_sheet(filteredData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "taxesFilings");
        XLSX.writeFile(workbook, "p32_taxes_filings.xlsx");
    },

    //-----------FORMAT CURRENCY-----------
    formatCurrency(value) {
        return `£${value.toFixed(2)}`;
    },

    openConfirmation(){
        this.displayConfirmation=true
    },
    
    closeConfirmation(){
        this.displayConfirmation=false 
    },

    //---------GET P32 Taxes Filings----------
    async getP32TaxesFilings(){
        const apiUrl = `/getP32TaxesFilings`;
        try {
        let response=await this.$axios.post(apiUrl,this.taxes_filings_data);
        this.taxesFilings=response.data
        } catch (error) {
        let errors=error.response.data.errors
        }
    },

    //---------DOWNLOAD FPS Submission Files----------
    async downloadFPSSubmissionFiles(id) {
        let data={
            'submission_id':id
        }
        try {
            const response = await this.$axios.post("/downloadFPSSubmissionFiles",data);
            saveAs(response.data, 'fps.zip');
        } catch (error) {
            console.error("Download failed", error);
        }
    },
  
    getSeverity(status) {
        switch (status) {
            case 'active':
            return 'success';
            case 'draft':
            return 'warning';
            default:
            return null;
        }
    },
  
    }
  }
  </script>
  
  
  <style scoped lang="scss">
    .download-btn{
      cursor: pointer;
    }
  </style>