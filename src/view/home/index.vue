<template>
  <div>
    {{ t('home.titleText') }}
    {{ test }}
  </div>
</template>

<script lang="ts">
  import { defineComponent, inject, Ref, InjectionKey, provide, onMounted, readonly, reactive } from 'vue';
  import router from '../../router';
  import { store } from '@/store/index';
  import { key } from '../../common/test';
  import { ElLoading } from 'element-plus';
  import { useI18n } from 'vue-i18n';
  import { i18n } from '../../locales/setupI18n';

  export default defineComponent({
    setup(prop, context) {
      // useI18n必须在setup函数中使用
      const { t } = useI18n();
      return {
        t,
      };
    },
  });
</script>
