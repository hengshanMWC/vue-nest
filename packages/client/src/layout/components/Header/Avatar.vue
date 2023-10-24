<script lang="ts" setup>
import type { DropdownMixedOption } from 'naive-ui/es/dropdown/src/interface'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

enum OPTIONS_KEY {
  USER_INFO,
  LOGOUT,
}
const options: DropdownMixedOption[] = [
  {
    key: OPTIONS_KEY.USER_INFO,
    label: t('user-settings'),
  },
  {
    key: OPTIONS_KEY.LOGOUT,
    label: t('sign-out'),
  },
]
function handleSelect() {}
</script>

<template>
  <n-dropdown
    trigger="hover"
    :options="options"
    @select="handleSelect"
  >
    <n-avatar
      class="cursor-pointer"
      :size="38"
      color="transparent"
      round
      src="https://vue-nest.com/public/images/not_user_avatar.png"
    />
  </n-dropdown>
</template>

<style scoped></style>
