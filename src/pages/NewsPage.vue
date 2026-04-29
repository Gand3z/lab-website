<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import PageBreadcrumb from '../components/PageBreadcrumb.vue'
import SideMenuCard from '../components/SideMenuCard.vue'
import { useQueryTab } from '../composables/useQueryTab'
import { DYNAMIC_NEWS, LAB_NEWS, type NewsCategory } from '../data/siteData'

const PAGE_SIZE = 5

const menuConfig = [
  { id: 'dynamic' as const, title: '科研动态', data: DYNAMIC_NEWS },
  { id: 'lab' as const, title: '实验室新闻', data: LAB_NEWS },
]

const currentPage = ref(1)

const { activeTab, setActiveTab } = useQueryTab<NewsCategory>(
  ['dynamic', 'lab'],
  'dynamic',
  '/news',
)

const currentMenu = computed(
  () => menuConfig.find((menu) => menu.id === activeTab.value) ?? menuConfig[0],
)

const sortedNews = computed(() =>
  [...currentMenu.value.data].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
)

const totalPages = computed(() => Math.max(1, Math.ceil(sortedNews.value.length / PAGE_SIZE)))

const pagedNews = computed(() => {
  const start = (currentPage.value - 1) * PAGE_SIZE
  return sortedNews.value.slice(start, start + PAGE_SIZE)
})

const pageNumbers = computed(() => Array.from({ length: totalPages.value }, (_, index) => index + 1))

watch(activeTab, () => {
  currentPage.value = 1
})

watch(totalPages, (pages) => {
  if (currentPage.value > pages) {
    currentPage.value = pages
  }
})

async function handleTabSelect(tab: NewsCategory) {
  currentPage.value = 1
  await setActiveTab(tab)
}

function goToPage(page: number) {
  if (page < 1 || page > totalPages.value) {
    return
  }

  currentPage.value = page
}
</script>

<template>
  <div class="min-h-screen bg-[linear-gradient(180deg,#f6faff_0%,#eef5ff_100%)] pb-16 pt-20">
    <PageBreadcrumb
      :items="[
        { label: '首页', to: '/' },
        { label: '新闻动态' },
        { label: currentMenu.title },
      ]"
    />

    <div class="mx-auto mt-10 flex max-w-[1320px] min-w-0 flex-col gap-8 px-4 md:flex-row md:px-8">
      <div class="w-full shrink-0 md:w-72">
        <SideMenuCard
          title="新闻动态"
          :items="menuConfig"
          :active-id="activeTab"
          @select="handleTabSelect($event as NewsCategory)"
        />
      </div>

      <div class="flex min-w-0 flex-1 flex-col overflow-hidden rounded-[30px] border border-[#d8e6fb] bg-white p-6 shadow-[0_20px_44px_rgba(58,92,148,0.10)] md:p-10">
        <div class="mb-7 flex flex-col items-start">
          <h2 class="text-[1.95rem] font-bold text-[#0a2f72]">{{ currentMenu.title }}</h2>
          <div class="mt-4 h-[3px] w-16 rounded-full bg-gradient-to-r from-[#0b4bb3] to-[#6ea6ff]" />
        </div>

        <ul class="flex w-full min-w-0 flex-col gap-3">
          <li
            v-for="news in pagedNews"
            :key="news.id"
            class="w-full max-w-full overflow-hidden rounded-[18px] border border-[#d8e6fb] bg-[linear-gradient(180deg,#ffffff_0%,#f6f9ff_100%)] shadow-[0_8px_20px_rgba(70,103,158,0.05)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#bdd2f1] hover:shadow-[0_12px_24px_rgba(70,103,158,0.09)]"
          >
            <RouterLink
              :to="`/news/${currentMenu.id}/${news.id}`"
              class="group flex w-full max-w-full min-w-0 cursor-pointer flex-col gap-2 overflow-hidden px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div class="flex min-w-0 flex-1 items-center gap-3 overflow-hidden">
                <span class="h-2 w-2 shrink-0 rounded-full bg-[#7fa8df] transition-colors group-hover:bg-[#0b4fb4]" />
                <span class="block min-w-0 overflow-hidden text-ellipsis whitespace-nowrap text-[15px] font-semibold leading-relaxed text-[#18315a] transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-[#003380]">
                  {{ news.title }}
                </span>
              </div>
              <span class="min-w-[88px] shrink-0 text-right text-sm font-mono text-slate-500 transition-colors group-hover:text-[#003380]">
                {{ news.date }}
              </span>
            </RouterLink>
          </li>

          <li v-if="pagedNews.length === 0" class="list-none py-20 text-center text-gray-400">
            暂无数据
          </li>
        </ul>

        <div class="mt-10 flex flex-wrap justify-center gap-2">
          <button
            type="button"
            :disabled="currentPage === 1"
            class="rounded-[12px] border px-4 py-2 text-sm transition-all duration-300"
            :class="
              currentPage === 1
                ? 'cursor-not-allowed border-[#d8e6fb] bg-[#f4f8ff] text-slate-400'
                : 'border-[#d8e6fb] bg-white text-slate-600 hover:border-[#bdd2f1] hover:bg-[#eef5ff] hover:text-[#003380]'
            "
            @click="goToPage(currentPage - 1)"
          >
            上一页
          </button>
          <button
            v-for="page in pageNumbers"
            :key="page"
            type="button"
            class="rounded-[12px] border px-4 py-2 text-sm font-medium transition-all duration-300"
            :class="
              page === currentPage
                ? 'border-[#003b8f] bg-[#003b8f] text-white shadow-[0_8px_18px_rgba(0,59,143,0.18)]'
                : 'border-[#d8e6fb] bg-white text-slate-600 hover:border-[#bdd2f1] hover:bg-[#eef5ff] hover:text-[#003380]'
            "
            @click="goToPage(page)"
          >
            {{ page }}
          </button>
          <button
            type="button"
            :disabled="currentPage === totalPages"
            class="rounded-[12px] border px-4 py-2 text-sm transition-all duration-300"
            :class="
              currentPage === totalPages
                ? 'cursor-not-allowed border-[#d8e6fb] bg-[#f4f8ff] text-slate-400'
                : 'border-[#d8e6fb] bg-white text-slate-600 hover:border-[#bdd2f1] hover:bg-[#eef5ff] hover:text-[#003380]'
            "
            @click="goToPage(currentPage + 1)"
          >
            下一页
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
