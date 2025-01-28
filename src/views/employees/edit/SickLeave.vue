<template>

    <div v-if="isTable" class="col-12">
        <div class="card">
            <h5>Sick Leave</h5>
            <DataTable
                :value="sick_leaves"
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
                          <Button icon="pi pi-plus" label="Add Sick PayLeave" @click="isAdd=true;  isTable=false" class="ml-2 " />
                        </span>
                    </div>
                </template>
                <template #empty  v-if="!loading1"> No Team Members found. </template>
                <template v-if="loading1"> Loading Team Member's data. Please wait.... </template>
    
                <Column field="start_date" header="First Day" :sortable="true" >
                  <template #filter="{ filterModel }">
                    <Calendar v-model="filterModel.value" dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" />
                </template>
                </Column>
    
                  <Column field="end_date" header="Last Day" :sortable="true" style="min-width: 12rem">
                    <template #filter="{ filterModel }">
                        <Calendar v-model="filterModel.value" dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" />
                    </template>
                </Column>
                <Column header="Deducted Days" filterField="days_unavailable" :sortable="true" dataType="numeric" style="min-width: 10rem">
                    <template #body="{ data }">
                        {{ data.days_unavailable }}
                    </template>
                </Column>
                <Column header="Waiting Days" filterField="statutory_waiting_days" :sortable="true" dataType="numeric" style="min-width: 10rem">
                    <template #body="{ data }">
                        {{ data.statutory_waiting_days }}
                    </template>
                </Column>
                <Column field="statutory_payable_days" header="Payble Days" :filterMenuStyle="{ width: '14rem' }" style="min-width: 8rem">
                    <template #body="{ data }">
                        {{ data.statutory_payable_days }}
                    </template>
                </Column>
                <!-- <Column header="Status" field="status" :sortable="true" filterField="start_date" dataType="date" style="min-width: 10rem">
                    <template #body="{ data }">
                        <Tag :severity="getSeverity(data.status)">{{ data.status ? data.status:'N/A' }}</Tag>
                    </template>
                </Column> -->
                <Column header="Actions">
                  <template #body="{ data }">
                    <!-- <Button @click="employeeRecord(data.id)" icon="pi pi-pencil" class="ml-2" /> -->
                    <!-- <template  v-if="data.status=='paid'"> -->
                      <Button @click="openConfirmation(data.id)" icon="pi pi-trash" class="ml-2" />
                    <!-- </template> -->
                    
                    <Dialog header="Confirmation" v-model:visible="displayConfirmation" :style="{ width: '400px' }" :modal="true">
                      <div class="flex align-items-center justify-content-center">
                          <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                          <span>Are you sure you want to delete this record?</span>
                      </div>
                      <template #footer>
                          <Button label="No" icon="pi pi-times" @click="closeConfirmation" class="p-button-text" />
                          <Button label="Yes" icon="pi pi-check" @click="deleteSickLeave" class="p-button-text" autofocus />
                      </template>
                    </Dialog>
    
                  </template>
                </Column>
            </DataTable>
    
        </div>
    </div>

    <div v-if="isAdd">
        <div class="grid">
            <div class="col-12 md:col-12 mt-5">
                <Strong for="Forename">When was the first sick day?</Strong>
                <br>
                <small>This includes weekends, bank holidays, and non-working days.</small>
                <div class="formgrid grid">
                    <div class="field col-6 mt-4">
                        <label for="NI_Category">First Sick day</label>
                        <br>
                        <Calendar v-model="details.start_date" :showIcon="true" :showButtonBar="true"></Calendar>
                        <span v-if="validationErrors.start_date" class="font-medium validation-text p-2">
                          {{validationErrors.start_date}}
                        </span>
                    </div>
                </div>

                <div class="formgrid grid mt-3">
                    <div class="field col-12" >
                    <Strong for="Forename">Do you know Muhammad Anees last sick day?</Strong>
                    <br>
                    <small>If no, we will pay statutory payments until you tell us Muhammad Anees has returned to work.</small>

                    </div>
                    <div class="col-12 md:col-2">
                    <div class="field-radiobutton mb-0">
                        <RadioButton id="option1" name="option" value="No" v-model="details.last_sick_day" />
                        <label for="option1">No</label>
                    </div>
                    </div>
                    <div class="col-12 md:col-2">
                    <div class="field-radiobutton mb-0">
                        <RadioButton id="option2" name="option" value="Yes" v-model="details.last_sick_day"/>
                        <label for="option2">Yes</label>
                    </div>
                    </div>
                </div>
                <span v-if="validationErrors.last_sick_day" class="font-medium validation-text p-2">
                  {{validationErrors.last_sick_day}}
                </span>

                <div v-if="details.last_sick_day === 'Yes'"  class="formgrid grid">
                    <div class="field col-6 mt-4">
                        <label for="NI_Category">Last Sick day</label><br>
                        <Calendar v-model="details.end_date" @update:modelValue="validateEndDate" :showIcon="true" :showButtonBar="true"></Calendar>
                        <span v-if="validationErrors.end_date" class="font-medium validation-text p-2">
                        {{validationErrors.end_date}}
                        </span>
                    </div>
                </div>

                <div class="formgrid grid">
                    <div class="field col-6 mt-4">
                        <label for="NI_Category">Average weekly earnings</label><br>
                        <InputText v-model="details.average_weekly_earnings"  id="Forename" type="text" />
                        <span v-if="validationErrors.average_weekly_earnings" class="font-medium validation-text p-2">
                        {{validationErrors.average_weekly_earnings}}
                        </span>
                    </div>
                </div>
                
                <br>
                <Button @click="isAdd=false; isTable=true" label="Cancel" severity="secondary" class="mt-5 ml-2"></Button>
                <Button @click="continueStep()" label="Save" class="ml-2 mt-3"></Button>
            </div>
        </div>
    </div>

    <div v-if="isSummary" class="formgrid grid">
        <div class="field col-6 mt-5">
            <ul class="list-none p-0 m-0">
                <li class="flex flex-column md:flex-row md:align-items-center md:justify-content-between mt-4 mb-4">
                    <div>
                        <span class="text-900 font-medium mr-2 mb-1 md:mb-0">Absence</span>
                        <div class="mt-1 text-600">First Sick Day</div>
                    </div>
                    <div class="mt-2 md:mt-0 flex align-items-center">
                        <span v-if="details.start_date" class="text-500 ml-3 font-medium">{{ startDate }}</span>
                        <span v-else class="text-500 ml-3 font-medium">N/A</span>                        
                    </div>
                </li>
                <li class="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
                    <div>
                        <div class="mt-1 text-600">Last Sick Day</div>
                    </div>
                    <div class="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
                        <span v-if="details.end_date" class="text-500 ml-3 font-medium">{{ endDate }}</span>
                        <span v-else class="text-500 ml-3 font-medium">N/A</span>
                    </div>
                </li>
                <li class="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
                    <div>
                        <div class="mt-1 text-600">Days unavailable</div>
                    </div>
                    <div class="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
                        <span v-if="details.end_date" class="text-500 ml-3 font-medium">{{ unavailable_days }}</span>
                        <span v-else class="text-500 ml-3 font-medium">N/A</span>
                    </div>
                </li>
                <hr>

                <li class="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
                    <div>
                        <span class="text-900 font-medium mr-2 mb-1 md:mb-0">Employment</span>
                        <div class="mt-1 text-600">Average weekly earnings</div>
                    </div>
                    <div class="mt-2 md:mt-0 flex align-items-center">
                        <span class="text-500 ml-3 font-medium">{{ details.average_weekly_earnings }}</span>
                    </div>
                </li>
                <!-- <li class="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
                    <div>
                        <div class="mt-1 text-600">Working pattern</div>
                    </div>
                    <div class="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
                        <span class="text-cyan-500 ml-3 font-medium">%16</span>
                    </div>
                </li> -->
                <hr>

                <li class="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
                    <div>
                        <span class="text-900 font-medium mr-2 mb-1 md:mb-0">Statutory Sick Pay</span>
                        <div class="mt-1 text-600">Qualifying Days</div>
                    </div>
                    <div class="mt-2 md:mt-0 flex align-items-center">
                        <span class="text-500 ml-3 font-medium">{{ working_days }}</span>
                    </div>
                </li>
                <!-- <li class="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
                    <div>
                        <div class="mt-1 text-600">Waiting days</div>
                    </div>
                    <div class="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
                        <span class="text-500 ml-3 font-medium">N/A</span>
                    </div>
                </li>
                <li class="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
                    <div>
                        <div class="mt-1 text-600">Payable days</div>
                    </div>
                    <div class="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
                        <span class="text-500 ml-3 font-medium">N/A</span>
                    </div>
                </li> -->
                <hr>

            </ul>
                <Button @click="isTable=true; isAdd=false; isSummary=false" label="Cancel" severity="secondary" class="mt-5 ml-2"></Button>
                <Button v-if="isEdit" @click="updateDetails()" label="Save" class="ml-2 mt-3"></Button>
                <Button v-else @click="saveDetails()" label="Save" class="ml-2 mt-3"></Button>
        </div>
    </div>
    
    </template>
    <script>
    import { FilterMatchMode, FilterOperator } from 'primevue/api';
    import { debounce } from 'lodash';
    
    export default {
      data() {
        return {
            leaveID:'',
            isEdit:null,
            isTable:true,
            isSummary:false,
            isAdd:false,
            validationErrors:[],
            details: {
              employee_id:'',
              last_sick_day:'',
              start_date:'',
              end_date:'',
              average_weekly_earnings:'',
              days_unavailable:'',
              qualifying_days:''
            },
          displayConfirmation:false,
          searchTerm:'',
          filters1: null,
          loading1: null,
          employees:'',
          sick_leaves:'',
        };
      },
      mounted(){
        this.getSickLeaves();
      },
      computed:{
        startDate(){
          return this.$moment(this.details.start_date).format('YYYY-MM-DD');
        },
        endDate(){
          return this.details.end_date ? this.$moment(this.details.end_date).format('YYYY-MM-DD') : null ;
        },
        unavailable_days(){
            if (this.details.start_date && this.details.end_date) {
                const startDate = new Date(this.details.start_date);
                const endDate = new Date(this.details.end_date);
                const timeDifference = endDate - startDate;
                const dayDifference = timeDifference / (1000 * 60 * 60 * 24) + 1;
                return Math.max(0, dayDifference);
            }
            return 0;
        },
        working_days(){
          if (this.details.start_date && this.details.end_date) {
            const startDate = new Date(this.details.start_date);
            const endDate = new Date(this.details.end_date);
            let workingDays = 0;
            while (startDate <= endDate) {
              const day = startDate.getDay();
              if (day !== 0 && day !== 6) {
                  workingDays++;
              }
              startDate.setDate(startDate.getDate() + 1);
            }
            return workingDays;
          }

        },
      },
      methods: {

        continueStep(){
          this.details.days_unavailable = this.unavailable_days
          this.details.qualifying_days = this.working_days
          this.details.employee_id = this.$route.params.id
          
          const optionalFields = ['end_date','qualifying_days'];
          this.validationErrors = this.$validateFormData(this.details, optionalFields);
          console.log('validationerror',this.validationErrors)
          if (Object.keys(this.validationErrors).length === 0 ) {
            this.details.start_date = this.$moment(this.details.start_date).format('YYYY-MM-DD');
            this.details.end_date = this.details.end_date ? this.$moment(this.details.end_date).format('YYYY-MM-DD') :null
            this.isAdd=false
            this.isSummary=true
          } else {
          }

        },

        validateEndDate(value) {
            if (this.details.start_date && value < this.details.start_date) {
                this.details.end_date = null; // Reset end_date
                this.validationErrors.end_date = 'End date cannot be earlier than Start date.';
            } else {
                this.validationErrors.end_date = ''; // Clear error if valid
            }
        },
    
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
        
        openConfirmation(id){
          this.leaveID=id
          this.displayConfirmation=true
        },
        
        closeConfirmation(){
          this.leaveID=''
          this.displayConfirmation=false 
        },

        //-----------SAVE DETAILS----------
        async saveDetails(){
          const apiUrl = `/storeSickLeave`;
          let data=this.details
          try {
          let response=await this.$axios.post(apiUrl,data);
          this.employees=response.data
          this.$showToast('success','Sick Leave Saved Successfully.');
          this.isAdd=false
          this.isSummary=false
          this.isTable=true
          this.getSickLeaves();
          } catch (error) {
          let errors=error.response.data.errors
          console.log('errors',errors)
          }
        },

        //-----------UPDATE DETAILS----------
        async updateDetails(){
          const apiUrl = `/updateSickLeave/`+this.isEdit;
          let data=this.details
          try {
          let response=await this.$axios.post(apiUrl,data);
          this.employees=response.data
          this.$showToast('success','Sick Leave Updated Successfully.');
          this.isAdd=false
          this.isEdit=null
          this.isSummary=false
          this.isTable=true
          this.getSickLeaves();
          } catch (error) {
          let errors=error.response.data.errors
          console.log('errors',errors)
          }
        },

        //-----------GET DETAILS----------
        async getSickLeaves(){
          let employee_id = this.$route.params.id
          const apiUrl = `/getSickLeaves/`+employee_id;
          try {
          let response=await this.$axios.get(apiUrl);
          this.sick_leaves=response.data
          } catch (error) {
          let errors=error.response.data.errors
          console.log('errors',errors)
          }
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
          this.isTable=false
          this.isAdd=true
          this.editSickLeave(id)
        },
        
        //-----------CLEAR SEARCH FILTER----------
        clearFilter1(){
          this.searchTerm=''
        },

        //-----------EDIT SICK Leave----------
        async editSickLeave(id){
          const apiUrl = `/editSickLeave/`+id;
          try {
          let response=await this.$axios.get(apiUrl);
          response=response.data
          this.details.employee_id=response.employee_id
          this.details.start_date=response.start_date
          this.details.end_date=response.end_date
          this.details.average_weekly_earnings=response.average_weekly_earnings
          if(response.end_date){
            this.details.last_sick_day='Yes'
          }else{
            this.details.last_sick_day='No'
          }
          this.isEdit=response.id
          } catch (error) {
          let errors=error.response.data.errors
          console.log('errors',errors)
          }
        },
    
        //-----------DELETE SICK Leave----------
        async deleteSickLeave(){
          const apiUrl = `/deleteSickLeave/`+this.leaveID;
          try {
          await this.$axios.get(apiUrl);
          this.displayConfirmation=false 
          this.getSickLeaves()
          } catch (error) {
          let errors=error.response.data.errors
          console.log('errors',errors)
          }
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