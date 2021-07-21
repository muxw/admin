<template>
  <div>
    <el-menu :default-active="activeIndex" class="el-menu-vertical-demo" :unique-opened="false" router>
      <div v-for="v in menu" :key="v.path">
        <el-submenu v-if="v.children" :index="v.path">
          <template v-slot:title>
            <!-- <i class="el-icon-document"></i> -->
            <span>{{ t(v.name) }}</span>
          </template>
          <template v-if="v.children">
            <el-menu-item :index="j.path" v-for="j in v.children" :key="j.name">{{ t(j.name) }}</el-menu-item>
          </template>
        </el-submenu>
        <el-menu-item v-else :index="v.path">
          {{ t(v.name) }}
        </el-menu-item>
      </div>
    </el-menu>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, reactive, ref, watch } from 'vue';
  import { getMenus } from './menu';
  import { useStore } from '@/store';
  import { useI18n } from 'vue-i18n';
  import router from '../../../router';
  import { useRoute } from 'vue-router';
  export default defineComponent({
    name: 'LayoutMenu',
    setup() {
      let store = useStore();
      const route = useRoute();
      const activeIndex = ref('');
      const { t } = useI18n();
      const menu = getMenus();
      // 处理刷新后路由激活状态不对的问题
      watch(
        () => route.path,
        (v) => {
          activeIndex.value = route.path;
        },
        {
          immediate: true,
        },
      );
      return {
        menu,
        t,
        activeIndex,
      };
    },
  });
</script>
