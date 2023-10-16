<template>
  <n-layout-header class="header" position="absolute">
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
  background-color: rgba(255, 255, 255, .8);
  z-index: 1;
  position: fixed;
  display: flex;
  align-items: center;
}
</style>
