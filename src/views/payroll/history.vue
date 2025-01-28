<template>
  <div class="col-12">
    <div class="card">
      <div class="p-3">
        <div style="display:flex " class="justify-content-between align-content-end">
          <h5>Payroll History</h5>
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
                <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined @click="clearFilter1()" />
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
          <Column field="pay_schedule_name" header="Schedule Name" :sortable="true" />
          <Column field="tax_period" header="Tax Period" :sortable="true" />
          <Column field="" header="Pay Run" :sortable="true">
            <template #body="slotProps">
              <span>{{slotProps.data.pay_run_start_date}} - {{slotProps.data.pay_run_end_date }}</span>
            </template>
          </Column>
          <Column field="pay_date" header="Pay Date" :sortable="true"/>
          <Column field="status" header="Status" :sortable="true">
            <template #body="slotProps">
              <Tag :severity="getSeverity(slotProps.data.status)">{{ slotProps.data.status.toUpperCase() }}</Tag>

              <!-- <span class="order-badge bg-success">{{ slotProps.data.status.toUpperCase() }}</span> -->
            </template>
          </Column>
          <Column header="Action">
            <template #body="{ data }">
              <!-- <Button @click="payrollRun(data.pay_schedule_id,data.id)">Run Payroll</Button> -->
              <Button @click="payrollRun(data.pay_schedule_id,data.id)" icon="pi pi-eye" class="ml-2" />
              <!-- <Button icon="pi pi-trash" class="ml-2" /> -->
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      payrolls:'',
    };
  },
  mounted(){
    this.getPayRolls()
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

    //---------PAYROLL RUN----------
    async payrollRun(payschedule_id,payroll_id){
      let data={
        payschedule_id:payschedule_id,
        payroll_id:payroll_id
      }
      const apiUrl = `/runPayroll`;
      try {
      let response=await this.$axios.post(apiUrl,data);
      } catch (error) {
      let errors=error.response.data.errors
      }
      this.$router.push({ name: 'HistoryPayrollSalariedEmployees', params: { payschedule_id: payschedule_id, payroll_id:payroll_id } });
    },

    //---------GET PAYROLL----------
    async getPayRolls(){
      const apiUrl = `/historyPayroll`;
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

</style>