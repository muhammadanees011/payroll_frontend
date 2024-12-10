<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useLayout } from '@/layout/composables/layout';
import { useRouter } from 'vue-router';

const { layoutConfig, onMenuToggle } = useLayout();


const nestedMenuitems = ref([
    {
        label: 'Profile',
        icon: 'pi pi-fw pi-user',
        items: [
            {
                label: 'Profile',
                icon: 'pi pi-fw pi-user'
            },
            {
                label: 'Log-out',
                icon: 'pi pi-fw pi-sign-out'
            }
        ]
    },
]);

// State to manage dropdown visibility
const isDropdownVisible = ref(false);

// Method to toggle dropdown visibility
const toggleDropdown = () => {
  isDropdownVisible.value = !isDropdownVisible.value;
};

// Method to handle logout action
const logout = async () => {
  console.log('Logging out...');
    try {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        this.$router.push({ name: 'SignIn' })
        await axiosClient.get('/logout')
    } catch (error) {
        console.log(error)
    }
};

// Method to close the dropdown when mouse leaves
const closeDropdown = () => {
  isDropdownVisible.value = false;
};

// Method to open dropdown on mouse enter (optional for smooth behavior)
const openDropdown = () => {
  isDropdownVisible.value = true;
};


const outsideClickListener = ref(null);
const topbarMenuActive = ref(false);
const router = useRouter();

onMounted(() => {
    bindOutsideClickListener();
});

onBeforeUnmount(() => {
    unbindOutsideClickListener();
});

function toggleMenu() {
    this.showMenu = !this.showMenu;
};

const logoUrl = computed(() => {
    return `/layout/images/${layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'}.svg`;
});

const onTopBarMenuButton = () => {
    topbarMenuActive.value = !topbarMenuActive.value;
};
const onSettingsClick = () => {
    topbarMenuActive.value = false;
    router.push('/documentation');
};
const topbarMenuClasses = computed(() => {
    return {
        'layout-topbar-menu-mobile-active': topbarMenuActive.value
    };
});

const bindOutsideClickListener = () => {
    if (!outsideClickListener.value) {
        outsideClickListener.value = (event) => {
            if (isOutsideClicked(event)) {
                topbarMenuActive.value = false;
            }
        };
        document.addEventListener('click', outsideClickListener.value);
    }
};
const unbindOutsideClickListener = () => {
    if (outsideClickListener.value) {
        document.removeEventListener('click', outsideClickListener);
        outsideClickListener.value = null;
    }
};
const isOutsideClicked = (event) => {
    if (!topbarMenuActive.value) return;

    const sidebarEl = document.querySelector('.layout-topbar-menu');
    const topbarEl = document.querySelector('.layout-topbar-menu-button');

    return !(sidebarEl.isSameNode(event.target) || sidebarEl.contains(event.target) || topbarEl.isSameNode(event.target) || topbarEl.contains(event.target));
};
</script>

<template>
    <div class="layout-topbar">
        <router-link to="/" class="layout-topbar-logo">
            <img :src="logoUrl" alt="logo" />
            <span>Top-Payroll</span>
        </router-link>

        <button class="p-link layout-menu-button layout-topbar-button" @click="onMenuToggle()">
            <i class="pi pi-bars"></i>
        </button>

        <button class="p-link layout-topbar-menu-button layout-topbar-button" @click="onTopBarMenuButton()">
            <i class="pi pi-ellipsis-v"></i>
        </button>

        <div class="layout-topbar-menu" :class="topbarMenuClasses">
            <!-- <button @click="onTopBarMenuButton()" class="p-link layout-topbar-button">
                <i class="pi pi-calendar"></i>
                <span>Calendar</span>
            </button> -->
            <!-- <button @click="onTopBarMenuButton()" class="p-link layout-topbar-button">
                <i class="pi pi-user"></i>
                <span>Profile</span>
            </button>
            <Menu v-if="showMenu" :model="items" popup ref="menu" :appendTo="body" /> -->

            <div class="dropdown-container" @mouseleave="closeDropdown" @mouseenter="openDropdown">
                <button @click="toggleDropdown" class="p-link layout-topbar-button">
                <i class="pi pi-user"></i>
                <span>Profile</span>
                </button>
                
                <!-- Dropdown Menu -->
                <div v-if="isDropdownVisible" class="dropdown-menu">
                <ul>
                    <li>
                    <a href="/profile">Profile</a>
                    </li>
                    <li>
                    <a @click="logout" href="#">Logout</a>
                    </li>
                </ul>
                </div>
            </div>
<!-- 
            <Menubar :model="nestedMenuitems">
            </Menubar> -->
            <!-- <button @click="onSettingsClick()" class="p-link layout-topbar-button">
                <i class="pi pi-cog"></i>
                <span>Settings</span>
            </button> -->
        </div>
    </div>
</template>

<style lang="scss" scoped>
.p-menubar{
    border: none !important;
}

/* Simple styles for the dropdown */
.dropdown-container {
  position: relative;
}

.dropdown-menu {
  width: 160px;
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  border-radius: 4px;
}

.dropdown-menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.dropdown-menu li {
  margin: 0.5rem 0;
}

.dropdown-menu a {
  text-decoration: none;
  color: #333;
}
</style>
