<script setup lang="ts">
import type { Component } from 'vue'
import Description from '~/components/ui/Description.vue'

defineProps<{
  title: string
  icon: Component
}>()
</script>

<template>
  <div class="flex items-top justify-center">
    <div class="text-center my-8 px-4 w-full max-w-7xl">

      <h1 class="font-bold text-4xl text-white mb-4 font-Julius tracking-widest uppercase flex items-center justify-center gap-4">
        <component :is="icon" class="size-10 shrink-0" :stroke-width="2" />
        {{ title }}
      </h1>

      <Description>
        <slot name="description" />
      </Description>

      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-1">
          <slot name="filter" />
        </div>
        <slot name="sort" />
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <slot />
      </div>

    </div>

    <slot name="lightbox" />
  </div>
</template>
