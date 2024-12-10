<template>
  <div class="grid">
    <div class="col-12 md:col-12 mt-5">
      <div class="formgrid grid">

        <div class="field col-4">
          <label for="Forename">Payroll ID*</label>
          <InputText v-model="details.payroll_id" id="Forename" type="text"  style="width:100%" />
          <span v-if="validationErrors.payroll_id" class="font-medium validation-text p-2">
            {{validationErrors.payroll_id}}
          </span>
        </div>
        <div class="field col-4">
          <label for="Surname">Employment Start Date*</label>
          <InputText v-model="details.employement_start_date" id="Surname" type="date"  style="width:100%"/>
          <span v-if="validationErrors.employement_start_date" class="font-medium validation-text p-2">
            {{validationErrors.employement_start_date}}
          </span>
        </div>
      </div>
      <div class="formgrid grid mt-3">

        <div class="field col-4">
          <label for="Forename">Payment Schedule*</label>
          <Dropdown v-model="details.pay_schedule_id" :options="paySchedules" optionLabel="name" placeholder="Select" style="width:100%;height:45px;"  />
          <span v-if="validationErrors.pay_schedule_id" class="font-medium validation-text p-2">
            {{validationErrors.pay_schedule_id}}
          </span>
        </div>
      </div>
      <div class="formgrid grid mt-3">

        <div class="field col-4">
          <label for="Forename">Salary Type*</label>
          <Dropdown v-model="details.salary_type" :options="salaryTypes" optionLabel="name" placeholder="Select" style="width:100%;height:45px;"  />
          <span v-if="validationErrors.salary_type" class="font-medium validation-text p-2">
            {{validationErrors.salary_type}}
          </span>
        </div>
      </div>
      <div v-if="details.salary_type && details.salary_type.code === 'Hourly'" class="formgrid grid mt-3">

        <div class="field col-4">
          <label >Expected work hours per week*</label>
          <InputText  class="mt-1"  v-model="details.expected_work_hours_per_week" type="number" style="width:100%" />
          <span v-if="validationErrors.expected_work_hours_per_week" class="font-medium validation-text p-2">
              {{validationErrors.expected_work_hours_per_week}}
            </span>
        </div>
        <div class="field col-4">
          <label >Hourly equivalent</label>
          <InputText class="mt-1" v-model="details.hourly_equivalent" type="number" style="width:100%" />
          <span v-if="validationErrors.hourly_equivalent" class="font-medium validation-text p-2">
              {{validationErrors.hourly_equivalent}}
            </span>
        </div>
      </div>
      <div v-else-if="details.salary_type && details.salary_type.code === 'Salaried'" class="formgrid grid mt-3">

        <div class="field col-4">
          <label >Annual Salary*</label>
          <InputText class="mt-1"  v-model="details.anual_salary" type="number" style="width:100%" />
          <span v-if="validationErrors.anual_salary" class="font-medium validation-text p-2">
              {{validationErrors.anual_salary}}
            </span>
        </div>
        <div class="field col-4">
          <label >Monthly Salary*</label>
          <InputText class="mt-1"  v-model="details.monthly_salary" type="number" style="width:100%" />
          <span v-if="validationErrors.monthly_salary" class="font-medium validation-text p-2">
              {{validationErrors.monthly_salary}}
            </span>
        </div>
        <div class="field col-4">
          <label >Weekly Salary*</label>
          <InputText class="mt-1"  v-model="details.weekly_salary" type="number" style="width:100%" />
          <span v-if="validationErrors.weekly_salary" class="font-medium validation-text p-2">
              {{validationErrors.weekly_salary}}
            </span>
        </div>
        <div class="field col-4">
          <label >Expected work hours per week*</label>
          <InputText class="mt-1" v-model="details.expected_work_hours_per_week" type="number" style="width:100%" />
          <span v-if="validationErrors.expected_work_hours_per_week" class="font-medium validation-text p-2">
              {{validationErrors.expected_work_hours_per_week}}
            </span>
        </div>
        <div class="field col-4">
          <label >Hourly equivalent</label>
          <InputText class="mt-1" v-model="details.hourly_equivalent" type="number" style="width:100%" />
          <span v-if="validationErrors.hourly_equivalent" class="font-medium validation-text p-2">
              {{validationErrors.hourly_equivalent}}
            </span>
        </div>
      </div>


      <div class="formgrid grid mt-3">
        <div class="field col-12" >
          <Strong for="Forename">During the current tax year, is/was this employee a director ?</Strong>
          <span v-if="validationErrors.is_director_current_tax_year" class="font-medium validation-text p-2">
              {{validationErrors.is_director_current_tax_year}}
            </span>

        </div>
        <div class="col-12 md:col-2">
          <div class="field-radiobutton mb-0">
            <RadioButton id="option1" name="option" value="No" v-model="details.is_director_current_tax_year" />
            <label for="option1">No</label>
          </div>
        </div>
        <div class="col-12 md:col-2">
          <div class="field-radiobutton mb-0">
            <RadioButton id="option2" name="option" value="Yes" v-model="details.is_director_current_tax_year"/>
            <label for="option2">Yes</label>
          </div>
        </div>
      </div>
      <div v-if="details.is_director_current_tax_year === 'Yes'" class="formgrid grid mt-5">

        <div class="field col-4">
          <label >Date appointed director*</label>
          <InputText class="mt-1"  v-model="details.date_appointed_director" type="date" style="width:100%" />
          <span v-if="validationErrors.date_appointed_director" class="font-medium validation-text p-2">
              {{validationErrors.date_appointed_director}}
            </span>
        </div>
        <div class="field col-4">
          <label >Calculation method</label>
          <Dropdown v-model="details.calculation_method" :options="calculationMethods" optionLabel="name" placeholder="Select" style="width:100%;height:45px;"  />
          <span v-if="validationErrors.calculation_method" class="font-medium validation-text p-2">
              {{validationErrors.calculation_method}}
            </span>
        </div>
        <div class="field col-4">
          <label >Date directorship ended (Leave blank if still active)</label>
          <InputText class="mt-1"  v-model="details.date_ended_directorship" type="date" style="width:100%" />
          <span v-if="validationErrors.date_ended_directorship" class="font-medium validation-text p-2">
              {{validationErrors.date_ended_directorship}}
            </span>
        </div>
      </div>
      <br>
      <Button @click="saveDetails()" label="Continue" class="ml-2 mt-3"></Button>
    </div>
  </div>

</template>
<script>

export default {

  data() {
    return {
      salaryTypes: [
        { name: 'Hourly', code: 'Hourly' },
        { name: 'Salaried', code: 'Salaried' }
      ],
      calculationMethods: [
        { name: 'Standard Annual Method', code: 'Standard Annual Method' },
        { name: 'Alternative Method', code: 'Alternative Method' }
      ],
      paySchedules:'',
      validationErrors:[],
      details:{
        payroll_id:'',
        pay_schedule_id:'',
        employement_start_date:'',
        salary_type:'',
        anual_salary:'',
        monthly_salary:'',
        weekly_salary:'',
        expected_work_hours_per_week:'',
        hourly_equivalent:'',
        is_director_current_tax_year:'',
        date_appointed_director:'',
        date_ended_directorship:'',
        calculation_method:'',
      },

    }
  },

  mounted(){
    this.getPaymentSchedules()
  },

  methods: {

    saveDetails(){
      let optionalFields=[]
      
      const salaryTypeCode = this.details.salary_type.code;
      if (salaryTypeCode === 'Hourly') {
        optionalFields = ['anual_salary', 'monthly_salary', 'weekly_salary', 'hourly_equivalent'];
      } else if (salaryTypeCode === 'Monthly') {
        optionalFields = ['hourly_equivalent'];
      }

      // Director Tax Year conditions
      const isDirectorCurrentTaxYear = this.details.is_director_current_tax_year;
      const directorFields = isDirectorCurrentTaxYear === 'No' 
        ? ['date_appointed_director', 'date_ended_directorship', 'calculation_method']
        : ['date_appointed_director'];

      optionalFields.push(...directorFields);

      this.validationErrors = this.$validateFormData(this.details, optionalFields);
      if (Object.keys(this.validationErrors).length === 0 ) {
        
        this.details.employement_start_date=this.details.employement_start_date ? this.$moment(this.details.employement_start_date).format('YYYY-MM-DD'):null;
        this.details.date_appointed_director=this.details.date_appointed_director ? this.$moment(this.details.date_appointed_director).format('YYYY-MM-DD'):null;
        this.details.date_ended_directorship=this.details.date_ended_directorship ? this.$moment(this.details.date_ended_directorship).format('YYYY-MM-DD'):null;

          this.$emit('saveDetails', this.details);
      } else {
      }
    },

    //-----------GET PAYMENT SCHEDULES-----------
    async getPaymentSchedules(){
      const apiUrl = `/get-pay-schedule-dropdown`;
      try {
      let response=await this.$axios.get(apiUrl);
      this.paySchedules=response.data
      } catch (error) {
      let errors=error.response.data.errors
      console.log('errors',errors)
      }
    },

  },
}
</script>

<style scoped lang="scss">

</style>