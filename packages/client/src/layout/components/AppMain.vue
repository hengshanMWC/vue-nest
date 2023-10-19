<script lang="ts" setup>
import { useRoute } from 'vue-router'

const route = useRoute()
const key = computed(() => {
  return route.path
})
</script>

<template>
  <n-layout-content class="app-main">
    <router-view v-slot="{ Component }">
      <transition name="scale-slide">
        <!-- <keep-alive> -->
        <component :is="Component" :key="key" class="main-content" />
        <!-- </keep-alive> -->
      </transition>
    </router-view>
  </n-layout-content>
</template>

<style scoped>
.app-main {
  min-height: 100vh;
  width: 100%;
  padding: calc(var(--header-height) + 7px) 7px 7px 7px;
  position: relative;
  overflow: hidden;
}
</style>
