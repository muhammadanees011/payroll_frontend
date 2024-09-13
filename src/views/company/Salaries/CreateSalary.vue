<template>
  <div class="col-12 md:col-12">
      <div class="card card-w-title">
          <div class="grid">
              <div class="col-12 md:col-12 ">
  
                  <div v-if="isSuccess" class="text-center mb-5 pt-2 pb-2" style="background-color: #80D1B4; border-radius: 5px !important;">
                      <span class="text-white font-medium">Saved Successfully</span>
                  </div>
  
                  <div v-if="isErrors" class="mb-5 py-4 pl-3" style="background-color: #E88D58; border-radius: 5px !important;">
                      <span v-for="error in errors" class="text-white font-medium">
                          {{ error }}
                          <br>
                      </span>
                  </div>
  
                  <div class="formgrid grid">
                    <div class="field col-4">
                        <label for="name2">Salary Type*</label>
                        <Dropdown v-model="salary.type" :options="dropdownValues" optionLabel="name" placeholder="Select" style="width:100%;height:45px" />
                        <span v-if="validationErrors.type" class="font-medium validation-text p-2">
                            {{validationErrors.type}}
                        </span>
                    </div>
                    <div class="field col-4">
                        <label for="companyName">Salary item code <sapn class="text-sm">(will be shown on your payroll journal)</sapn></label>
                        <InputText v-model="salary.code" id="companyName" optionLabel="companyName" type="text" style="width:100%;height:45px" />
                        <span v-if="validationErrors.code" class="font-medium validation-text p-2">
                            {{validationErrors.code}}
                        </span>
                    </div>
                </div>
              </div>
          </div>
          <div class="grid">
              <div class="col-12 md:col-12">
              <div class="formgrid grid">
                <div class="field col-4">
                    <label for="companyName">Description</label>
                    <InputText v-model="salary.description" id="companyName" optionLabel="companyName" type="text" style="width:100%;height:45px" />
                    <span v-if="validationErrors.description" class="font-medium validation-text p-2">
                        {{validationErrors.description}}
                    </span>
                </div>
              </div>
              </div>
          </div>

        <template v-if="salary.type.name=='Salary'">

          <div class="grid">
              <div class="col-12 md:col-12">
              <div class="formgrid grid">
                <div class="field col-4">
                    <label for="name2">Salary Period*</label>
                    <Dropdown v-model="salary.salary_period" :options="salaryPeriodValues" optionLabel="name" placeholder="Select" style="width:100%;height:45px" />
                    <span v-if="validationErrors.salary_period" class="font-medium validation-text p-2">
                        {{validationErrors.salary_period}}
                    </span>
                </div>
                <div class="field col-4">
                    <label for="companyName">Salary Rate*</label>
                    <InputText v-model="salary.salary_rate" id="companyName" optionLabel="companyName" type="text" style="width:100%;height:45px" />
                    <span v-if="validationErrors.salary_rate" class="font-medium validation-text p-2">
                        {{validationErrors.salary_rate}}
                    </span>
                </div>
              </div>
              </div>
          </div>

        </template>

        <template v-if="salary.type.name=='Overtime'">

            <div class="grid">
                <div class="col-12 md:col-12">
                <div class="formgrid grid">
                <div class="field col-4">
                    <label for="companyName">Multiply by (Eg: 1.5)*</label>
                    <InputText v-model="salary.multiply_by" id="companyName" optionLabel="companyName" type="text" style="width:100%;height:45px" />
                    <span v-if="validationErrors.multiply_by" class="font-medium validation-text p-2">
                        {{validationErrors.multiply_by}}
                    </span>
                </div>
                </div>
                </div>
            </div>

        </template>

  
          <div class="grid">
              <div class="col-12">
                  <div class="field-checkbox mb-0">
                      <Checkbox id="checkOption2" name="option" value="pensionable" v-model="salary.pensionable" />
                      <label for="checkOption2" >Pensionable </label>
                  </div>
                  <sapn class="text-sm ml-4">(We will include this amount in the total sum used to calculate pension contributions.)</sapn>
              </div>
          </div>
          <br>
          <Button @click="validateData()" label="Save & Close" class="ml-2 mb-2"></Button>
          <Button @click="goBack()" label="Cancel" class="ml-2 mb-2"></Button>
      </div>
  </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        validationErrors:'',
        errors:null,
        isSuccess:false,
        isErrors:false,
  
        salary:{
          type:'',
          multiply_by:'',
          code:'',
          pensionable:'',
          salary_period:'',
          salary_rate:'',
          description:''
        },
  
        dropdownValues: [
          { name: 'Overtime', code: 'Overtime' },
          { name: 'Salary', code: 'Salary' },
        ],

        salaryPeriodValues: [
          { name: 'Hour', code: 'Hour' },
          { name: 'Unit', code: 'Unit' },
        ],

      };
    },
    methods: {
      validateData(){
        let optionalFields = [];
        if(this.salary.type.name=='Salary'){
            optionalFields = ['multiply_by','pensionable'];
        }else if(this.salary.type.name=='Overtime'){
            optionalFields = ['salary_rate','salary_period','pensionable'];
        }
        this.validationErrors = this.$validateFormData(this.salary, optionalFields);
        if (Object.keys(this.validationErrors).length === 0 ) {
        this.saveSalary()
        } else {
        console.log('Validation errors:', this.validationErrors);
        }
      },
  
      goBack(){
        this.$router.push({ name: 'company-salaries' });
      },
  
      async saveSalary(){
          let data = this.salary
          const apiUrl = `/save-salary-type`;
          try {
          await this.$axios.post(apiUrl,data);
          this.isErrors=false
          this.isSuccess=true
          this.$showToast('success','Salary type created.');
          this.goBack()
          } catch (error) {
          this.errors=error.response.data.errors
          this.isSuccess=false
          this.isErrors=true
          }
      },
  
    }
  }
  </script>
  
  
  <style scoped lang="scss">
  
  </style>