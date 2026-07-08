<script setup lang="ts">
import type { Component } from 'vue'

defineProps<{
  title: string
  icon: Component
}>()
</script>

<template>
  <div class="flex items-top justify-center">
    <div class="text-center my-16 px-4 w-full max-w-7xl">

      <h1 class="font-bold text-4xl text-white mb-4 font-Julius tracking-widest uppercase flex items-center justify-center gap-4">
        <component :is="icon" class="size-10 shrink-0" :stroke-width="2" />
        {{ title }}
      </h1>

      <div class="text-left text-white mt-4 mb-16 indent-5 max-w-xl mx-auto [&>p]:mb-4">
        <slot name="description" />
      </div>

      <div class="flex justify-end mb-4">
        <slot name="sort" />
      </div>

      <div class="grid grid-cols-6 gap-4 mb-16">
        <slot />
      </div>

    </div>

    <slot name="lightbox" />
  </div>
</template>
