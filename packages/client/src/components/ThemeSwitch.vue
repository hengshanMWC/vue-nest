<script lang="ts" setup>
import { Moon, Sunny } from '@vicons/ionicons5'
import { storeToRefs } from 'pinia'
import { useSettingStore } from '@/stores/modules/setting'

const { isDarkRef } = storeToRefs(useSettingStore())
</script>

<template>
  <n-switch v-model:value="isDarkRef" size="large">
    <template #checked-icon>
      <n-icon :component="Moon" />
    </template>
    <template #unchecked-icon>
      <n-icon :component="Sunny" />
    </template>
  </n-switch>
</template>

<style scoped></style>
