<template>
  <n-layout-header class="header flex-sb z-[1] fixed pr-5 pl-5 bottom-link" position="absolute">
    <!-- logo -->
    <div></div>
    <div>
      <Locales></Locales>
    </div>
  </n-layout-header>
</template>

<script lang="ts" setup>
import Locales from '@/components/Locales.vue'
</script>

<style scoped>
.header {
  height: var(--header-height);
  background-color: rgba(255, 255, 255, .1);
  backdrop-filter: blur(8px);
  --tw-backdrop-blur: blur(8px);
}
</style>
