<template>

    <div class="col-12">
        <div class="card">
            <DataTable
                :value="salaried_employees"
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
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} employees"
              >
                <template #header>
                    <div class="flex justify-content-between flex-column sm:flex-row">
                      <div>
                        <Button type="button" icon="pi pi-upload" label="Import" outlined />
                      </div>
                      <span class="flex justify-content-between flex-column sm:flex-row">
                        <Button type="button" icon="pi pi-arrow-right" label="Next" outlined />
                      </span>
                    </div>
                </template>
                <template #empty  v-if="!loading1"> No records found. </template>
                <template v-if="loading1"> Loading Employees data. Please wait.... </template>
    
                <Column field="employee_payrollId" header="Payroll ID">
                </Column>
    
                <Column field="name" header="Employee" style="min-width: 12rem">
                </Column>

                <Column header="Gross Pay" dataType="numeric" style="min-width: 10rem">
                    <template #body="{ data }">
                        {{ formatCurrency(data.gross_pay) }}
                    </template>
                </Column>

                <Column header="Net Pay" dataType="numeric" style="min-width: 10rem">
                    <template #body="{ data }">
                        {{ formatCurrency(data.net_pay) }}
                    </template>
                </Column>
            </DataTable>
    
        </div>
    </div>
    
    </template>
    <script>
    
    export default {
      data() {
        return {
          isEdit:null,
          isTable:true,
          isSummary:false,
          isAdd:false,
          validationErrors:[],
          displayConfirmation:false,
          searchTerm:'',
          filters1: null,
          loading1: null,
          employees:'',
          salaried_employees:'',
        };
      },
      mounted(){
        this.getHourlyEmployees();
      },
      computed:{

      },
      methods: {
    
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

        //-----------GET DETAILS----------
        async getHourlyEmployees(){
          let pay_schedule_id = this.$route.params.payschedule_id
          const apiUrl = `/hourlyEmployees/`+pay_schedule_id;
          try {
          let response=await this.$axios.get(apiUrl);
          this.salaried_employees=response.data
          } catch (error) {
          let errors=error.response.data.errors
          console.log('errors',errors)
          }
        },
    
        //-----------ADD EMPLOYEE----------
        addEmployee(){
          this.$router.push({ name: 'AddEmployee' });
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