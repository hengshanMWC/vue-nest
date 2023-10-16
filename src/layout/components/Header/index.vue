<template>
  <n-layout-header class="header flex-sb z-[1] fixed pr-10 pl-10 bottom-link" position="absolute">
    <!-- logo -->
    <div></div>
    <div class="flex">
      <div v-for="(value, index) in rightComponents" :key="index" class="flex items-center box-interval">
        <component :is="value"></component>
      </div>
    </div>
  </n-layout-header>
</template>

<script lang="ts" setup>
import Locales from '@/components/Locales.vue'
import ThemeSwitch from '@/components/ThemeSwitch.vue'
const rightComponents = [Locales, ThemeSwitch]
</script>

<style scoped>
.header {
  height: var(--header-height);
  background-color: rgba(255, 255, 255, .1);
  backdrop-filter: blur(8px);
  --tw-backdrop-blur: blur(8px);

  .box-interval:not(:last-child) {
    @apply mr-4
  }
}
</style>
