<script lang="ts" setup>
import { useHead } from '@unhead/vue'
import AppHeader from '~/components/AppHeader.vue'
import AppFooter from '~/components/AppFooter.vue'

useHead({
  titleTemplate: '%s · Digital Keeper',
})
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader />
    <main class="flex-1 flex flex-col">
      <RouterView />
    </main>
    <AppFooter />
  </div>
</template>
