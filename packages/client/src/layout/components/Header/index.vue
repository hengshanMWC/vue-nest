<script lang="ts" setup>
import Logo from './Logo.vue'
import Avatar from './Avatar.vue'
import Locales from '@/components/Locales.vue'
import ThemeSwitch from '@/components/ThemeSwitch.vue'

const leftComponents = [Logo]
const rightComponents = [Locales, ThemeSwitch, Avatar]
</script>

<template>
  <n-layout-header
    class="header flex-sb z-[1] fixed pr-8 pl-8 bottom-link"
    position="absolute"
  >
    <!-- logo -->
    <div class="flex">
      <div
        v-for="(value, index) in leftComponents"
        :key="index"
        class="arrange-boxs box-interval"
      >
        <component :is="value" />
      </div>
    </div>
    <div class="flex">
      <div
        v-for="(value, index) in rightComponents"
        :key="index"
        class="arrange-boxs box-interval"
      >
        <component :is="value" />
      </div>
    </div>
  </n-layout-header>
</template>

<style scoped>
.header {
  height: var(--header-height);
  background-color: rgb(255 255 255 / 10%);
  backdrop-filter: blur(8px);

  --tw-backdrop-blur: blur(8px);

  box-shadow: 7px -6px 9px 0;

  .arrange-boxs {
    @apply flex items-center;
  }

  .box-interval:not(:last-child) {
    @apply mr-6;
  }
}
</style>
