<script>
export default {
  data() {
    return {
    };
  },
  methods: {
    navigateTo(routeName){
      this.$router.push({ name: routeName});

    }
  }
}
</script>

<template>
  <!-- company details form -->
<div class="col-12 md:col-12">
    <div class="card card-w-title">
        <div class="grid">
            <div class="col-12 md:col-8 ">
                <div class="flex flex-column align-items-center justify-content-center">
                    <div class="w-full surface-card py-8 px-5 sm:px-8 flex flex-column align-items-center" style="border-radius: 53px">
                        <div class="w-full flex justify-content-between py-3 border-200 border-top-1 border-left-1 border-right-1">
                            <span class="ml-4 mt-3 flex flex-column">
                                <h5 class="text-900 lg:text-lg font-medium mb-0 block">HMRC Submissions</h5>
                                <span @click="navigateTo('company-fps')" class="mt-4 text-400 lg:text-sm font-medium mb-0 block reports-btn">Full Payment Submissions (FPS)</span>
                                <span @click="navigateTo('company-eps')" class="mt-2 text-400 lg:text-sm font-medium mb-0 block reports-btn">Employer Payment Submissions (EPS)</span>
                            </span>
                        </div>
                        <div class="w-full flex justify-content-between py-3 border-200 border-top-1 border-left-1 border-right-1">
                            <span class="ml-4 mt-3 flex flex-column">
                                <h5 class=" reports-btn text-900 lg:text-lg font-medium mb-0 block">Year End Reports</h5>
                            </span>
                        </div>
                        <div class="w-full flex justify-content-between py-3 border-200 border-top-1 border-left-1 border-right-1">
                            <span class="ml-4 mt-3 flex flex-column">
                                <h3 @click="navigateTo('company-p32taxes-filings')" class="reports-btn text-900 lg:text-xl font-medium mb-0 block">P32 Taxes and Filings</h3>
                            </span>
                        </div>
                        <div class="w-full flex justify-content-between py-3 border-200 border-bottom-1 border-top-1 border-left-1 border-right-1">
                            <span class="ml-4 mt-3 flex flex-column">
                                <h3 class="reports-btn text-900 lg:text-xl font-medium mb-0 block">Payroll Journals</h3>
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
.reports-btn{
    cursor: pointer;
}
.reports-btn:hover{
    text-decoration: underline;
}
</style> 