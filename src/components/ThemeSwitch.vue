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
import { ref, watch } from 'vue'
import { Sunny, Moon } from '@vicons/ionicons5'
import { storeToRefs } from 'pinia';
import type { CSSProperties } from 'vue';
import { useSettingStore } from '@/stores/modules/setting';
import { ENUM_THEME } from '@/constant';

const { themeRef } = storeToRefs(useSettingStore())
const active = ref<boolean>(!!themeRef)
watch(active, (value) => {
  themeRef.value = value ? ENUM_THEME.DARK : ENUM_THEME.DEFAULT
  console.log('themeRef.value', themeRef.value)
})

function railStyle({
  focused,
  checked
}: {
  focused: boolean
  checked: boolean
}) {
  const style: CSSProperties = {}
  if (checked) {
    style.background = '#d03050'
    if (focused) {
      style.boxShadow = '0 0 0 2px #d0305040'
    }
  } else {
    style.background = '#2080f0'
    if (focused) {
      style.boxShadow = '0 0 0 2px #2080f040'
    }
  }
  return style
}
</script>

<style scoped></style>
