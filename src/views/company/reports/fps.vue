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
            <div class="col-12 md:col-12 ">
                <div class="flex flex-column align-items-center justify-content-center">
                    <div class="w-full surface-card px-5 sm:px-8 flex flex-column align-items-center" style="border-radius: 53px">
                        <div class="w-full flex justify-content-between border-200 border-top-1 border-left-1 border-right-1 border-bottom-1">
                            <span class="ml-4 mt-3 flex">
                                <h5 class="text-900 lg:text-sm font-medium mb-3 block">
                                    <i class="pi pi-fw pi-exclamation-circle"></i>
                                    Please find below all the FPS reports that have been sent to HMRC, you can download them for your future reference.</h5>
                            </span>
                        </div>
                    </div>
                    <div class="w-full surface-card py-8 px-5 sm:px-8"  style="display: flex; justify-content: flex-start;" >
                        <div style="width: 50% !important;"class="w-full flex justify-content-between py-3 border-300 border-top-1 border-left-1 border-right-1 border-bottom-1">
                            <span class="ml-4 mt-3 flex flex-column">
                                <h5 class="text-900 lg:text-lg font-medium mb-0 block">August Submissin</h5>
                                <span class="mt-4 text-400 lg:text-sm font-medium mb-0 block reports-btn">Tax period: 17 | 23/08/2024 - 29/08/2024</span>
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
</style> 