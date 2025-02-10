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
                    <!-- <div>
                      <Button type="button" icon="pi pi-upload" label="Import" outlined />
                    </div>
                    <span class="flex justify-content-between flex-column sm:flex-row">
                      <Button @click="redirectToNext()" type="button" icon="pi pi-arrow-right" label="Next" outlined />
                    </span> -->
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
      <div class="flex justify-content-between ">
        <p>Base Pay</p>
        <p>{{ formatCurrency(employeePaySummary.base_pay) }}</p>
      </div>
      <div v-if="employeePaySummary.pg_loan" class="flex justify-content-between ">
        <p>PG Student Loan</p>
        <p>{{ formatCurrency(employeePaySummary.pg_loan) }}</p>
      </div>
      <div v-if="employeePaySummary.student_loan" class="flex justify-content-between ">
        <p>Student Loan</p>
        <p>{{ formatCurrency(employeePaySummary.student_loan) }}</p>
      </div>
      <div v-if="employeePaySummary.sick_pay" class="flex justify-content-between ">
        <p>Statutory Sick Pay</p>
        <p>{{ formatCurrency(employeePaySummary.sick_pay) }}</p>
      </div>
      <div v-if="employeePaySummary.paternity_pay" class="flex justify-content-between ">
        <p>Paternity Pay</p>
        <p>{{ formatCurrency(employeePaySummary.paternity_pay) }}</p>
      </div>
      <template v-for="(item, index) in employeePaySummary.payitems">
        <div class="flex justify-content-between ">
          <p v-if="item.type=='Salary'" class="text-primary">{{ item.salarytype.description }}</p>
          <p v-if="item.type=='PayItem'" class="text-primary">{{ item.payitem.name }}</p>
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
        <Button v-if="isSending" label="Sending...." text="" />
        <template v-else>
          <Button @click="generatePdf('view')" label="View Payslip" text="" />
          <Button @click="generatePdf('send')" label="Send Payslip" text="" />
          <Button @click="generatePdf('download')" label="Download Payslip" text="" />
        </template>
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

  <div style="display: none;">
    <Payslip :employeePaySlip="employeePaySlip" ref="payslipRef" />
  </div>
  
  </template>

  <script>
    import html2pdf from "html2pdf.js";
    import Payslip from "./payslip.vue";
    import { useAppStore } from '@/stores/appStore';
  
  export default {
    components: {
      Payslip,
    },
    computed: {
      currentPage() {
        return this.appStore.currentPage;
      }
    },
    data() {
      return {
        appStore: useAppStore(),
        employeePaySlip:'',
        isSending:false,
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
        employeePaySummary:'',
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
        selectedEmployeedId:null,
        editPayItemDialog:false,
        paySummaryDialog:false,
        payItemDialog:false,
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
      this.getHourlyEmployees();
    },
    methods: {

      redirectToNext(){
        this.$router.push({ name: 'ReviewPayroll' });
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

      async generatePdf(type) {
        await this.getEmployeePayslip();
        // Reference the Payslip component
        const payslipElement = this.$refs.payslipRef.$el;
        // Define options for html2pdf
        const options = {
          margin: [0.25, 0.25, 0.25, 0.25], // Set custom margins for top, left, bottom, right
          filename: "payslip.pdf",
          html2canvas: { scale: 2 },
          jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
        };

        if(type=='download'){
          // Generate the PDF
          html2pdf().set(options).from(payslipElement).save();
        }else if(type=='view'){
          // Create a Promise to generate the PDF
          const pdfBlob = await html2pdf().set(options).from(payslipElement).outputPdf('blob');
          // Open the PDF in a new browser tab
          const pdfURL = URL.createObjectURL(pdfBlob);
          window.open(pdfURL, "_blank");
        }else if(type=='send'){
          // Create a Promise to generate the PDF
          const pdfBlob = await html2pdf().set(options).from(payslipElement).outputPdf('blob');
          const formData = new FormData();
          formData.append('payslip', pdfBlob, 'payslip.pdf');
          formData.append('employee_id', this.selectedEmployeedId);
          formData.append('payroll_id', this.$route.params.payroll_id);
          // Send the PDF to the server
          try {
              this.isSending=true
              const response = await  this.$axios.post('/sendpayslip', formData);
              this.paySummaryDialog=false
              this.isSending=false
              this.$showToast('success','Employee payslip sent successfully.');
          } catch (error) {
              this.paySummaryDialog=false
              this.isSending=false
              this.$showToast('error','Error sending payslip.');
              console.error('Error sending payslip:', error);
          }
        }
      },

      //-----------GET EMPLOYEE PAYSLIP-----------
      async getEmployeePayslip(){
        let data={
          'employee_id':this.selectedEmployeedId,
          'payroll_id':this.$route.params.payroll_id
        }
        const apiUrl = `/employeePaySlip`;
        try {
        let response=await this.$axios.post(apiUrl,data);
        this.employeePaySlip=response.data
        } catch (error) {
        }
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
        this.getHourlyEmployees();
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
        this.getHourlyEmployees();
        this.cleanNewItem()
        } catch (error) {
        let errors=error.response.data.errors
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
        this.getHourlyEmployees();
      } catch (error) {
        let errors=error.response.data.errors
        }
      },

      //-----------Open Pay Summary-----------
      onRowClick(event){
        console.log('clicked',event)
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
      async getHourlyEmployees(){
        let pay_schedule_id = this.$route.params.payschedule_id
        let payrollstatus=this.currentPage =='archived' ? 'archived' :'history';
        const apiUrl = `/hourlyEmployees`;
        let data={
            'payschedule_id':pay_schedule_id,
            'payroll_status':payrollstatus
          }
        try {
        let response=await this.$axios.post(apiUrl,data);
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