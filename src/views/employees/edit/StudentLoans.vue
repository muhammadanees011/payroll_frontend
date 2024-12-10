<template>
    <!-- company details form -->
  <div class="col-12 md:col-12">
      <div class="card card-w-title">
          <div class="grid">
              <div class="col-12 md:col-8 ">
                  <div class="flex flex-column align-items-center justify-content-center">
                      <div class="w-full surface-card py-6 flex flex-column align-items-center" style="border-radius: 53px">
                          
                        <template v-for="plan in plans">
                            <div class="mt-4 w-full flex justify-content-between py-3 border-300 border-bottom-1 border-top-1 border-left-1 border-right-1">
                                <span class="ml-4 mt-3 flex flex-column">
                                    <h3 class="text-900 lg:text-xl font-medium mb-0 block">{{ plan.payment_plan }}</h3>
                                    <small class="mb-4">{{ plan.plan_description }}</small>
                                    <span class="text-500 lg:text-sm">Annual threshold: £ {{ plan.annual_threshold }}.00</span>
                                    <span class="text-500 lg:text-sm">Repay percentage: {{plan.repay_percentage}}%</span>
                                </span>
                                <div class="mt-4 flex" style="height: 3.5rem; width: 6.5rem;  position: relative;">
                                    <InputSwitch @change="saveData()" v-model="studentPlans[plan.id]" />
                                </div>
                            </div>
                        </template>

                          <br>
                      </div>
                  </div>
                  
                    <div class="col-12 md:col-11 flex justify-content-between">
                        <span>
                            <!-- <Button label="Cancel" class=""></Button> -->
                            <Button @click="saveStudentPlan()" label="Save" class=""></Button>
                        </span>
                    </div>
              </div>
              <!-- <div class="col-12 md:col-4 ">
                  <div class="flex flex-column align-items-center justify-content-center">
                      <div class="w-full surface-card py-8 flex flex-column align-items-center" style="border-radius: 53px">
                          <div class="w-full flex align-items-center py-5 border-300 border-bottom-1">
                              
                              <span class="ml-4 flex flex-column">
                                  <span class="lg:text-xl font-medium mb-0 block" style="color:#1F9A72;">Student loans</span>
                                  <span class="lg:text-sm">Set up Student or Postgraduate Loan Repayment plan</span>
                                  </span>
                          </div>
                      </div>
                  </div>
              </div> -->
          </div>
      </div>
  </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
          plans:'',
          studentPlans:{},
          plansData:'',
      };
    },
    mounted(){
      this.getRepaymentPlans();
      this.getStudentPaymentPlan();
    },
    methods: {
  
      addPayItems(){
        this.$router.push({ name: 'company-create-salaries' });
      },
      
      async getRepaymentPlans(){
          const apiUrl = `/getLoanPaymentPlan`;
          try {
          let response=await this.$axios.get(apiUrl);
          this.plans=response.data
          } catch (error) {
          let errors=error.response.data.errors
          }
      },

      async getStudentPaymentPlan(){
        let employee_id=this.$route.params.id
          const apiUrl = `/getStudentPaymentPlan/`+employee_id;
          try {
          let response=await this.$axios.get(apiUrl);
          response=response.data
          this.setupData(response)
          } catch (error) {
          let errors=error.response.data.errors
          }
      },

      saveData(){
        this.plansData = Object.keys(this.studentPlans).map(key => ({
            plan_id: parseInt(key), 
            status: this.studentPlans[key]
        }));

        console.log(this.studentPlans);
      },

      async saveStudentPlan(){
        let employee_id=this.$route.params.id

        let data={
            'studentPlans':this.plansData
        }
        const apiUrl = `/saveStudentPaymentPlan/`+employee_id;
          try {
          let response=await this.$axios.post(apiUrl,data);
          this.getStudentPaymentPlan()
          this.$showToast('success','Payment Plan updated successfully.');
          } catch (error) {
          let errors=error.response.data.errors
          }
      },

      setupData(data){
        this.studentPlans = {};
        data.forEach(item => {
            const planId = item.loan_payment_plan_id;
            this.studentPlans[planId] = true;
        });
      },
  
    }
  }
  </script>
  
  <style scoped>
  
  /* Style the dropdown container */
  .dropdown {
      display: inline-block;
      margin-top: -10px;
      position: absolute;
      right: 10px
  }
  
  /* Style the button with three vertical dots */
  .dropdown-btn {
      background-color: transparent;
      border: none;
      font-size: 24px;  /* Adjust the size for the dots */
      cursor: pointer;
      padding: 5px;
  }
  
  /* Hide the dropdown content by default */
  .dropdown-content {
      display: none;
      position: absolute;
      right: 0;
      background-color: #f1f1f1;
      min-width: 100px;
      box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
      z-index: 1;
  }
  
  /* Style links inside the dropdown */
  .dropdown-content a {
      color: black;
      padding: 10px 16px;
      text-decoration: none;
      display: block;
  }
  
  /* Change color on hover */
  .dropdown-content a:hover {
      background-color: #ddd;
  }
  
  /* Show the dropdown content when the button is clicked */
  .dropdown:hover .dropdown-content {
      display: block;
  }
  
  
  </style>