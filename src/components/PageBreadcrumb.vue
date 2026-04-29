<script setup lang="ts">
import { ChevronRight } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'

type BreadcrumbItem = {
  label: string
  to?: string
}

defineProps<{
  items: BreadcrumbItem[]
}>()
</script>

<template>
  <div class="border-b border-[#deebfa] bg-white/92 py-4 shadow-[0_10px_24px_rgba(58,92,148,0.06)] backdrop-blur-sm">
    <div class="mx-auto flex max-w-[1320px] items-center overflow-hidden whitespace-nowrap px-4 text-[14px] text-slate-500 md:px-8">
      <template v-for="(item, index) in items" :key="`${item.label}-${index}`">
        <ChevronRight
          v-if="index > 0"
          class="mx-1 h-4 w-4 shrink-0 text-[#8aa7d2]"
        />

        <RouterLink
          v-if="item.to"
          :to="item.to"
          class="shrink-0 transition-colors hover:text-[#003380]"
        >
          {{ item.label }}
        </RouterLink>

        <span
          v-else
          :class="index === items.length - 1 ? 'truncate font-semibold text-[#003380]' : 'font-medium text-[#18315a]'"
        >
          {{ item.label }}
        </span>
      </template>
    </div>
  </div>
</template>
