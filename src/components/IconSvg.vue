<template>
  <svg class="svg-icon" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
  import { computed, ref } from 'vue';
  export default {
    name: 'IconSvg',
    props: {
      iconClass: {
        type: String,
        required: true,
      },
    },
    setup(props) {
      console.log(props);
      const iconName = computed(() => {
        return `#el-icon-cloud-${props.iconClass}`;
      });
      return {
        iconName,
      };
    },
  };
</script>

<style>
  .svg-icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
</style>
