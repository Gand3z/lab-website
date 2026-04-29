<script setup lang="ts">
import type { Component } from 'vue'

defineProps<{
  icon: Component
  title: string
  description?: string
  buttonLabel: string
}>()

defineEmits<{
  action: []
}>()
</script>

<template>
  <div class="flex min-h-[70vh] flex-col items-center justify-center bg-[#f5f5f5] pt-32">
    <component :is="icon" class="mb-4 h-16 w-16 text-gray-300" />
    <h2 class="mb-2 text-2xl font-bold text-gray-600">{{ title }}</h2>
    <p v-if="description" class="mb-6 text-gray-400">{{ description }}</p>
    <button
      type="button"
      class="flex items-center gap-2 rounded-sm bg-[#003380] px-6 py-2 text-white transition-colors hover:bg-[#002255]"
      @click="$emit('action')"
    >
      <slot name="button-icon" />
      {{ buttonLabel }}
    </button>
  </div>
</template>
