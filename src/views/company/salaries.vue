<script>
export default {
  data() {
    return {
    };
  },
  methods: {
    addPayItems(){
      this.$router.push({ name: 'company-create-payitems' });

    }
  }
}
</script>

<template>
  <!-- company details form -->
<div class="col-12 md:col-12">
    <div class="card card-w-title">
        <div class="grid">
            <div class="col-12 md:col-6 ">
                <div class="flex flex-column align-items-center justify-content-center">
                    <div class="w-full surface-card py-8 px-5 sm:px-8 flex flex-column align-items-center" style="border-radius: 53px">
                        <div class="mt-4 w-full flex justify-content-between py-3 border-300 border-bottom-1 border-top-1 border-left-1 border-right-1">
                            <span class="ml-4 mt-3 flex flex-column">
                                <h3 class="text-900 lg:text-xl font-medium mb-0 block">Junior Dev's Salary</h3>
                                <span class="text-500 lg:text-sm">Rate per Hour</span>
                            </span>
                            <span class="mt-4 ml-5" style="height: 3.5rem; width: 6.5rem">
                                <h3 class="text-900 lg:text-xl font-medium mb-0 block">£ 20.00</h3>
                            </span>
                        </div>
                        <div class="mt-4 w-full flex justify-content-between py-3 border-300 border-bottom-1 border-top-1 border-left-1 border-right-1">
                            <span class="ml-4 mt-3 flex flex-column">
                                <h3 class="text-900 lg:text-xl font-medium mb-0 block">Senior Dev's Salary</h3>
                                <span class="text-500 lg:text-sm">Rate per Hour</span>
                            </span>
                            <span class="mt-4 ml-5" style="height: 3.5rem; width: 6.5rem">
                                <h3 class="text-900 lg:text-xl font-medium mb-0 block">£ 20.00</h3>
                            </span>
                        </div>
                        <div class="mt-4 w-full flex justify-content-between py-3 border-300 border-bottom-1 border-top-1 border-left-1 border-right-1">
                            <span class="ml-4 mt-3 flex flex-column">
                                <h3 class="text-900 lg:text-xl font-medium mb-0 block">Team Lead's Salary</h3>
                                <span class="text-500 lg:text-sm">Rate per Hour</span>
                            </span>
                            <span class="mt-4 ml-5" style="height: 3.5rem; width: 6.5rem">
                                <h3 class="text-900 lg:text-xl font-medium mb-0 block">£ 20.00</h3>
                            </span>
                        </div>
                        <br>
                        <Button @click="addPayItems()" icon="pi pi-plus" label="Create Salary Type" class="ml-2 mb-2"></Button>
                    </div>
                </div>
            </div>
            <div class="col-12 md:col-6 ">
                <div class="flex flex-column align-items-center justify-content-center">
                    <div class="w-full surface-card py-8 px-5 sm:px-8 flex flex-column align-items-center" style="border-radius: 53px">
                        <div class="w-full flex align-items-center py-5 border-300 border-bottom-1">
                            
                            <span class="ml-4 flex flex-column">
                                <span class="lg:text-xl font-medium mb-0 block" style="color:#1F9A72;">Salaries</span>
                                <span class="lg:text-sm">Set up Company specific salaries and choose if they should be calculated on hours or units.</span>
                                </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<style scoped lang="scss">

</style>