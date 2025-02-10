<template>
    <div class="col-12">
      <div class="card">
        <div class="p-3">
          <div style="display:flex " class="justify-content-between align-content-end">
            <div>
                <h5>Employer Payment Summary (EPS)</h5>
                <p>Monthly reports with the employer payment summary which contain values that<br>
                    can’t be included in the full payment submission (FPS).</p>
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
                    <Button type="button" class="mr-3" label="New EPS Submission" @click="displayConfirmation=true" />
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
            <Column field="tax_month" header="Tax Month" :sortable="true">
            </Column>
            <Column field="submission_date" header="Submission Date" :sortable="true" />
            <Column field="type" header="Submission Type" :sortable="true">
            </Column>
            <Column field="status" header="Status" :sortable="true">
              <template #body="slotProps">
                <Tag :severity="getSeverity(slotProps.data.status)">{{ slotProps.data.status.toUpperCase() }}</Tag>  
              </template>
            </Column>
            <Column header="Action">
              <template #body="{ data }">
                <InputIcon @click="downloadEPSSubmissionFiles(data.id)" class="pi pi-download download-btn" />
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
                    <Button v-if="isSubmitting" label="Submitting..." icon="pi pi-check" class="p-button-text" autofocus />
                    <Button v-else @click="submitEPS" label="Confirm" icon="pi pi-check" class="p-button-text" autofocus />
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
      this.getEPSSubmissions()
      this.generateFinancialYearPeriods();
    },
    methods: {

      async submitEPS(){
        this.isSubmitting=true
        console.log('data',this.eps_data)
        const apiUrl = '/submitEPS';
        try {
        let response=await this.$axios.post(apiUrl,this.eps_data);
        this.displayConfirmation=false
        this.isSubmitting=false
          this.$showToast('success','EPS submitted successfully.');
          this.getEPSSubmissions()
        } catch (error) {
          this.$showToast('error','Something went wrong.');
        let errors=error.response.data.errors
        }
      },

      generateFinancialYearPeriods() {
        const currentDate = new Date();
        let startYear = currentDate.getFullYear();

        // Determine the correct financial year
        if (currentDate.getMonth() < 3 || (currentDate.getMonth() === 3 && currentDate.getDate() < 6)) {
          startYear -= 1;
        }
        const periods = [];
        for (let i = 0; i < 12; i++) {
          let startMonth = (3 + i) % 12; // April is index 3, wrap around at December
          let startYearOffset = startMonth < 3 ? 1 : 0;
          let start = moment(new Date(startYear + startYearOffset, startMonth, 6)).format('Do MMMM YYYY');
          
          let endMonth = (startMonth + 1) % 12;
          let endYearOffset = endMonth < 3 ? 1 : 0;
          let end = moment(new Date(startYear + endYearOffset, endMonth, 5)).format('Do MMMM YYYY');
          
          periods.push({
            code: i + 1,
            name: `Month ${i + 1}: ` + start +'-'+ end,
          });

          this.eps_data.tax_year= startYear.toString().slice(-2) +' - '+ (startYear+1).toString().slice(-2);
        }
        this.eps_periods= periods;
        console.log('data',this.eps_data)
      },

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

      //---------DOWNLOAD EPS Submission Files----------
      async downloadEPSSubmissionFiles(id) {
        let data={
          'submission_id':id
        }
        try {
          const response = await this.$axios.post("/downloadEPSSubmissionFiles",data);
          saveAs(response.data, 'eps.zip');
        } catch (error) {
          console.error("Download failed", error);
        }
      },
  
      //---------GET PAYROLL----------
      async getEPSSubmissions(){
        const apiUrl = `/getEPSSubmissions`;
        try {
        let response=await this.$axios.get(apiUrl);
        this.payrolls=response.data
        } catch (error) {
        let errors=error.response.data.errors
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