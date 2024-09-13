<template>
  <!-- company details form -->
<div class="col-12 md:col-12">
    <div class="card card-w-title">
        <div class="grid">
            <div class="col-12 md:col-6 ">
                <div class="flex flex-column align-items-center justify-content-center">
                    <div class="w-full surface-card py-8 px-5 sm:px-8 flex flex-column align-items-center" style="border-radius: 53px">
                        <template v-for="item in payItems">
                        <div class="mt-3 w-full flex justify-content-between py-3 border-300 border-bottom-1 border-top-1 border-left-1 border-right-1">
                            <span class="ml-4 mt-3 mr-3 flex flex-column">
                                <h3 class="text-900 lg:text-xl font-medium mb-0 block">{{ item.name }}</h3>
                                <span v-if="item.pensionable" class="text-500 lg:text-sm">{{ item.payment_type }} -Pensionable</span>
                                <span v-if="item.taxable" class="text-500 lg:text-sm">{{ item.payment_type }} -Taxable</span>
                                <span v-if="item.subject_to_national_insurance" class="text-500 lg:text-sm">{{ item.payment_type }} -Subject to National Insurance</span>
                                <span v-if="!item.pensionable && !item.taxable && !item.subject_to_national_insurance" class="text-500 lg:text-sm">{{ item.payment_type }}</span>

                            </span>
                            <span class="mt-4" style="height: 3.5rem; width: 3.5rem">
                                <i @click="editPayItem(item.id)" class="text-500 pi pi-fw pi-chevron-right text-sm"></i>
                            </span>
                        </div>
                        </template>
                        <br>
                        <Button @click="addPayItems()" icon="pi pi-plus" label="New Pay Item" class="ml-2 mb-2"></Button>
                    </div>
                </div>
            </div>
            <div class="col-12 md:col-6 ">
                <div class="flex flex-column align-items-center justify-content-center">
                    <div class="w-full surface-card py-8 px-5 sm:px-8 flex flex-column align-items-center" style="border-radius: 53px">
                        <div class="w-full flex align-items-center py-5 border-300 border-bottom-1">
                            
                            <span class="ml-4 flex flex-column">
                                <span class="lg:text-xl font-medium mb-0 block" style="color:#1F9A72;">Recurring <span class="lg:text-sm" style="color:#1F9A72;"></span></span>
                                <span class="lg:text-sm">Create recurring pay items that you can apply to employees and have
                                    them automatically be added to future payrolls. ( Runs until cancelled )</span>
                                </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
  data() {
    return {
        payItems:'',
    };
  },
  mounted(){
    this.getPayItems();
  },
  methods: {
    addPayItems(){
      this.$router.push({ name: 'company-create-payitems' });
    },

    editPayItem(itemID){
        this.$router.push({ name: 'company-edit-payitems',params:{id:itemID} });
    },

    //-----------Get Pay Items-----------
    async getPayItems(){
        const apiUrl = `/get-pay-items`;
        try {
        let response=await this.$axios.get(apiUrl);
        this.payItems=response.data
        } catch (error) {
        let errors=error.response.data.errors
        }
    },

  }
}
</script>

<style scoped lang="scss">

</style>