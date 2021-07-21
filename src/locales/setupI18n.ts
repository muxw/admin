import { App } from 'vue';
import { createI18n, I18n } from 'vue-i18n';
export let i18n: ReturnType<typeof createI18n>;
// export let t;
export async function setLocale() {
  const locale = localStorage.locale;
  const defaultLocal = await import(`./lang/${locale}.ts`);
  const message = defaultLocal.default?.message ?? {};
  i18n.global.locale = locale;
  i18n.global.setLocaleMessage(locale, message);
}
async function createI18nOptions() {
  const locale = localStorage.locale;
  console.log(locale);
  const defaultLocal = await import(`./lang/${locale}.ts`);
  const message = defaultLocal.default?.message ?? {};
  console.log(message);
  return {
    legacy: false,
    locale: locale,
    messages: {
      [locale]: message,
    },
  };
}
export async function setupI18n(app: App) {
  const option = await createI18nOptions();
  i18n = createI18n(option) as I18n;
  app.use(i18n);
}
// 为什么要编写此函数？
// 主要用于配合vscode i18nn ally插件。此功能仅用于路由和菜单。请在其他地方使用useI18n
export let t = (key: string) => key;
