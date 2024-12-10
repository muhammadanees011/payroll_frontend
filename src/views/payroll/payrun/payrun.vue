<template>
    <div class="col-12 md:col-12">
        <div class="card card-w-title">
            <h5>Pay Date: 02/12/2024 <Tag>Active</Tag>
            </h5>
            <p>Tax Period: 35</p>
            <TabMenu :model="nestedRouteItems" @click="tabHandler" />
            <router-view />
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
        recordID:null,
        nestedRouteItems: [
            {
            label: 'Salaried Employees',
            to: ''
            },
            {
            label: 'Input Hours',
            to: ''
            },
            {
            label: 'Hourly Employees',
            to: ''
            },
            {
            label: 'Review Payroll',
            to: ''
            }
        ]
    };
  },
  methods:{
    //-------------CHANGE TAB----------------
    tabHandler(data){
        let employeedID=this.$route.params.id
        if(data && data.target.innerText){
            let routeName= this.removeSpaceBetweenWords(data.target.innerText)
            this.$router.push({ name: routeName, params: { id: employeedID } });
        }
    },

    //-------------REMOVE SPACE BETWEEN WORDS IN TAB NAME----------------
    removeSpaceBetweenWords(str) {
        return str.replace(/(\w)\s+(\w)/g, '$1$2');
    }

  },
};

</script>

<style scoped lang="scss">

</style>