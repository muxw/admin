import router from '..';
import { createPageGuard } from './pageGuard';
import { createPermissionGuard } from './permissionGuard';

export function setupRouterGuard() {
  createPermissionGuard(router);
  createPageGuard(router);
}
