<template>

    <div class="col-12">
        <div class="card">
            <h5>Payslips</h5>
            <DataTable
                :value="payslips"
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
                      -
                        <!-- <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined @click="clearFilter1()" /> -->
                        <span class="flex justify-content-between flex-column sm:flex-row">
                          <Button @click="downloadAllPayslips()" icon="pi pi-download" label="Download All" class="ml-2 " />
                        </span>
                    </div>
                </template>
                <template #empty  v-if="!loading1"> No Payslips found. </template>
                <template v-if="loading1"> Loading Payslips data. Please wait.... </template>
    
                <Column header="Payslip" filterField="file_name" :sortable="true" dataType="numeric" style="min-width: 10rem">
                    <template #body="{ data }">
                        <!-- <Button icon="pi pi-file" class="ml-2" /> -->
                        {{ data.file_name }}
                    </template>
                </Column>

                <Column field="tax_period" header="Tax Period " :sortable="true" style="min-width: 12rem"> 
                </Column>

                <Column field="pay_date" header="Pay Date" :sortable="true" >
                </Column>

                <Column header="Net Pay" filterField="days_unavailable" :sortable="true" dataType="numeric" style="min-width: 10rem">
                    <template #body="{ data }">
                        {{ formatCurrency(data.net_pay) }}
                    </template>
                </Column>
                <Column header="Actions">
                  <template #body="{ data }">
                    <Button @click="viewPayslip(data.id)" icon="pi pi-eye" class="ml-2" />
                    <Button @click="downloadPayslip(data.id)" icon="pi pi-download" class="ml-2" />
                    <Button @click="openConfirmation" icon="pi pi-trash" class="ml-2" />
                    
                    <Dialog header="Confirmation" v-model:visible="displayConfirmation" :style="{ width: '400px' }" :modal="true">
                      <div class="flex align-items-center justify-content-center">
                          <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                          <span>Are you sure you want to delete this record?</span>
                      </div>
                      <template #footer>
                          <Button label="No" icon="pi pi-times" @click="closeConfirmation" class="p-button-text" />
                          <Button label="Yes" icon="pi pi-check" @click="deletePayslip(data.id)" class="p-button-text" autofocus />
                      </template>
                    </Dialog>
    
                  </template>
                </Column>
            </DataTable>
    
        </div>
    </div>
    
    </template>
    <script>
    import { FilterMatchMode, FilterOperator } from 'primevue/api';
    import { debounce } from 'lodash';
    
    export default {
      data() {
        return {
        previewUrl:null,
        payslips:'',
        displayConfirmation:false,
        searchTerm:'',
        filters1: null,
        loading1: null,
        employees:'',
        sick_leaves:'',
        };
      },
      mounted(){
        this.getPayslips();
      },
      computed:{

      },
      methods: {
    
        initFilters1() {
          this.filters1 = {
            global: { value: null, matchMode: FilterMatchMode.CONTAINS },
            name: {
              operator: FilterOperator.AND,
              constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
            },
            start_date: {
              operator: FilterOperator.AND,
              constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
            },
            salary: {
              operator: FilterOperator.AND,
              constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
            },
            payroll_status: {
              operator: FilterOperator.OR,
              constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
            },
            pension_status: {
              value: [0, 100],
              matchMode: FilterMatchMode.BETWEEN,
            },
          };
        },

        
        //---------------FORMAT THE CURRENCY--------------           
        formatCurrency(value) {
          if(value !== null && value !== undefined){
            return value.toLocaleString('en-US', {
              style: 'currency',
              currency: 'GBP',
            });
          }
        },
    
        getSeverity(status) {
          switch (status) {
            case 'Active':
              return 'success';
            case 'Pending Information':
              return 'warning';
            default:
              return null;
          }
        },
        
        formatCurrency(value) {
          return value.toLocaleString('en-US', {
            style: 'currency',
            currency: 'GBP',
          });
        },

        async viewPayslip(id) {
          const apiUrl = `/viewEmployeePayslip/`+id;
          try {
            const response = await this.$axios.get(apiUrl, {
            responseType: 'blob'
            });
            const blob = new Blob([response.data], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            window.open(url, '_blank');
          } catch (error) {
          let errors=error.response.data.errors
          console.log('errors',errors)
          }
        },

        async downloadPayslip(id) {
          const apiUrl = `/downloadEmployeePayslip/`+id;
          try {
            const response = await this.$axios.get(apiUrl, {
            responseType: 'blob'
            });
            const blob = new Blob([response.data], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'payslip.pdf'; // You can use a dynamic filename if needed
            link.click();
            window.URL.revokeObjectURL(url);
          } catch (error) {
          let errors=error.response
          console.log('errors',errors)
          }
        },

        async downloadAllPayslips() {
            let employee_id = this.$route.params.id
            try {
                const response = await this.$axios.get(`/downloadAllPayslips/`+employee_id);
                const blob = new Blob([response.data], { type: 'application/zip' });
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = 'payslips.zip';
                link.click();
                window.URL.revokeObjectURL(url);
            } catch (error) {
                console.error('Error downloading payslips:', error.response?.data || error.message);
            }
        },


        async deletePayslip(id) {
          const apiUrl = `/deleteEmployeePayslip/`+id;
          try {
            const response = await this.$axios.get(apiUrl);
            this.getPayslips()
          } catch (error) {
          let errors=error.response
          console.log('errors',errors)
          }
        },
        
        openConfirmation(){
          this.displayConfirmation=true
        },
        
        closeConfirmation(){
          this.displayConfirmation=false 
        },

        //-----------GET DETAILS----------
        async getPayslips(){
          let employee_id = this.$route.params.id
          const apiUrl = `/getEmployeePayslips/`+employee_id;
          try {
          let response=await this.$axios.get(apiUrl);
          this.payslips=response.data
          } catch (error) {
          let errors=error.response.data.errors
          console.log('errors',errors)
          }
        },
        
        //-----------CLEAR SEARCH FILTER----------
        clearFilter1(){
          this.searchTerm=''
        },
    
      }
    }
    </script>
    
    
<style scoped>
    .p-calendar{
        width: 100%;
    }
    ::v-deep input{
        width:100%;
        height:45px !important;
    }
    .status-badge{
      /* background-color: #49AB8B; */
      display: inline-block;
      padding: 0.55em 0.6em;
      font-size: 12px;
      font-weight: 600;
      line-height: 1;
      color: #49AB8B;
      text-align: center;
      white-space: nowrap;
      vertical-align: baseline;
      border-radius: 0.45rem;
    }
    
    .status-badge-danger{
      /* background-color: #49AB8B; */
      display: inline-block;
      padding: 0.55em 0.6em;
      font-size: 12px;
      font-weight: 600;
      line-height: 1;
      color: #dc4343;
      text-align: center;
      white-space: nowrap;
      vertical-align: baseline;
      border-radius: 0.45rem;
    }
    .pending-info{
      cursor: pointer;
    }
</style>