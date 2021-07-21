import { ElMessage } from 'element-plus';
import { Router, RouteRecordRaw } from 'vue-router';
import { asyncRoutes } from '..';
import { buildRoutesAction } from '../../common/buildRoutesAction';
import { store } from '../../store';
let getIsDynamicAddedRoute = false;
export function createPermissionGuard(router: Router) {
  router.beforeEach((to, _from, next) => {
    if (to.meta.ignoreLogin) {
      next();
      return;
    }
    if (store.getters.getPersonInfo.username) {
      if (getIsDynamicAddedRoute) {
        next();
        return;
      }
      let routes = buildRoutesAction(asyncRoutes);
      routes.forEach((route) => {
        router.addRoute(route as unknown as RouteRecordRaw);
      });
      getIsDynamicAddedRoute = true;
      next(to.path);
    } else {
      ElMessage.warning('请先登录');
      next({
        path: '/login',
        query: {
          redirectUrl: to.fullPath,
        },
      });
    }
  });
}
