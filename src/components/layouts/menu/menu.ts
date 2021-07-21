import { RouteRecordNormalized } from 'vue-router';
import router from '@/router';
import { menus } from '@/router/menus';
import { filter } from '@/utils/treeFilter';

export function getMenus() {
  const routes = router.getRoutes();
  return filter(menus, basicFilter(routes));
}
export function basicFilter(routes: RouteRecordNormalized[]) {
  return (menu) => {
    return routes.find((route) => route.path == menu.path) ? true : false;
  };
}
