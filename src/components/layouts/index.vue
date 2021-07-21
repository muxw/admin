<template>
  <div class="layout" id="layout">
    <el-container>
      <el-aside width="auto">
        <div class="aside" :class="{ active: store.state.settings.showMenu }">
          <div class="flex items-center justify-center w-64 logo">
            <img src="@/assets/image/logo.png" class="h-10 w-52" alt="" />
          </div>
          <AppMenu :show="show"></AppMenu>
        </div>
      </el-aside>
      <el-container>
        <el-header height="auto">
          <AppHeader />
        </el-header>
        <el-main id="main">
          <transition name="fade">
            <router-view v-slot="{ Component, route }">
              <keep-alive v-if="isCache(route.path)">
                <component :is="Component" :key="route.meta.usePathKey ? route.path : undefined" />
              </keep-alive>
              <component v-else :is="Component" :key="route.meta.usePathKey ? route.path : undefined" />
            </router-view>
          </transition>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, ref } from 'vue';
  import AppMenu from '@/components/layouts/menu/index.vue';
  import AppHeader from '@/components/layouts/header/index.vue';
  import { store } from '../../store';
  export default defineComponent({
    name: 'Index',
    components: {
      AppMenu,
      AppHeader,
    },
    setup() {
      const show = ref(true);
      const isCache = (path) => {
        return store.getters.getTabs.find((item) => item.path === path);
      };
      return {
        show,
        store,
        isCache,
      };
    },
  });
</script>
<style lang="scss" scoped>
  .layout {
    ::v-deep(.el-header) {
      padding: 0;
    }
    .aside {
      height: calc(100vh - 60px);
      width: 0;
      transition: width 0.3s;
      border-right: 1px solid #e6e6e6;
      overflow: hidden;
      &.active {
        width: 16rem;
      }
      .logo {
        height: 70px;
        background: #37c7e1;
      }
    }
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.5s ease;
  }
  .fade-enter-to {
    transform: translateX(0);
  }
  .fade-enter-from,
  .fade-leave-to {
    transform: translateX(-100%);
  }
</style>
