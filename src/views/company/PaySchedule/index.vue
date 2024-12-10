<template>
    <div class="col-12">
      <div class="card">
        <div class="p-3">
          <div style="display:flex " class="justify-content-between align-content-end">
            <h5>Pay Schedules</h5>
            <Button @click="newPaySchedule()" icon="pi pi-plus" label="New Pay Schedule" class="mr-2 mb-2 " />

          </div>
          <DataTable 
          :value="paySchedules"
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
            <Column field="id" header="Id" :sortable="true" />
            <Column field="name" header="Name" :sortable="true" />
            <Column field="pay_frequency" header="Frequency" :sortable="true" />
            <Column field="amount" header="N Of Employees" :sortable="true">
              <template #body="slotProps">
                N/A
              </template>
            </Column>
            <Column field="status" header="Status" :sortable="true">
              <template #body="slotProps">
                <span :class="'order-badge order-' + (slotProps.data.status ? slotProps.data.status.toLowerCase() : '')">{{ slotProps.data.status }}</span>
              </template>
            </Column>
            <Column header="Action">
              <template  #body="slotProps">
                <Button @click="changeStatus('Inactive',slotProps.data.id)" v-if="slotProps.data.status=='Active'" icon="pi pi-check-circle"/>
                <Button @click="changeStatus('Active',slotProps.data.id)" v-if="slotProps.data.status=='Inactive'" icon="pi pi-check-circle" style="background-color: white;color: green;"/>
                <Button @click="editPaySchedule(slotProps.data.id)" icon="pi pi-pencil" class="ml-2" />
                <Button @click="deletePaySchedule(slotProps.data.id)" icon="pi pi-trash" class="ml-2" />
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
      paySchedules:'',
    };
  },
  mounted(){
    this.getPaySchedules()
  },
  methods: {

    formatCurrency(value) {
      return `$${value.toFixed(2)}`;
    },

    newPaySchedule(){
      this.$router.push({ name: 'company-create-pay-schedules' });
    },

    async getPaySchedules(){
      const apiUrl = `/get-pay-schedule`;
      try {
      let response=await this.$axios.get(apiUrl);
      this.paySchedules=response.data
      } catch (error) {
      let errors=error.response.data.errors
      }
    },

    async deletePaySchedule(id){
      const isConfirmed =await this.$showConfirmation();
      if (isConfirmed) {
      } else {
      return
      }

      const apiUrl = `/delete-pay-schedule/`+id;
      try {
      let response=await this.$axios.get(apiUrl);
      this.$showToast('success','Pay Schedule deleted successfully.');
      this.getPaySchedules()
      } catch (error) {
      let errors=error.response.data.errors
      }
    },

    async changeStatus(status,id){
      const apiUrl = `/status-pay-schedule/`+id;
      let data={
        status:status
      }
      try {
      let response=await this.$axios.post(apiUrl,data);
      this.$showToast('success','Status updated successfully.');
      this.getPaySchedules()
      } catch (error) {
      let errors=error.response.data.errors
      }
    },

    editPaySchedule(dataId){
      this.$router.push({ name: 'company-edit-pay-schedules', params:{id:dataId} });
    },

  }
}
</script>


<style scoped lang="scss">

</style>