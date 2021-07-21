import { RouteRecordRaw } from 'vue-router';
import { RoleEnum } from '../enums/roles';

export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta' | 'children'> {
  meta: RouteMeta;
  children?: AppRouteRecordRaw[];
}

export interface RouteMeta {
  // title
  title: string;
  // Whether to ignore permissions
  ignoreAuth?: boolean;
  // role info
  roles?: string[];
  // Whether not to cache
  ignoreKeepAlive?: boolean;
  // Is it fixed on tab
  affix?: boolean;
  // icon on tab
  icon?: string;

  frameSrc?: string;

  // current page transition
  transitionName?: string;

  // Whether the route has been dynamically added
  hideBreadcrumb?: boolean;

  // Hide submenu
  hideChildrenInMenu?: boolean;

  // Carrying parameters
  carryParam?: boolean;

  // Used internally to mark single-level menus
  single?: boolean;

  // Currently active menu
  currentActiveMenu?: string;

  // Never show in tab
  hideTab?: boolean;

  // Never show in menu
  hideMenu?: boolean;

  isLink?: boolean;
}

export interface Menu {
  name: string;

  icon?: string;

  path: string;

  disabled?: boolean;

  children?: Menu[];

  orderNo?: number;

  roles?: RoleEnum[];

  meta?: Partial<RouteMeta>;

  tag?: MenuTag;

  hideMenu?: boolean;
}
export interface MenuTag {
  type?: 'primary' | 'error' | 'warn' | 'success';
  content?: string;
  dot?: boolean;
}
