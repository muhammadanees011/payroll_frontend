<template>
    <div class="col-12">
      <div class="card">
        <div class="p-3">
          <div style="display:flex " class="justify-content-between align-content-end">
            <div>
                <h5>Full Payment Submission (FPS)</h5>
                <p>A Full Payment Submission (FPS) is a report sent to HM Revenue and Customs (HMRC)<br>
                about payments and deductions made to employees every time they are paid.</p>
                
                <div class="mb-3 mt-3 w-full border-200 border-top-1 border-left-1 border-right-1 border-bottom-1">
                    <span class="mt-3 flex">
                        <h5 class="text-900 px-3 lg:text-sm font-medium mb-3 block">
                            <i class="pi pi-fw pi-exclamation-circle"></i>
                            Please find below all the FPS reports that have been sent to HMRC, you can download them for your future reference.</h5>
                    </span>
                </div>

            </div>
          </div>
          <DataTable
            :value="payrolls"
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
                  <div>
                    <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined @click="clearFilter1()" />
                  </div>
                  <span class="flex justify-content-between flex-column sm:flex-row">
                    <IconField iconPosition="left">
                        <InputIcon class="pi pi-search" />
                        <InputText @keyup="debouncedSearch" v-model="searchTerm" placeholder="Keyword Search" style="width: 100%" />
                    </IconField>
                  </span>
              </div>
            </template>
            <template #empty  v-if="!loading1"> No Team Members found. </template>
            <template v-if="loading1"> Loading Team Member's data. Please wait.... </template>
  
            <Column field="id" header="Id" :sortable="true" />            
            <Column field="tax_period" header="Tax Period" :sortable="true">
            </Column>
            <Column field="pay_run_start_date" header="Payrun Start Date" :sortable="true">
            </Column>
            <Column field="pay_run_end_date" header="Payrun End Date" :sortable="true">
            </Column>
            <Column field="submission_date" header="Submission Date" :sortable="true" />
            <Column field="payschedule_name" header="Payschedule Name" :sortable="true" />
            <Column field="status" header="Status" :sortable="true">
              <template #body="slotProps">
                <Tag :severity="getSeverity(slotProps.data.status)">{{ slotProps.data.status.toUpperCase() }}</Tag>
              </template>
            </Column>
            <Column header="Action">
              <template #body="{ data }">
                <InputIcon @click="downloadFPSSubmissionFiles(data.id)" class="pi pi-download download-btn" />
              </template>
            </Column>
          </DataTable>
            <Dialog header="CONFIRM EPS SUBMISSION" v-model:visible="displayConfirmation" :style="{ width: '600px' }" :modal="true">
              
                  <div class="formgrid grid">
                    <div class="field col-12">
                      <label for="name2">Select Period* </label>
                      <Dropdown v-model="this.eps_data.period" :options="eps_periods" optionLabel="name" placeholder="Select an option" style="width:100%;height:45px;" />
                    </div>
                  </div>

                  <span>Do you confirm that you want to submit EPS ?</span>
                  <ul>
                      <li>Tax Year: {{ eps_data.tax_year }}</li>
                      <li>{{ eps_data.type }}</li>
                      <li>Period: {{ eps_data.period ? eps_data.period.name : ''}}</li>
                  </ul>
                  <p>
                      Once you click on confirm, we will send automatically the required data to HMRC for RTI purposes.
                  </p>

                <template #footer>
                    <Button label="Cancel" icon="pi pi-times" @click="closeConfirmation" class="p-button-text" />
                </template>
            </Dialog>
        </div>
      </div>
    </div>
  </template>
  <script>
  import moment from 'moment';
  import { saveAs } from "file-saver";

  export default {
    data() {
      return {
        isSubmitting:false,
        displayConfirmation:false,
        payrolls:'',
        eps_periods: [],
        eps_data:{
          tax_year:'',
          period:'',
          type:'No Payment Submission'
        }
      };
    },
    mounted(){
      this.getFPSSubmissions()
    },
    methods: {

      //-----------FORMAT CURRENCY-----------
      formatCurrency(value) {
        return `$${value.toFixed(2)}`;
      },
  
      //----------ADD EMPLOYEE-----------
      addEmployee(){
        this.$router.push({ name: 'AddEmployee' });
  
      },

      openConfirmation(){
        this.displayConfirmation=true
      },
    
      closeConfirmation(){
        this.displayConfirmation=false 
      },

  
      //---------GET PAYROLL----------
      async getFPSSubmissions(){
        const apiUrl = `/getFPSSubmissions`;
        try {
        let response=await this.$axios.get(apiUrl);
        this.payrolls=response.data
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