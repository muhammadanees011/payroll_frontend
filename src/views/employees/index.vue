<template>

<div class="col-12">
    <div class="card">
        <h5>Team Members</h5>
        <DataTable
            :value="employees"
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
                    <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined @click="clearFilter1()" />
                    <span class="flex justify-content-between flex-column sm:flex-row">
                      <IconField iconPosition="left">
                          <InputIcon class="pi pi-search" />
                          <InputText @keyup="debouncedSearch" v-model="searchTerm" placeholder="Keyword Search" style="width: 100%" />
                      </IconField>
                      <Button icon="pi pi-plus" label="New" @click="addEmployee" class="ml-2 " />
                    </span>
                </div>
            </template>
            <template #empty  v-if="!loading1"> No Team Members found. </template>
            <template v-if="loading1"> Loading Team Member's data. Please wait.... </template>

            <Column field="payroll_id" header="PAYROLL ID" :sortable="true" >
              <template #filter="{ filterModel }">
                <InputText type="text" v-bind="filterModel.value" class="p-column-filter" placeholder="Search by name" />
              </template>
            </Column>

              <Column field="name" header="Name" :sortable="true" style="min-width: 12rem">
                <template #body="{ data }">
                    {{ data.name }}
                </template>
                <template #filter="{ filterModel }">
                    <InputText type="text" v-bind="filterModel.value" class="p-column-filter" placeholder="Search by name" />
                </template>
            </Column>
            <!-- <Column field="name" header="Name" style="min-width: 12rem">
                <template #body="{ data }">
                    {{ data.name }}
                </template>
                <template #filter="{ filterModel }">
                    <InputText type="text" v-model="filterModel.value" class="p-column-filter" placeholder="Search by name" />
                </template>
            </Column> -->
            <Column field="payroll_status" header="Payroll Status" :filterMenuStyle="{ width: '14rem' }" style="min-width: 8rem">
                <template #body="{ data }">
                    <Tag v-if="data.payroll_status=='Pending Information'" @click="completeProfile(data.id,data.step)" :severity="getSeverity(data.payroll_status)" class="pending-info">{{ ('pending').toUpperCase() }}-></Tag>
                    <Tag v-else :severity="getSeverity(data.payroll_status)">{{ data.payroll_status.toUpperCase() }}</Tag>
                </template>
                <!-- <template #filter="{ filterModel }">
                    <InputNumber v-model="filterModel.value" mode="currency" currency="USD" locale="en-US" />
                </template> -->
            </Column>
            <Column field="pension_status" header="Pension Status" dataType="boolean" bodyClass="text-center" style="min-width: 8rem">
                <template #body="{ data }">
                    <i class="pi" :class="{ 'text-green-500 pi-check-circle': data.pension_status, 'text-pink-500 pi-times-circle': !data.pension_status }"></i>
                </template>
                <!-- <template #filter="{ filterModel }">
                    <TriStateCheckbox v-model="filterModel.value" />
                </template> -->
            </Column>
            <Column header="Actions">
              <template #body="{ data }">
                <Button @click="employeeRecord(data.id)" icon="pi pi-pencil" class="ml-2" />
                <Button @click="openConfirmation" icon="pi pi-trash" class="ml-2" />
                
                <Dialog header="Confirmation" v-model:visible="displayConfirmation" :style="{ width: '400px' }" :modal="true">
                  <div class="flex align-items-center justify-content-center">
                      <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                      <span>Are you sure you want to delete <b>{{ data.name }}</b>?</span>
                  </div>
                  <template #footer>
                      <Button label="No" icon="pi pi-times" @click="closeConfirmation" class="p-button-text" />
                      <Button label="Yes" icon="pi pi-check" @click="deleteEmployee(data.id)" class="p-button-text" autofocus />
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
      displayConfirmation:false,
      searchTerm:'',
      customer1: null,
      customer2: null,
      customer3: null,
      filters1: null,
      loading1: null,
      loading2: null,
      products: null,
      statuses: ['unqualified', 'qualified', 'new', 'negotiation', 'renewal', 'proposal'],
      employees:'',
      // employees: [
      //   { id: 1, name: 'John Doe', customer: 'Michael Brown', date: '2021-09-01', amount: 1200.00, status: 'Active' },
      //   { id: 2, name: 'Jane Smith', customer: 'Emily Davis', date: '2021-09-02', amount: 1100.00, status: 'In-Active' },
      //   { id: 3, name: 'Emily Johnson', customer: 'David Wilson', date: '2021-09-03', amount: 900.00, status: 'In-Active' },
      //   { id: 4, name: 'Michael Brown', customer: 'John Smith', date: '2021-09-04', amount: 1300.00, status: 'Active' }
      // ]
    };
  },
  mounted(){
    // this.initFilters1();
    this.getEmployees();
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
    
    openConfirmation(){
      this.displayConfirmation=true
    },
    
    closeConfirmation(){
      this.displayConfirmation=false 
    },

    //-----------ADD EMPLOYEE----------
    addEmployee(){
      this.$router.push({ name: 'AddEmployee' });
    },

    //-----------ENCRYPT PARAMS & REDIRECT----------
    completeProfile(id,step){
      const encryptedID = this.$encryptionHelper.encrypt(id);
      const encryptedStep = this.$encryptionHelper.encrypt(step);
      this.$router.push({ name: 'AddEmployee', params:{employee_id:encryptedID, step:encryptedStep} });
    },

    //-----------EMPLOYEE DETAILS----------
    employeeRecord(id){
      this.$router.push({ name: 'General', params: { id: id } });
    },
    
    //-----------CLEAR SEARCH FILTER----------
    clearFilter1(){
      this.searchTerm=''
      this.getEmployees();
      // this.initFilters1();
    },

    //-----------DEBOUNCE SEARCH----------
    debouncedSearch: debounce(function() {
        this.performSearch();
    }, 300),

    //-----------PERFORM SEARCH----------
    async performSearch(){
      this.loading1=true
      const apiUrl = `/search-employees`;
      let data={
        'searchTerm':this.searchTerm
      }
      try {
      let response=await this.$axios.post(apiUrl,data);
      this.employees=response.data
      this.loading1=false
      } catch (error) {
      let errors=error.response.data.errors
      console.log('errors',errors)
      }
    },

    //-----------GET EMPLOYEES----------
    async getEmployees(){
      this.loading1=true
      const apiUrl = `/get-employees`;
      try {
      let response=await this.$axios.get(apiUrl);
      this.employees=response.data
      this.loading1=false
      } catch (error) {
      let errors=error.response.data.errors
      console.log('errors',errors)
      }
    },

    //-----------DELETE EMPLOYEE----------
    async deleteEmployee(id){
      const apiUrl = `/delete-employee/`+id;
      try {
      await this.$axios.get(apiUrl);
      this.displayConfirmation=false 
      this.getEmployees()
      } catch (error) {
      let errors=error.response.data.errors
      console.log('errors',errors)
      }
    },

  }
}
</script>


<style scoped>
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