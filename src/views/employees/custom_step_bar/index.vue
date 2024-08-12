<template>
  <div class="step-progress-container">
    <div class="steps-bar" :style="{ height: barHeight, top: '20px' }">
      <div class="progress-bar" :style="progressBarStyle"></div>
    </div>
    <div v-for="(step, index) in steps" :key="index" class="step" :class="{ active: index === currentStep }">
      <div class="step-number">{{ index + 1 }}</div>
      <div class="step-label">
        <slot :name="'label-' + index">{{ step }}</slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CustomStepProgress',
  props: {
    steps: Array,
    currentStep: Number,
    barHeight: {
      type: String,
      default: '2px'
    }
  },
  computed: {
    progressBarStyle() {
      const percentage = (this.currentStep / (this.steps.length - 1)) * 100;
      return { width: `${percentage}%` };
    }
  }
}
</script>

<style scoped>
.step-progress-container {
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
}

.steps-bar {
  position: absolute;
  width: 100%;
  background-color: #e0e0e0;
  z-index: 0;
}

.progress-bar {
  background-color: green;
  height: 100%;
  position: absolute;
  z-index: 1;
}

.step {
  flex-grow: 1;
  z-index: 2;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.step-number {
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border: 2px solid gray;
  border-radius: 50%;
  font-size: 12px;
  position: relative;
}

.step.active .step-number {
  background-color: green;
  color: white;
  border-color: green;
}

.step-label {
  margin-top: 8px;
  font-size: 12px;
  color: #666;
}
</style>
