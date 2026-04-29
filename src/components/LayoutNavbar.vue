<script setup lang="ts">
import { ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { Menu, X } from 'lucide-vue-next'
import { LAB_NAME, LAB_SHORT_NAME, LOGO_SRC } from '../data/siteData'

const route = useRoute()
const isOpen = ref(false)
const logoError = ref(false)

watch(
  () => route.fullPath,
  () => {
    isOpen.value = false
  },
)

const navLinks = [
  { name: '首页', href: '/' },
  { name: '研究方向', href: '/#research' },
  { name: '重点任务', href: '/#tasks' },
  { name: '研究队伍', href: '/team' },
  { name: '新闻动态', href: '/news' },
]
const isActiveLink = (href: string) => {
  const [path, hashFragment] = href.split('#')

  if (hashFragment) {
    return route.path === path && route.hash === `#${hashFragment}`
  }

  if (path === '/') {
    return route.path === '/' && !route.hash
  }

  return route.path === path || route.path.startsWith(`${path}/`)
}
</script>

<template>
  <nav class="fixed inset-x-0 top-0 z-50 overflow-hidden border-b border-white/10 bg-gradient-to-r from-[#001b45] via-[#003380] to-[#0a4678] shadow-[0_10px_30px_rgba(1,18,48,0.22)]">
    <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.14),transparent_34%),radial-gradient(circle_at_85%_20%,rgba(120,190,255,0.10),transparent_28%)]" />
    <div class="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/25" />
    <div class="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.06),transparent)] opacity-70" />

    <div class="relative mx-auto flex h-20 max-w-[1200px] items-center justify-between px-4 md:px-8">
      <RouterLink to="/" class="flex items-center gap-4">
        <img
          v-if="!logoError"
          :src="LOGO_SRC"
          alt="Lab Logo"
          class="h-12 w-12 rounded-md border border-white/20 bg-white/95 p-1 object-contain shadow-[0_8px_20px_rgba(0,0,0,0.18)]"
          @error="logoError = true"
        />
        <div
          v-else
          class="flex h-12 w-12 items-center justify-center rounded-md border border-white/20 bg-white/95 font-serif text-2xl font-bold text-[#003380] shadow-[0_8px_20px_rgba(0,0,0,0.18)]"
        >
          {{ LAB_SHORT_NAME.charAt(0) }}
        </div>

        <div class="flex flex-col justify-center">
          <span class="text-[1.08rem] font-semibold tracking-[0.24em] text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.18)]">{{ LAB_NAME }}</span>
          <span class="mt-1 text-[11px] font-mono tracking-[0.28em] text-blue-100/80">
            {{ LAB_SHORT_NAME }}
          </span>
        </div>
      </RouterLink>

      <div class="hidden items-center gap-1 md:flex">
        <RouterLink
          v-for="link in navLinks.filter((link) => link.href !== '/#tasks')"
          :key="link.name"
          :to="link.href"
          :class="[
            'group relative inline-flex h-20 items-center px-4 text-[14px] font-medium tracking-[0.16em] text-white/86 transition-all duration-300 hover:text-white lg:px-5',
            isActiveLink(link.href) ? 'text-white' : '',
          ]"
        >
          {{ link.name }}
          <span
            :class="[
              'pointer-events-none absolute bottom-0 left-1/2 h-[3px] -translate-x-1/2 rounded-full bg-gradient-to-r from-[#7fc4ff] via-white to-[#7fc4ff] transition-all duration-300',
              isActiveLink(link.href) ? 'w-[54%] opacity-100 shadow-[0_0_12px_rgba(160,220,255,0.5)]' : 'w-0 opacity-0 group-hover:w-[36%] group-hover:opacity-70',
            ]"
          />
        </RouterLink>
      </div>

      <button
        type="button"
        class="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/8 text-white shadow-[0_8px_18px_rgba(0,0,0,0.16)] transition-colors hover:bg-white/14 md:hidden"
        @click="isOpen = !isOpen"
      >
        <X v-if="isOpen" class="text-white" />
        <Menu v-else class="text-white" />
      </button>
    </div>

    <div
      v-if="isOpen"
      class="absolute left-0 top-full flex w-full flex-col border-t border-white/10 bg-[linear-gradient(180deg,rgba(0,39,95,0.98),rgba(0,28,72,0.98))] shadow-[0_16px_30px_rgba(0,18,46,0.28)] backdrop-blur-sm md:hidden"
    >
      <RouterLink
        v-for="link in navLinks.filter((link) => link.href !== '/#tasks')"
        :key="link.name"
        :to="link.href"
        :class="[
          'border-b border-white/8 px-6 py-4 text-[14px] font-medium tracking-[0.14em] text-white/88 transition-colors hover:bg-white/8 hover:text-white',
          isActiveLink(link.href) ? 'bg-white/10 text-white' : '',
        ]"
      >
        {{ link.name }}
      </RouterLink>
    </div>
  </nav>
</template>
