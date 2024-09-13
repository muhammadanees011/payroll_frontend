<template>
  <!-- company details form -->
<div class="col-12 md:col-12">
    <div class="card card-w-title">
        <div class="grid">
            <div class="col-12 md:col-6 ">
                <div class="flex flex-column align-items-center justify-content-center">
                    <div class="w-full surface-card py-8 px-5 sm:px-8 flex flex-column align-items-center" style="border-radius: 53px">
                        
                        <template v-for="item in salaries">
                            <div class="mt-4 w-full flex justify-content-between py-3 border-300 border-bottom-1 border-top-1 border-left-1 border-right-1">
                                <span class="ml-4 mt-3 flex flex-column">
                                    <h3 class="text-900 lg:text-xl font-medium mb-0 block">{{ item.description }}</h3>
                                    <span v-if="item.salary_period=='hour' || item.salary_period==null" class="text-500 lg:text-sm">Rate per Hour</span>
                                    <span v-if="item.salary_period=='unit'" class="text-500 lg:text-sm">Rate per Unit</span>
                                </span>
                                <div class="mt-4 flex" style="height: 3.5rem; width: 6.5rem;  position: relative;">
                                    <h3 v-if="item.salary_rate" class="text-900 lg:text-xl font-medium mb-0 block">£{{ item.salary_rate }}</h3>
                                    <h3 v-if="item.multiply_by" class="text-900 lg:text-xl font-medium mb-0 block"> {{ item.multiply_by }}X</h3>
                                    
                                    <div class="dropdown ml-2">
                                        <button class="dropdown-btn">⋮</button>
                                        <div class="dropdown-content">
                                            <a @click="removeSalary(item.id)" href="#">Remove</a>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </template>
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

<script>
export default {
  data() {
    return {
        salaries:'',
    };
  },
  mounted(){
    this.getSalaries()
  },
  methods: {

    addPayItems(){
      this.$router.push({ name: 'company-create-salaries' });
    },
    
    async getSalaries(){
        const apiUrl = `/get-salary-type`;
        try {
        let response=await this.$axios.get(apiUrl);
        this.salaries=response.data
        } catch (error) {
        let errors=error.response.data.errors
        }
    },

    async removeSalary(id){
        const isConfirmed =await this.$showConfirmation();
        if (isConfirmed) {
        } else {
        return
        }

        const apiUrl = `/remove-salary-type/`+id;
        try {
        await this.$axios.get(apiUrl);
        this.$showToast('success','Salary type removed.');
        this.getSalaries()
        } catch (error) {
        let errors=error.response.data.errors
        }
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