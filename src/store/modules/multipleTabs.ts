import router from '../../router';

export const multipleTabs = {
  state: {
    tabs: [],
  },
  getters: {
    getTabs(state) {
      return state.tabs;
    },
  },
  mutations: {
    addTab(state, data) {
      if (!state.tabs.find((item) => item.path == data.path)) {
        state.tabs.push(data);
      }
    },
    removeTab(state, data) {
      let index = state.tabs.findIndex((item) => data === item.path);
      state.tabs.splice(index, 1);
      router.push(state.tabs[index - 1].path);
    },
  },
};
