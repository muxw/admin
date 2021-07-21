import { ElMessage } from 'element-plus';
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import { store } from '../store/index';
import { AppRouteRecordRaw } from './type';

const modules = import.meta.globEager('./modules/*.ts');
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: {
      path: '/home',
    },
  },
  {
    path: '/login',
    meta: {
      title: '登录',
      ignoreLogin: true,
    },
    component: () => import('../view/login/Login.vue'),
  },
  {
    name: '404',
    path: '/404',
    meta: {
      title: '404',
      ignoreLogin: true,
    },
    component: () => import('../view/404/404.vue'),
  },
];
const routeModuleList: AppRouteRecordRaw[] = [];
Object.keys(modules).forEach((item) => {
  const mod = modules[item].default || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  routeModuleList.push(...modList);
});
export const asyncRoutes = routeModuleList;
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, _form, next) => {
  if (to.meta.ignoreAuth) {
    if (store.getters.getPerson) {
      next();
    } else {
      ElMessage.warning('请先登录');
      next({
        path: '/login',
        query: {
          redirectUrl: to.fullPath,
        },
      });
    }
  } else {
    next();
  }
});
export default router;
