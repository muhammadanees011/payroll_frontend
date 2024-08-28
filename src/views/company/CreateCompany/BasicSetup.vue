<template>
<!-- company details form -->
<div class="ml-3">
    <div class="grid">
        <div class="col-12 md:col-12 mt-3">
            <h4>First thing first: Tell us about your team</h4>
            <h5>Who is your company planning to pay?</h5>
            <p>Select all that apply</p>
            <div class="grid">
                <div class="col-12">
                    <div class="field-checkbox mb-0">
                        <Checkbox id="checkOption1" name="option" value="Chicago" v-model="checkboxValue" />
                        <label for="checkOption1">Myself</label>
                    </div>
                </div>
                <div class="col-12">
                    <div class="field-checkbox mb-0">
                        <Checkbox id="checkOption2" name="option" value="Los Angeles" v-model="checkboxValue" />
                        <label for="checkOption2">Employees</label>
                    </div>
                </div>
                <div class="col-12">
                    <div class="field-checkbox mb-0">
                        <Checkbox id="checkOption2" name="option" value="Los Angeles" v-model="checkboxValue" />
                        <label for="checkOption2">We are not planning to pay anyone for atleast 3 months</label>
                    </div>
                </div>
            </div>

            <div class="grid">
                <div class="col-12 md:col-12 mt-5">
                    <h5>What's your desired first payday with XEPayroll?</h5>
                    <p>Not sure? No problem, just give us an estimate. You'll be able to change this date latter.</p>
                    <Calendar :showIcon="true" :showButtonBar="true" v-model="calendarValue"></Calendar>
                </div>
            </div>

            <h5>Will this be your company's first payday since since 6 April 2024?</h5>
            <div class="grid">
                <div class="col-2 md:col-2">
                    <div class="field-radiobutton mb-0">
                        <RadioButton id="option1" name="option" value="yes" v-model="isFirstPayday" />
                        <label for="option1">Yes</label>
                    </div>
                </div>
                <div class="col-2 md:col-2">
                    <div class="field-radiobutton mb-0">
                        <RadioButton id="option2" name="option" value="no" v-model="isFirstPayday" />
                        <label for="option2">No</label>
                    </div>
                </div>
            </div>

            <span v-if="isFirstPayday=='yes'">
            <h5>Will this be the first payroll ever for this company?</h5>
            <div class="grid">
                <div class="col-2 md:col-2">
                    <div class="field-radiobutton mb-0">
                        <RadioButton id="option1" name="option" value="Chicago" v-model="isFirstPayroll" />
                        <label for="option1">Yes</label>
                    </div>
                </div>
                <div class="col-2 md:col-2">
                    <div class="field-radiobutton mb-0">
                        <RadioButton id="option2" name="option" value="Los Angeles" v-model="isFirstPayroll" />
                        <label for="option2">No</label>
                    </div>
                </div>
            </div>

            <div class="grid">
                <div class="col-12 md:col-3">
                    <label for="name2">Who is your current payroll provider?</label>
                    <Dropdown v-model="dropdownValue" :options="dropdownValues" optionLabel="name" placeholder="Select" style="width:100%;height:45px" />
                </div>
            </div>
            </span>

        </div>
    </div>
</div>
</template>


<script>
export default {
  components: {

  },
  data() {
    return {
        calendarValue: null,
        isFirstPayday: null,
        isFirstPayroll: null,

    }
  },
  computed: {
    
  },
  methods: {
  }
}
</script>

<style scoped lang="scss">

</style>