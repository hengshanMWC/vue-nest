<template>
  <n-switch size="large" v-model:value="active">
    <template #checked-icon>
      <n-icon :component="Moon" />
    </template>
    <template #unchecked-icon>
      <n-icon :component="Sunny" />
    </template>
  </n-switch>
</template>

<script lang="ts" setup>
import { Sunny, Moon } from '@vicons/ionicons5'
import { storeToRefs } from 'pinia';
import { useSettingStore } from '@/stores/modules/setting';
import { ENUM_THEME } from '@/constant';

const { themeRef } = storeToRefs(useSettingStore())
const active = ref<boolean>(!!themeRef)
watch(active, (value) => {
  themeRef.value = value ? ENUM_THEME.DARK : ENUM_THEME.DEFAULT
})
</script>

<style scoped></style>
