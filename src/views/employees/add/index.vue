<template>


    <!-- Dynamic Component rendering based on current step -->
    <div class="col-12 md:col-12">
      <div class="card card-w-title">
        <h1>Adding a new employee</h1>
        <p class="mb-3">Follow the three steps below to add a new employee to your company payroll.<br/>
          Please make sure all information is accurate.</p>

        <CustomStepProgress :steps="mySteps.map(step => step.label)" :currentStep="currentStep">
          <!-- Slot with clickable element -->
          <template v-slot:label-0>
            <strong @click="setActiveStep(0)">Personal Details</strong>
          </template>
          <template v-slot:label-1>
            <strong @click="setActiveStep(1)">Employment Details</strong>
          </template>
          <template v-slot:label-2>
            <strong  @click="setActiveStep(2)">Starter Details</strong>
          </template>
        </CustomStepProgress>
        <component :is="currentComponent" />

      </div>
    </div>

</template>

<script>
import CustomStepProgress from '../custom_step_bar/index.vue'
import PersonalDetails from '../personal/index.vue';
import EmploymentDetails from '../EmploymentDetails/index.vue';
import CompletionDetails from '../personal/index.vue';

export default {
  components: {
    CustomStepProgress,
    PersonalDetails,
    EmploymentDetails,
    CompletionDetails
  },
  data() {
    return {
      mySteps: [
        { label: 'Personal Details', component: 'PersonalDetails' },
        { label: 'Employment Details', component: 'EmploymentDetails' },
        { label: 'Complete', component: 'CompletionDetails' },
      ],
      currentStep: 0  // Starting with the first step
    }
  },
  computed: {
    currentComponent() {
      return this.mySteps[this.currentStep].component;
    }
  },
  methods: {
    setActiveStep(index) {
      console.log("Step clicked:", index);
      this.currentStep = index;
    }
  }
}
</script>
