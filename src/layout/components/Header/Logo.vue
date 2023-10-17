<template>
	<n-icon @click="handleHome" class="cursor-pointer" size="30" title="Vue-Next">
		<LogoSvg></LogoSvg>
	</n-icon>
</template>

<script lang="ts" setup>
import LogoSvg from '@/assets/images/logo.svg'
import { useRouter } from 'vue-router'
const router = useRouter()
function handleHome() {
	router.push({
		name: 'home'
	})
}
</script>

<style scoped></style>
