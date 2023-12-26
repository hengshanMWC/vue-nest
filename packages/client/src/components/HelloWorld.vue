<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>

<template>
  <div class="greetings">
    <h1 class="green">
      {{ msg }}
    </h1>
    <h3>
      {{ $t('demo.youve-successfully-created-a-project-with') }}
      <a href="https://vitejs.dev/" target="_blank" rel="noopener">Vite</a> +
      <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a> +
      <a href="https://www.mysql.com/" target="_blank" rel="noopener">MySQL</a>
      + <a href="https://nestjs.com/" target="_blank" rel="noopener">NestJs</a>.
      {{ $t('demo.whats-next') }}
    </h3>
  </div>
</template>

<style scoped>
h1 {
  position: relative;
  top: -10px;
  font-size: 2.6rem;
  font-weight: 500;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (width >= 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
