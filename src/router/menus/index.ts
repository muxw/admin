import { t } from '../../locales/setupI18n';

export const menus = [
  {
    path: '/home',
    name: t('home.titleText'),
  },
  {
    path: '/inquiry',
    name: t('inquiry.titleText'),
    children: [
      {
        path: '/inquiry/video',
        name: t('inquiry.videoTitleText'),
      },
      {
        path: '/inquiry/chat',
        name: t('inquiry.chatTitleText'),
      },
    ],
  },
];
