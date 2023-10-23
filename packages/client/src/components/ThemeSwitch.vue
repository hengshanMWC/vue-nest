<script lang="ts" setup>
import { Moon, Sunny } from '@vicons/ionicons5'
import { storeToRefs } from 'pinia'
import { useSettingStore } from '@/stores/modules/setting'
import { ENUM_THEME } from '@/constant'

const { themeRef } = storeToRefs(useSettingStore())
const active = ref<boolean>(themeRef.value === ENUM_THEME.DARK)
watch(active, (value) => {
  themeRef.value = value ? ENUM_THEME.DARK : ENUM_THEME.DEFAULT
})
</script>

<template>
  <n-switch v-model:value="active" size="large">
    <template #checked-icon>
      <n-icon :component="Moon" />
    </template>
    <template #unchecked-icon>
      <n-icon :component="Sunny" />
    </template>
  </n-switch>
</template>

<style scoped></style>
