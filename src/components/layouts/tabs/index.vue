<template>
  <div class="tabs">
    <el-tabs v-model="tabIndex" @tab-click="goPath" type="card" @tab-remove="removeTab">
      <el-tab-pane
        :closable="item.path !== '/home'"
        v-for="item in tabs"
        :key="item.path"
        :label="t(item.meta?.title)"
        :name="item.path"
      >
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, watch } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useRoute, useRouter } from 'vue-router';
  import { store } from '../../../store';

  export default defineComponent({
    setup() {
      let tabs = store.getters.getTabs;
      const { t } = useI18n();
      const route = useRoute();
      const router = useRouter();
      const tabIndex = ref('');
      const removeTab = (path) => {
        store.commit('removeTab', path);
      };
      const goPath = (tab) => {
        router.push({
          path: tab.props.name,
        });
      };
      watch(
        () => route.path,
        () => {
          store.commit('addTab', {
            meta: route.meta,
            fullPath: route.fullPath,
            path: route.path,
          });
          tabIndex.value = route.path;
        },
        { immediate: true },
      );
      return {
        tabs,
        tabIndex,
        removeTab,
        goPath,
        t,
      };
    },
  });
</script>

<style lang="scss" scoped>
  .tabs {
    width: 100%;
    border-bottom: 1px solid #e4e7ed;
    padding: 5px 20px;
  }
  :deep(.el-tabs__header) {
    margin: 0;
  }
</style>
