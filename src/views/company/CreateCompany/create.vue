
<template>
  <h2 class="ml-3">Create Company</h2>
  <div class="col-12 md:col-12">
    <div class="card card-w-title">
      <h4>Steps</h4>
      <p>Follow the five steps below to add a new Company. {{ selectedStep }}<br/>
        Please make sure all information is accurate.</p>
        <step-progress :steps="nestedRouteItems" :current-step="currentStep"
         active-color="green"
         active-thickness=5
         line-thickness=5
         icon-class="fa fa-check"></step-progress>
    </div>
  </div>
<div class="col-12 md:col-12">
    <div class="card card-w-title">
        <create-company-details v-if="currentStep==0" @saveDetails="saveDetails"/>
        <basic-setup v-if="currentStep==1" @saveDetails="saveDetails"/>
        <hmrc-settings v-if="currentStep==2" @saveDetails="saveDetails"/>
        <pay-schedule v-if="currentStep==3" @saveDetails="saveDetails"/>
        <br>
        <!-- <Button @click="nextStep()" label="Continue" class="ml-2 mb-2"></Button> -->
    </div>
</div>
</template>

<script>
import StepProgress from 'vue-step-progress';
import CreateCompanyDetails from "./CreateCompanyDetails.vue";
import BasicSetup from "./BasicSetup.vue";
import HMRCSettings from "./HMRCSettings.vue";
import PaySchedule from "./PaySchedule.vue";

export default {
  components: {
    StepProgress,
    'basic-setup':BasicSetup,
    'hmrc-settings':HMRCSettings,
    'pay-schedule':PaySchedule,
    'create-company-details':CreateCompanyDetails,
  },
  data() {
    return {
        checkboxValue : [],
        dropdownValue : null,
        currentStep :0,
        dropdownValues : [
        { name: 'LTD-Private limited company', code: 'NY' },
        { name: 'LLP-Limited liability partnership', code: 'RM' },
        { name: 'LIMITED-PARTNERSHIP-Limited partnership', code: 'LDN' },
        { name: 'NORTHEREN-IRELAND-Northeren ireland company', code: 'IST' },
        { name: 'NORTHEREN-IRELAND-OTHER-Credit union (Northeren ireland)', code: 'PRS' },
        { name: 'OLD-PUBLIC-COMPANY-Old public company', code: 'RM' },
        { name: 'OTHER-Other company type', code: 'RM' },
        { name: 'OVERSEA-COMPANY-Overseas company', code: 'RM' },
        { name: 'PLC-Public limited company', code: 'RM' },
        ],
        nestedRouteItems : [
            'Create Company Details', 'Basic Setup', 'HMRC Setting','Pay Schedule'
        ],

    }
  },
  mounted(){
    this.getStep();
  },
  computed: {
    
  },
  methods: {
    nextStep(){
        this.currentStep = this.currentStep+1;  
    },
    //-----------SAVE COMPANY DETAILS----------
    async saveDetails(data){
        const apiUrl = `/create-company`;
        try {
        let response=await this.$axios.post(apiUrl,data);
        console.log(response)
        this.currentStep= this.currentStep + 1;
        } catch (error) {
        let errors=error.response.data.errors
        console.log('errors',errors)
        }
    },
    //-----------GET STEP------------
    async getStep(){
        const step = localStorage.getItem('step');
        if (step && step==4) {
            this.$router.go(-1); 
        }
        const apiUrl = `/get-step`;
        try {
        let response=await this.$axios.get(apiUrl);
        this.currentStep= response.data.step;
        localStorage.setItem('step', this.currentStep)
        } catch (error) {
        let errors=error.response.data.errors
        console.log('errors',errors)
        }
    },
  }
}
</script>


<style scoped>
::v-deep input{
    width:100%;
    height:45px !important;
}

::v-deep .step-progress__wrapper-before,
::v-deep .step-progress__wrapper-after{
  height: 1px !important;
}
::v-deep .step-progress__step-label{
  font-size: 12px;
}
::v-deep .step-progress__step span{
  font-size: 15px;
}


::v-deep .step-progress__wrapper {
    margin: 0 auto;
    position: relative;
    width: 90%
}

::v-deep .step-progress__wrapper-before {
    background-color: #27A07A;
    transform: translateY(-50%) perspective(1000px)
}

::v-deep .step-progress__wrapper-after,
::v-deep .step-progress__wrapper-before {
    content: "";
    height: 12px;
    left: 0;
    position: absolute;
    top: 50%;
    width: 100%
}

::v-deep .step-progress__wrapper-after {
    background-color: #27A07A;
    transform: scaleX(0) translateY(-50%) perspective(1000px);
    transform-origin: left center;
    transition: transform .5s ease
}

::v-deep .step-progress__bar {
    align-items: center;
    display: flex;
    height: 100px;
    justify-content: space-between;
    margin-bottom: 40px;
    width: 100%
}

::v-deep .step-progress__step {
    --activeColor: #27A07A !important;
    --passiveColor: #27A07A;
    --activeBorder: 1px;
    --passiveBorder: 1px;
    position: relative;
    z-index: 2
}

::v-deep .step-progress__step span {
    color: var(--passiveColor);
    display: block;
    font-size: 13px !important;
    font-weight: 600;
    opacity: 1;
    text-align: center;
    transform: translateZ(0) scale(1) perspective(1000px);
    transition: .3s ease
}

@media(max-width:767px) {
    .step-progress__step span {
        font-size: 13px
    }
}

::v-deep .step-progress__step--active .step-progress__step-label,
::v-deep .step-progress__step--active span {
    color: var(--activeColor)
}

::v-deep .step-progress__step--active .step-progress__step-icon {
    opacity: 1
}

::v-deep .step-progress__step--valid .step-progress__step-icon {
    opacity: 1;
    transform: translate3d(-50%, -50%, 0) scale(1) perspective(1000px)
}

::v-deep .step-progress__step--valid span {
    color: var(--activeColor);
    opacity: 0;
    transform: translateZ(0) scale(2) perspective(1000px)
}

::v-deep .step-progress__step--valid .step-progress__step-label {
    color: var(--activeColor)
}

::v-deep .step-progress__step:after {
    background-color: #fff;
    border: 3px solid #27A07A;
    border-radius: 50%;
    content: "";
    height: 25px;
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%) perspective(1000px);
    transition: .3s ease;
    width: 25px;
    z-index: -1
}

@media(max-width:767px) {
    .step-progress__step:after {
        height: 25px;
        width: 25px
    }
}

::v-deep .step-progress__step--active:after,
.step-progress__step--valid:after {
    border: 5px solid #27A07A;
}

::v-deep .step-progress__step--valid:after {
    background-color: var(--activeColor);
}

::v-deep .step-progress__step-label {
    color: #27A07A;
    font-size: 12px;
    font-weight: 600;
    left: 50%;
    position: absolute;
    top: calc(100% + 25px);
    transform: translateX(-50%) perspective(1000px);
    transition: .3s ease;
    white-space: nowrap
}

::v-deep .step-progress__step-icon {
    color: #fff;
    font-size: 12px;
    left: 50%;
    opacity: 0;
    position: absolute;
    top: 50%;
    transform: translate3d(-50%, -50%, 0) scale(0) perspective(1000px);
    transition: transform .3s ease
}

@media(max-width:767px) {
    .step-progress__step-icon {
        font-size: 12px
    }
}

/*# sourceMappingURL=main.css.map*/
</style>