import { RoleEnum } from '../../enums/roles';
import { t } from '../../locales/setupI18n';
import { AppRouteRecordRaw } from '../type';

const inquiryRoute: AppRouteRecordRaw = {
  name: 'inquiry',
  path: '/inquiry',
  component: () => import('@/components/layouts/index.vue'),
  meta: {
    title: t('inquiry.titleText'),
  },
  children: [
    {
      path: '/inquiry/video',
      meta: {
        title: t('inquiry.videoTitleText'),
      },
      component: () => import('@/view/inquiry/video.vue'),
    },
    {
      path: '/inquiry/chat',
      meta: {
        title: t('inquiry.chatTitleText'),
        roles: [RoleEnum.USER],
      },
      component: () => import('@/view/inquiry/video.vue'),
    },
  ],
};
export default inquiryRoute;
