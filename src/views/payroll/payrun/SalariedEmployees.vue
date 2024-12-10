<template>

    <div class="col-12">
        <div class="card">
            <DataTable
                :value="salaried_employees"
                :paginator="true"
                :rows="20"
                @row-click="onRowClick"
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

    <Dialog v-model:visible="paySummaryDialog" :style="{ width: '450px' }" header="Summary" :modal="true" class="p-fluid">
      <div class="field">
        <h5>{{ employeePaySummary.name }}</h5>
        <p>Tax Code: {{ employeePaySummary.tax_code }}</p>
        <p>NI Category: {{ employeePaySummary.ni_category }}</p>
      </div>

      <div class="field">
        <h5 @click="openPayItem()" class="text-primary addpayitembtn">+Add pay item</h5>
        <div class="flex justify-content-between ">
          <p>Base Pay</p>
          <p>{{ formatCurrency(employeePaySummary.base_pay) }}</p>
        </div>
        <template v-for="(item, index) in employeePaySummary.payitems">
          <div class="flex justify-content-between ">
            <p @click="openEditPayItem(item)" v-if="item.type=='Salary'" class="text-primary editpayitembtn">{{ item.salarytype.description }}</p>
            <p @click="openEditPayItem(item)" v-if="item.type=='PayItem'" class="text-primary editpayitembtn">{{ item.payitem.name }}</p>
            <p>{{ formatCurrency(item.amount) }}</p>
          </div>
        </template>
      </div>

      <div class="field">
        <div class="flex justify-content-between ">
          <p>Employee NIC</p>
          <p>{{ formatCurrency(employeePaySummary.employee_nic) }}</p>
        </div>
        <div class="flex justify-content-between ">
          <p>PAYE Income Tax</p>
          <p>{{ formatCurrency(employeePaySummary.paye_income_tax) }}</p>
        </div>
        <div class="flex justify-content-between ">
          <p>Employee Pension</p>
          <p>{{ formatCurrency(employeePaySummary.employee_pension) }}</p>
        </div>
        <div class="flex justify-content-between ">
          <p>Net Pay</p>
          <p>{{ formatCurrency(employeePaySummary.net_pay) }}</p>
        </div>
      </div>

      <div class="field">
        <h5>Employer</h5>
        <div class="flex justify-content-between ">
          <p>Employer NIC</p>
          <p>{{ formatCurrency(employeePaySummary.employer_nic) }}</p>
        </div>
        <div class="flex justify-content-between ">
          <p>Employer Pension</p>
          <p>{{ formatCurrency(employeePaySummary.employer_pension) }}</p>
        </div>
      </div>

      <template #footer>
          <Button label="View Payslip" text="" />
          <Button label="Send Payslip" text="" />
      </template>
    </Dialog>

    
    <Dialog v-model:visible="payItemDialog" :style="{ width: '450px' }" header="Add Pay Item" :modal="true" class="p-fluid">
      <div class="field">
          <label for="Forename">Pay Items*</label>
          <Dropdown v-model="newPayItem.name" :options="payItems" optionLabel="name" placeholder="Select" style="width:100%;height:45px;"  />
      </div>

      <template v-if='checkPayItemType(newPayItem.name)=="PayItem"'>
          <div class="field">
              <label >Amount*</label>
              <InputText v-model="newPayItem.amount" class="mt-1" type="number" min="0" style="width:100%;height:45px;" />
          </div>
      </template>

      <template v-if='checkPayItemType(newPayItem.name)=="Salary"'>
          <div class="grid">
              <div v-if="newPayItem.name.salary_period=='hour'" class="field col-6">
                  <label >Hours*</label>
                  <InputText v-model="newPayItem.hours" class="mt-1" type="number" min="0" style="width:100%;height:45px;" />
              </div>
              <div v-if="newPayItem.name.salary_period=='unit'" class="field col-6">
                  <label >Units*</label>
                  <InputText v-model="newPayItem.units" class="mt-1" type="number" min="0" style="width:100%;height:45px;" />
              </div>
              <div class="field col-6">
                  <label >Salary Rate*</label>
                  <InputText v-model="newPayItem.salary_rate" class="mt-1" type="number" min="0" style="width:100%;height:45px;" />
              </div>
          </div>
          <div class="field">
              <label >Amount*</label>
              <InputText v-model="newPayItem.amount" class="mt-1" type="number" min="0" style="width:100%;height:45px;" />
          </div>
      </template>

      <template #footer>
          <Button @click="savePayItem()" label="Add" text="" />
          <Button @click="payItemDialog=false" label="Cancel" text="" />
      </template>
    </Dialog>

    <Dialog v-model:visible="editPayItemDialog" :style="{ width: '450px' }" @hide="closeEditDialog()" header="Edit Pay Item" :modal="true" class="p-fluid">
      <div class="field">
          <label for="Forename">Pay Items*</label>
          <Dropdown v-model="newPayItem.name" :options="payItems" optionLabel="name" placeholder="Select" style="width:100%;height:45px;"  />
      </div>

      <template v-if='checkPayItemType(newPayItem.name)=="PayItem"'>
          <div class="field">
              <label >Amount*</label>
              <InputText v-model="newPayItem.amount" class="mt-1" type="number" min="0" style="width:100%;height:45px;" />
          </div>
      </template>

      <template v-if='checkPayItemType(newPayItem.name)=="Salary"'>
          <div class="grid">
              <div v-if="newPayItem.name.salary_period=='hour'" class="field col-6">
                  <label >Hours*</label>
                  <InputText v-model="newPayItem.hours" class="mt-1" type="number" min="0" style="width:100%;height:45px;" />
              </div>
              <div v-if="newPayItem.name.salary_period=='unit'" class="field col-6">
                  <label >Units*</label>
                  <InputText v-model="newPayItem.units" class="mt-1" type="number" min="0" style="width:100%;height:45px;" />
              </div>
              <div class="field col-6">
                  <label >Salary Rate*</label>
                  <InputText v-model="newPayItem.salary_rate" class="mt-1" type="number" min="0" style="width:100%;height:45px;" />
              </div>
          </div>
          <div class="field">
              <label >Amount*</label>
              <InputText v-model="newPayItem.amount" class="mt-1" type="number" min="0" style="width:100%;height:45px;" />
          </div>
      </template>

      <template #footer>
          <Button @click="updatePayItem(),alert('Hello')" label="Update" text="" />
          <Button @click="removePayItem()" style="color: #b11440;" label="Remove" text="" />
      </template>
    </Dialog>
    

    </template>
    <script>
    
    export default {
      data() {
        return {
          payItems:'',
          newPayItem:{
            id:'', //optional only will be used when editing the record
            item_id:'', //optional only will be used when editing the record
            name:'',
            amount:'',
            hours:'',
            salary_rate:'',
            units:'',
            type:'',
          },
          selectedEmployeedId:null,
          editPayItemDialog:false,
          payItemDialog:false,
          employeePaySummary:'',
          paySummaryDialog:false,
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
      watch: {
        'newPayItem.name'(newValue, oldValue) {
          if(this.payItemDialog){
            this.newPayItem.amount=''
            this.newPayItem.hours=''
            this.newPayItem.salary_rate=''
            this.newPayItem.units=''
            this.newPayItem.type=''
            if(newValue.type=='salary'){
              this.newPayItem.salary_rate=newValue.salary_rate
            }
          }else{
            if(newValue.type=='salary'){
              this.newPayItem.salary_rate=newValue.salary_rate
              this.newPayItem.item_id=newValue.code;
            }else{
              this.newPayItem.item_id=newValue.code;
            }
          }
        },
        'newPayItem.hours'(newValue, oldValue) {
          if(this.newPayItem.hours){
          this.newPayItem.amount=(newValue) * (this.newPayItem.salary_rate)
          }else if(!this.newPayItem.units && !this.newPayItem.hours){
            this.newPayItem.amount=0  
          }
        },
        'newPayItem.units'(newValue, oldValue) {
          if(this.newPayItem.units){
          this.newPayItem.amount=(newValue) * (this.newPayItem.salary_rate)
          }else if(!this.newPayItem.units && !this.newPayItem.hours){
            this.newPayItem.amount=0  
          }
        }
      },
      mounted(){
        this.getSalariedEmployees();
      },
      computed:{

      },
      methods: {

        validateFields() {
          let requiredFields=[]
          if(this.newPayItem.name.salary_period=='hour'){
            requiredFields = ['name', 'amount', 'hours', 'salary_rate', 'type'];
          }else if(this.newPayItem.name.salary_period=='unit'){
            requiredFields = ['name', 'amount', 'units', 'salary_rate', 'type'];
          }else if(this.newPayItem.name.type=='payitem'){
            requiredFields = ['name', 'amount', 'type'];
          }
          for (const field of requiredFields) {
            if (!this.newPayItem[field]) {
              // this.$swal('Error', `${field.replace('_', ' ')} is required.`, 'error'); // Using SweetAlert2
              return false;
            }
          }
          return true;
        },
    
        closeEditDialog(){
          this.cleanNewItem()
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
          if(value !== null && value !== undefined){
            return value.toLocaleString('en-US', {
              style: 'currency',
              currency: 'GBP',
            });
          }
        },
 
        //-----------Open Edit PayItem Dialog-----------
        async openEditPayItem(data){
          this.editPayItemDialog=true
          this.paySummaryDialog=false
          await this.getPayItems();
          console.log('data',data)
          if(data.type=='Salary'){
            this.payItems.filter((item)=>{
              if(item.type=='salary' && item.code==data.salary_type_id){
                this.newPayItem.id=data.id;
                this.newPayItem.item_id=data.salary_type_id;
                this.newPayItem.amount=data.amount;
                this.newPayItem.name=item;
                this.newPayItem.salary_rate=data.salary_rate;
                this.newPayItem.type='salary';
                this.newPayItem.hours=data.hours;
                this.newPayItem.units=data.units;
              }
            })
          }else if(data.type=='PayItem'){
            this.payItems.filter((item)=>{
              if(item.type=='payitem' && item.code==data.pay_item_id){
                this.newPayItem.id=data.id;
                this.newPayItem.item_id=data.pay_item_id;
                this.newPayItem.name=item;
                this.newPayItem.amount=data.amount;
                this.newPayItem.type='payitem';
              }
            })
          }

          console.log('data set', this.newPayItem)
        },


        //-----------Update Pay Item-----------
        async updatePayItem(){
          // console.log(this.newPayItem)
          // return
          if (!this.validateFields()) {
            this.editPayItemDialog=false
            this.$showToast('error','missing fields.');
            this.cleanNewItem()
            return
          } 
          let data={
            'employee_id':this.selectedEmployeedId,
            'payroll_id':this.$route.params.payroll_id,
            id:this.newPayItem.id,
            item_id:this.newPayItem.item_id,
            name:this.newPayItem.name.name,
            type:this.newPayItem.name.type,
            hours:this.newPayItem.hours,
            units:this.newPayItem.units,
            salary_rate:this.newPayItem.salary_rate,
            amount:this.newPayItem.amount,
          }
          const apiUrl = `/updatePayItemToPaySummary`;
          try {
          let response=await this.$axios.post(apiUrl,data);
          this.editPayItemDialog=false
          this.$showToast('success','Employee pay Item Updated successfully.');
          this.getSalariedEmployees()
          this.cleanNewItem()
          } catch (error) {
          let errors=error.response.data.errors
          }
        },

        cleanNewItem(){
          this.newPayItem.name=''
          this.newPayItem.amount=''
          this.newPayItem.hours=''
          this.newPayItem.salary_rate=''
          this.newPayItem.units=''
          this.newPayItem.type=''
        },

        //-----------Remove Pay Item-----------
        async removePayItem(){
          let data={
            id:this.newPayItem.id,
          }
          const apiUrl = `/removePayItemToPaySummary`;
          try {
          let response=await this.$axios.post(apiUrl,data);
          this.editPayItemDialog=false
          this.$showToast('success','Employee pay Item Removed successfully.');
          this.getSalariedEmployees()
          this.cleanNewItem()
          } catch (error) {
          let errors=error.response.data.errors
          }
        },

        //-----------Open PayItem Dialog-----------
        openPayItem(){
          this.payItemDialog=true
          this.paySummaryDialog=false
          this.getPayItems();
        },

        //-----------Check PayItems Type-----------
        checkPayItemType(name){
          if(name.type=='payitem'){
            return 'PayItem'
          }else if(name.type=='salary'){
            return 'Salary'
          }else if(name.type=='overtime'){
            return 'Overtime'
          }
        },

        //-----------Save Pay Item-----------
        async savePayItem(){
          // if (!this.validateFields()) {
          //   this.payItemDialog=false
          //   this.$showToast('error','missing fields.');
          //   return
          // } 
          let data={
            'employee_id':this.selectedEmployeedId,
            'payroll_id':this.$route.params.payroll_id,
            name:this.newPayItem.name.name,
            id:this.newPayItem.name.code,
            type:this.newPayItem.name.type,
            hours:this.newPayItem.hours,
            units:this.newPayItem.units,
            salary_rate:this.newPayItem.salary_rate,
            amount:this.newPayItem.amount,
          }
          const apiUrl = `/addPayItemToPaySummary`;
          try {
          let response=await this.$axios.post(apiUrl,data);
          this.payItemDialog=false
          this.$showToast('success','Employee pay Item Added successfully.');
          this.getSalariedEmployees()
          } catch (error) {
          let errors=error.response.data.errors
          }
        },

        //-----------Get Pay Items-----------
        async getPayItems(){
          const apiUrl = `/getPayItemsDropDown`;
          try {
          let response=await this.$axios.get(apiUrl);
          this.payItems=response.data
          } catch (error) {
          let errors=error.response.data.errors
          }
        },

        //-----------Open Pay Summary-----------
        onRowClick(event){
          this.paySummaryDialog=!this.paySummaryDialog
          if(this.paySummaryDialog){
            const rowData = event.data;
            this.selectedEmployeedId=rowData.employee_id
            let data={
              'employee_id':rowData.employee_id,
              'payroll_id':this.$route.params.payroll_id
            }
            this.getEmployeePaySummary(data);
          }
        },

        //-----------Get Employee's Pay Summary-----------
        async getEmployeePaySummary(data){
          const apiUrl = `/employeePaySummary`;
          try {
          let response=await this.$axios.post(apiUrl,data);
          this.employeePaySummary=response.data
          } catch (error) {
          let errors=error.response.data.errors
          console.log('errors',errors)
          }
        },

        //-----------GET DETAILS----------
        async getSalariedEmployees(){
          let pay_schedule_id = this.$route.params.payschedule_id
          const apiUrl = `/salariedEmployees/`+pay_schedule_id;
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

    ::v-deep .p-datatable .p-datatable-tbody > tr {
      cursor: pointer !important;
    }
    .addpayitembtn:hover{
      cursor: pointer;
      text-decoration: underline;
    }
    .editpayitembtn:hover{
      cursor: pointer;
      text-decoration: underline;
    }
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