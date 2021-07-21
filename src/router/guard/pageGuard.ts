import { Router } from 'vue-router';

export function createPageGuard(router: Router) {
  router.beforeEach((_to, _from, next) => {
    console.log('page');
    next();
  });
}
