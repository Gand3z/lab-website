<script setup lang="ts">
defineProps<{
  sidebar?: boolean
}>()
</script>

<template>
  <div class="mx-auto mt-10 max-w-[1200px] px-4 md:px-8">
    <div :class="sidebar ? 'flex flex-col gap-8 md:flex-row' : ''">
      <slot />
    </div>
  </div>
</template>
