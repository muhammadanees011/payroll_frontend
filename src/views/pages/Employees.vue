<script setup>
import { onMounted, reactive, ref, watch } from 'vue';
import { ProductService } from '@/service/ProductService';
import { useLayout } from '@/layout/composables/layout';

const { isDarkTheme } = useLayout();

const products = ref(null);
const lineData = reactive({
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'First Dataset',
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      backgroundColor: '#2f4860',
      borderColor: '#2f4860',
      tension: 0.4
    },
    {
      label: 'Second Dataset',
      data: [28, 48, 40, 19, 86, 27, 90],
      fill: false,
      backgroundColor: '#00bb7e',
      borderColor: '#00bb7e',
      tension: 0.4
    }
  ]
});
const items = ref([
  { label: 'Add New', icon: 'pi pi-fw pi-plus' },
  { label: 'Remove', icon: 'pi pi-fw pi-minus' }
]);
const lineOptions = ref(null);
const productService = new ProductService();

onMounted(() => {
  productService.getProductsSmall().then((data) => (products.value = data));
});

const formatCurrency = (value) => {
  return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};
const applyLightTheme = () => {
  lineOptions.value = {
    plugins: {
      legend: {
        labels: {
          color: '#495057'
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: '#495057'
        },
        grid: {
          color: '#ebedef'
        }
      },
      y: {
        ticks: {
          color: '#495057'
        },
        grid: {
          color: '#ebedef'
        }
      }
    }
  };
};

const applyDarkTheme = () => {
  lineOptions.value = {
    plugins: {
      legend: {
        labels: {
          color: '#ebedef'
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: '#ebedef'
        },
        grid: {
          color: 'rgba(160, 167, 181, .3)'
        }
      },
      y: {
        ticks: {
          color: '#ebedef'
        },
        grid: {
          color: 'rgba(160, 167, 181, .3)'
        }
      }
    }
  };
};

watch(
  isDarkTheme,
  (val) => {
    if (val) {
      applyDarkTheme();
    } else {
      applyLightTheme();
    }
  },
  { immediate: true }
);
</script>

<template>
  <div class="p-3">
    <div style="display:flex " class="justify-content-between align-content-end">
      <h5>Employee List</h5>
      <Button icon="pi pi-plus" label="New Employee" @click="expandAll" class="mr-2 mb-2 " />

    </div>
    <DataTable :value="employees">
      <Column field="id" header="Id" :sortable="true" />
      <Column field="customer" header="Name" :sortable="true" />
      <Column field="date" header="Joining Date" :sortable="true" />
      <Column field="amount" header="Salary" :sortable="true">
        <template #body="slotProps">
          {{ formatCurrency(slotProps.data.amount) }}
        </template>
      </Column>
      <Column field="status" header="Status" :sortable="true">
        <template #body="slotProps">
          <span :class="'order-badge order-' + (slotProps.data.status ? slotProps.data.status.toLowerCase() : '')">{{ slotProps.data.status }}</span>
        </template>
      </Column>
      <Column header="Action">
        <template #body>
          <Button icon="pi pi-eye" />
          <Button icon="pi pi-pencil" class="ml-2" />
          <Button icon="pi pi-trash" class="ml-2" />
        </template>
      </Column>
    </DataTable>
  </div>
</template>
<script>
export default {
  data() {
    return {
      employees: [
        { id: 1, name: 'John Doe', customer: 'ABC Corp', date: '2021-09-01', amount: 1200.00, status: 'Pending' },
        { id: 2, name: 'Jane Smith', customer: 'XYZ Inc', date: '2021-09-02', amount: 1100.00, status: 'Approved' },
        { id: 3, name: 'Emily Johnson', customer: 'Example LLC', date: '2021-09-03', amount: 900.00, status: 'Rejected' },
        { id: 4, name: 'Michael Brown', customer: 'Test Industries', date: '2021-09-04', amount: 1300.00, status: 'Pending' }
      ]
    };
  },
  methods: {
    formatCurrency(value) {
      return `$${value.toFixed(2)}`;
    }
  }
}
</script>


<style scoped lang="scss">

</style>