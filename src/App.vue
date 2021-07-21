<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
  import { defineComponent, inject, provide } from 'vue';

  export default defineComponent({
    name: 'App',
    components: {},
    setup() {
      return {};
    },
  });
</script>
