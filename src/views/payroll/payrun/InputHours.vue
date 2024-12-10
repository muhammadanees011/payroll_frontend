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
                        <Button label="Save Hours" @click="SaveInputHours()" class="ml-2 mr-2" />
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

                <Column header="Hours Worked" dataType="numeric" style="min-width: 10rem">
                    <template #body="{ data }">
                      <InputText 
                      @keydown.enter="handleWorkedHours(data, $event.target.value)"
                      @blur="handleWorkedHours(data, $event.target.value)"
                      v-model="data.hours_worked"
                      placeholder="Enter Number of hours worked"
                      style="width: 100%" />
                    </template>
                </Column>

                <Column header="Hourly Rate" dataType="numeric" style="min-width: 10rem">
                    <template #body="{ data }">
                        {{ formatCurrency(data.hourly_equivalent)}}
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
          hoursWorked:'',
          employeesHoursWorked:[],
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
        this.getInputHours();
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
        //-----------SAVE INPUT HOURS----------
        async SaveInputHours(){
          if(this.$route.params.payroll_id){
            this.salaried_employees.map((item)=>{
              item.payroll_id = this.$route.params.payroll_id
            })
          }
          let data={
            'employees':this.salaried_employees
          }
          const apiUrl = `/updateInputHours/`;
          try {
            let response=await this.$axios.post(apiUrl,data);
          } catch (error) {
            let errors=error.response.data.errors
            console.log('errors',errors)
          }
        },
        //-----------GET DETAILS----------
        async getInputHours(){
          let pay_schedule_id = this.$route.params.payschedule_id
          const apiUrl = `/inputHours/`+pay_schedule_id;
          try {
          let response=await this.$axios.get(apiUrl);
          this.salaried_employees=response.data
          } catch (error) {
          let errors=error.response.data.errors
          console.log('errors',errors)
          }
        },

        handleWorkedHours(data, hoursWorked){
          this.employeesHoursWorked.push(data)
          console.log(data)
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