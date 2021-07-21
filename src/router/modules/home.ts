import { t } from '../../locales/setupI18n';
import { AppRouteRecordRaw } from '../type';
const homeRoute: AppRouteRecordRaw = {
  name: 'home',
  path: '',
  redirect: '/home',
  meta: {
    title: t('home.titleText'),
  },
  component: () => import('@/components/layouts/index.vue'),
  children: [
    {
      name: 'home',
      path: '/home',
      meta: {
        title: t('home.titleText'),
      },
      component: () => import('@/view/home/index.vue'),
    },
  ],
};
export default homeRoute;
