<script setup>
import { useLayout } from '@/layout/composables/layout';
import { ref, computed } from 'vue';
import AppConfig from '@/layout/AppConfig.vue';

const { layoutConfig } = useLayout();
const email = ref('');
const password = ref('');
const checked = ref(false);
</script>

<template>
  <div class="background-split surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
    <div class="header-box">
      <div class="logo_container">
      <img src="https://portal.hrm-pro.co.uk/assets/images/eduhr.png" alt="Logo" class="header-logo">
      </div>
      <div class="header-content mr-2">
        <a class="font-medium " href="/about-us">About Us</a> |
        <a class="font-medium " href="/privacy-policy">Terms and Conditions</a> |
        <a class="font-medium " href="/privacy-policy">Privacy Policy</a>
        <select v-model="selectedLanguage">
          <option value="en">English</option>
          <option value="es">Español</option>
        </select>
      </div>
    </div>
    <div class="flex flex-column align-items-center justify-content-center">
      <div class="w-full surface-card py-4 px-5 sm:px-6" style="border-radius: 30px">
        <div class=" mb-5">
          <div class="text-600 text-3xl font-medium mb-3">Login</div>
        </div>

        <div>
          <label for="email1" class="block text-900 text-50 font-medium mb-2">Email</label>
          <InputText id="email1" type="text" placeholder="Email address" class="w-full md:w-25rem mb-5" style="padding: 0.7rem" v-model="email" />

          <label for="password1" class="block text-900 font-medium text-50 mb-2">Password</label>
          <Password id="password1" v-model="password" placeholder="Password" :toggleMask="true" class="w-full mb-3" inputClass="w-full" :inputStyle="{ padding: '0.7rem' }"></Password>

          <div class="flex mb-5 gap-5">
            <a class="font-medium no-underline ml-2 text-right cursor-pointer" style="color: #6610f2">Forgot your password?</a>
          </div>
          <Button @click="goToHome" label="Login" class="loginBtn w-full p-2 text-xl"></Button>
        </div>
      </div>
    </div>
    <img src="https://portal.hrm-pro.co.uk/assets/images/common.svg" alt="Decorative Image" class="decorative-image">
    <img src="https://portal.hrm-pro.co.uk/assets/images/theme-3.svg" alt="Feature Image" class="white-half-image">

  </div>

    <AppConfig simple />
</template>
<script>
export default {
  data() {
    return {
      selectedLanguage: 'en',
    };
  },

  watch: {
    selectedLanguage(newLang) {
      console.log("Language changed to:", newLang);
      // Implement your language change logic here
    }
  },
  methods: {
    goToHome() {
      this.$router.push({ name: 'landing' });
    }
  }
}

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
.background-split {
  background: linear-gradient(to right, white 50%, #007BFF 50%); /* Adjust as necessary */
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative; /* Necessary for absolute positioning of children */
}

.surface-ground {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.surface-card {
  background: white; /* Ensures the card background is white */
  border-radius: 53px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.input-group, .password-group {
  margin-bottom: 1rem;
}

.input-text, .password {
  padding: 1rem;
  border: 1px solid #ccc;
  width: 100%;
}

.button {
  padding: 0.8rem;
  width: 100%;
  background-color: #6244f7; /* Example primary color */
  color: white;
  border: none;
  border-radius: 4px;
}

.remember-me {
  display: flex;
  align-items: center;
}

.forgot-password {
  color: var(--primary-color);
  text-decoration: none;
  cursor: pointer;
}

.background-split {
  background: linear-gradient(to right, white 50%, #6610f2 50%); /* Adjust the blue color as needed */
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative; /* This is needed to position the image absolutely relative to this container */
}

.decorative-image {
  position: absolute;
  bottom: 0;
  right: 0; /* Adjust positioning as needed to fit your design */
  max-width: 50%; /* Ensures the image does not overlap to the white side */
  height: auto; /* Maintain aspect ratio */
}
.header-box {
  position: absolute;
  z-index:10;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 80%;
  padding: 10px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.white-half-image {
  position: absolute;
  top: 50%;
  left: 20%;
  transform: translate(-50%, -50%);
  width: auto;
  max-width: 30%;
  height: auto;
}


.header-logo {
  height: 70px;
  padding:5px;
}

.header-content a {
  margin-right: 10px;
  text-decoration: none;
  color: #333;
}

.header-content select {
  padding: 5px 10px;
  border: 1px solid #ccc;
}
.logo_container{
  background-color:#6610f2;
  border-radius:10px;

}
.loginBtn{
  background-color:#6610f2;
}

@media (max-width: 768px) {
  .decorative-image {
    max-width: 40%;
  }
}
</style>