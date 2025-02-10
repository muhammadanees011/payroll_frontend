import { defineStore } from 'pinia';

export const useAppStore = defineStore('appStore', {
  state: () => ({
    page: '',
  }),
  actions: {
    setPage(page) {
      this.page = page;
    },
  },
  getters: {
    currentPage: (state) => state.page,
  }
});
