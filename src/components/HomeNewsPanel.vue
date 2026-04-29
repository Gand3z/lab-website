<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import type { Component } from 'vue'
import type { NewsItem } from '../data/siteData'

const props = defineProps<{
  title: string
  icon: Component
  moreTo: string
  category: string
  items: NewsItem[]
}>()

const sortedItems = computed(() => [...props.items].sort((a, b) => {
  const dateA = new Date(a.date).getTime()
  const dateB = new Date(b.date).getTime()
  return dateB - dateA
}))
const featuredItem = computed(() => sortedItems.value.find((news) => news.isFeatured) ?? null)
const regularItems = computed(() => sortedItems.value.filter((news) => !news.isFeatured).slice(0, 3))
</script>

<template>
  <div class="flex h-full flex-col rounded-[28px] border border-[#d8e6fb] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(245,249,255,0.96))] p-8 shadow-[0_20px_44px_rgba(58,92,148,0.10)]">
    <div class="relative mb-6 flex items-end justify-between border-b border-[#dce8f8] pb-4">
      <h3 class="flex items-center gap-3 text-[24px] font-bold tracking-[0.03em] text-[#0a3377]">
        <component :is="icon" class="h-5 w-5 text-[#0a3377]" />
        {{ title }}
      </h3>
      <RouterLink
        :to="moreTo"
        class="inline-flex items-center rounded-full border border-[#d5e3f8] bg-white/80 px-3 py-1.5 text-sm font-medium text-slate-500 shadow-[0_6px_16px_rgba(15,23,42,0.04)] transition-all duration-300 hover:border-[#a9c4ee] hover:text-[#003380] hover:shadow-[0_10px_20px_rgba(56,89,143,0.08)]"
      >
        查看更多
      </RouterLink>
      <span class="pointer-events-none absolute bottom-0 left-0 h-[2px] w-20 rounded-full bg-gradient-to-r from-[#0b4cad] to-[#78adff]" />
    </div>

    <div class="flex flex-col gap-5">
      <template v-if="featuredItem">
        <RouterLink
          :to="`/news/${category}/${featuredItem.id}`"
          class="group overflow-hidden rounded-[22px] border border-[#d9e6f8] bg-[linear-gradient(180deg,rgba(248,251,255,0.98),rgba(240,246,255,0.96))] shadow-[0_12px_28px_rgba(70,103,158,0.08)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_32px_rgba(70,103,158,0.12)]"
        >
          <div class="flex flex-col gap-4 p-6 md:flex-row md:items-center md:gap-6">
            <div class="aspect-video w-full flex-shrink-0 overflow-hidden rounded-[18px] border border-[#d8e5f9] bg-white md:w-2/5">
              <img
                v-if="featuredItem.img"
                :src="featuredItem.img"
                :alt="featuredItem.title"
                class="h-full w-full object-cover"
              />
            </div>
            <div class="flex min-w-0 flex-1 flex-col justify-center">
              <h4 class="line-clamp-2 whitespace-normal break-words text-[20px] font-bold leading-tight text-[#18315a] transition-colors duration-200 group-hover:text-[#003380]">
                {{ featuredItem.title }}
              </h4>
              <div class="mt-4 text-sm font-medium text-slate-400">{{ featuredItem.date }}</div>
            </div>
          </div>
        </RouterLink>
      </template>

      <ul class="space-y-3">
        <li
          v-for="news in regularItems"
          :key="news.id"
          class="group rounded-[18px] border border-[#d7e4f7] bg-[#f4f8ff] shadow-[inset_0_1px_0_rgba(255,255,255,0.72)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#bdd2f1] hover:shadow-[0_10px_22px_rgba(79,112,167,0.08)]"
        >
          <RouterLink
            :to="`/news/${category}/${news.id}`"
            class="flex cursor-pointer items-center justify-between gap-3 px-4 py-3"
          >
            <span class="truncate text-[15px] font-semibold text-[#233658] transition-colors duration-200 group-hover:text-[#003380]">
              {{ news.title }}
            </span>
            <span class="shrink-0 text-[13px] font-mono text-slate-400">{{ news.date }}</span>
          </RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>
