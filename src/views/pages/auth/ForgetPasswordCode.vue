<template>
    <div class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <div class="flex flex-column align-items-center justify-content-center">
            <img :src="logoUrl" alt="Top-Payroll logo" class="mb-5 w-6rem flex-shrink-0" />
            <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
                    <div class="text-center mb-5">
                        <span class="text-600 font-medium">Enter confirmation code to continue</span>
                    </div>

                    <div v-if="isSuccess" class="text-center mb-5 pt-2 pb-2" style="background-color: #80D1B4; border-radius: 5px !important;">
                        <span class="text-white font-medium">Your code has been successfully verified</span>
                    </div>

                    <div v-if="isErrors" class="text-center mb-5 pt-2 pb-2" style="background-color: #E88D58; border-radius: 5px !important;">
                        <span v-for="error in errors" class="text-white font-medium">
                            {{ error }}
                            <br>
                        </span>
                    </div>

                    <div>
                        <label for="code" class="block text-900 text-xl font-medium mb-1">Code</label>
                        <InputText id="code" type="text" placeholder="Enter the code" class="w-full md:w-20rem mb-5" style="padding: 1rem; width: 100% !important;" v-model="userData.reset_password_code" />

                        <Button label="Proceed" @click="sendCode()" class="w-full p-3 text-xl"></Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <AppConfig simple />
</template>

<script>
import { useLayout } from '@/layout/composables/layout';
import AppConfig from '@/layout/AppConfig.vue';

export default {
    components: {
        AppConfig
    },
    data() {
        return {
            errors:null,
            isSuccess:false,
            isErrors:false,
            userData:{
            email: '',
            reset_password_code:''
            },
        };
    },
    computed: {
        layoutConfig() {
            const { layoutConfig } = useLayout();
            return layoutConfig;
        },
        logoUrl() {
            return `/layout/images/logo-dark.svg`;
        }
    },
    methods: {
        //-----------Register user-----------
        async sendCode(){
            this.userData.email=this.$route.params.email
            const apiUrl = `/forgot_password_verify_otp`;
            try {
            await this.$axios.post(apiUrl,this.userData);
            this.isErrors=false
            this.isSuccess=true
            this.$router.push({ name: 'ResetPassword', params: { email: this.$route.params.email } });
            } catch (error) {
            this.errors=error.response.data.errors
            this.isSuccess=false
            this.isErrors=true
            }
        },
    }
};
</script>


<style scoped>
.pi-eye {
    transform: scale(1.6);
    margin-right: 1rem;
}

.pi-eye-slash {
    transform: scale(1.6);
    margin-right: 1rem;
}
</style>
