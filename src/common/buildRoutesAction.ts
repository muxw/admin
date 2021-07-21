import { AppRouteRecordRaw } from '../router/type';
import { store } from '../store';
import { filter } from '../utils/treeFilter';

export function buildRoutesAction(routes: AppRouteRecordRaw[]) {
  let username = store.state.personInfo?.username;
  const routeFilter = (route: AppRouteRecordRaw) => {
    const { meta } = route;
    // 获取路由需要的权限，如果为空，则开放所有权限
    const { roles } = meta || {};
    if (!roles) return true;
    return roles.includes(username as string);
  };
  routes = filter(routes, routeFilter);
  return routes;
}
