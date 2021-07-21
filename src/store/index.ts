import { InjectionKey } from 'vue';
import { RouteRecordRaw } from 'vue-router';
import { createStore, useStore as baseUseStore, Store } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import { AppRouteRecordRaw } from '../router/type';
import { multipleTabs } from './modules/multipleTabs';
import { userStore } from './modules/user';

interface State {
  settings: {
    showMenu: true | false;
  };
  getIsDynamicAddedRoute: boolean;
  routes: AppRouteRecordRaw[];
  menu: Array<RouteRecordRaw>;
}

export const key: InjectionKey<Store<State>> = Symbol('key');
// 创建一个新的 store 实例
export const store = createStore<State>({
  plugins: [createPersistedState()],
  modules: {
    userStore,
    multipleTabs,
  },
  state: () => {
    return {
      routes: [],
      getIsDynamicAddedRoute: true,
      settings: {
        showMenu: true,
      },
      menu: [],
    };
  },
  mutations: {
    setShowMenu(state: State, data) {
      if (data) {
        state.settings.showMenu = data;
      } else {
        state.settings.showMenu = !state.settings.showMenu;
      }
    },

    setMenu(state: State, data) {
      state.menu = data;
    },
  },
});
export function useStore() {
  return baseUseStore(key);
}
