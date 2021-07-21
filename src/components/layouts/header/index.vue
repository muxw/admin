<template>
  <div>
    <div style="height: 70px" class="flex justify-between min-w-full min-h-full align-middle header">
      <div class="left flex items-center">
        <div class="icon">
          <icon-svg
            @click="changeShowMenu"
            class="cursor-pointer text-lg"
            :iconClass="store.state.settings.showMenu ? 'shousuo' : 'zhankai'"
          ></icon-svg>
        </div>

        <div class="bread">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="v.path" :key="v.path" v-for="v in breadcrumbs">
              <span class="path"> {{ t(v.meta.title) }} </span>
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </div>
      <div class="action flex items-center">
        <el-dropdown trigger="click" class="mr-3">
          <div>
            <icon-svg iconClass="yuyan" class="cursor-pointer text-lg text-white"></icon-svg>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="changeLocale('cn')">中文</el-dropdown-item>
              <el-dropdown-item @click="changeLocale('en')">English</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <div class="username">{{ personInfo.username }}</div>
      </div>
    </div>
    <MultipleTabs></MultipleTabs>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, reactive, ref, watch } from 'vue';
  import { RouteLocationMatched, useRoute } from 'vue-router';
  import { useStore } from '@/store';
  import MultipleTabs from '../tabs/index.vue';
  import { useI18n } from 'vue-i18n';
  import { setLocale } from '@/locales/setupI18n';

  export default defineComponent({
    components: {
      MultipleTabs,
    },
    setup() {
      const { t, locale } = useI18n();
      let route = useRoute();
      let breadcrumbs = ref<RouteLocationMatched[]>();
      let store = useStore();
      watch(
        () => route.path,
        (v) => {
          breadcrumbs.value = route.matched.filter((item) => item.meta?.title);
        },
        {
          immediate: true,
        },
      );
      const changeLocale = async (lag) => {
        localStorage.locale = lag;
        await setLocale();
        locale.value = lag;
      };
      const changeShowMenu = (): void => {
        store.commit('setShowMenu');
      };
      let personInfo = computed(() => store.getters.getPersonInfo);
      return {
        breadcrumbs,
        store,
        changeShowMenu,
        personInfo,
        changeLocale,
        t,
      };
    },
  });
</script>

<style lang="scss" scoped>
  .header {
    background: rgba($color: #05b9da, $alpha: 1);
    color: #fff;
    display: flex;
    align-items: center;
    height: 100%;
    justify-content: space-between;
    padding: 0 20px;
    .left {
      .icon {
        padding: 5px;
        margin-right: 10px;
        &:hover {
          background: #82dcec;
        }
      }
    }
    .bread {
      ::v-deep(.el-breadcrumb__separator) {
        color: #fff;
      }

      .path {
        color: #fff;
      }
    }
  }
</style>
