import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import { store, key } from '@/store/index';
import 'element-plus/lib/theme-chalk/index.css';
import './index.css';
import router from '@/router/index';
import App from './App.vue';
import IconSvg from '@/components/IconSvg.vue';
import { setupRouterGuard } from './router/guard';
import { setupI18n } from './locales/setupI18n';
localStorage.locale = 'cn';
async function bootstrap() {
  const app = createApp(App);
  setupRouterGuard();
  await setupI18n(app);
  app.use(store, key);
  // router-guard
  app.use(router);
  app.use(ElementPlus);
  app.component('IconSvg', IconSvg);
  app.mount('#app');
}
bootstrap();

// router.isReady().then(() => app.mount('#app'));
