<script lang="ts" setup>
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-white/20 bg-green-900 mt-auto py-12">
    <div class="flex flex-col items-center gap-0 text-white/70">
      <p class="mb-2">2006 - {{ currentYear }} © Sentimony Records</p>
      <p class="mb-2">All Rights Reserved</p>
      <img
        src="/assets/img/svg-icons/sentimony-records-logo-v3.2.svg?01"
        alt="Sentimony Records"
        width="32"
        height="32"
        class="opacity-80"
      />
    </div>
  </footer>
</template>

<style></style>
