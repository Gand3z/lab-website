<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeft, FileText } from 'lucide-vue-next'
import EmptyStatePanel from '../components/EmptyStatePanel.vue'
import PageBreadcrumb from '../components/PageBreadcrumb.vue'
import SideMenuCard from '../components/SideMenuCard.vue'
import { NEWS_BY_CATEGORY, type NewsCategory } from '../data/siteData'

const route = useRoute()
const router = useRouter()

const category = computed<NewsCategory | null>(() => {
  if (route.params.category === 'dynamic' || route.params.category === 'lab') {
    return route.params.category
  }

  return null
})

const currentNews = computed(() => {
  if (!category.value) {
    return null
  }

  const newsId = Number(route.params.id)
  return NEWS_BY_CATEGORY[category.value].find((news) => news.id === newsId) ?? null
})

const currentCategoryTitle = computed(() => {
  if (category.value === 'dynamic') {
    return '科研动态'
  }

  if (category.value === 'lab') {
    return '实验室新闻'
  }

  return ''
})

const menuConfig = [
  { id: 'dynamic', title: '科研动态', to: '/news?tab=dynamic' },
  { id: 'lab', title: '实验室新闻', to: '/news?tab=lab' },
]
</script>

<template>
  <EmptyStatePanel
    v-if="!currentNews"
    :icon="FileText"
    title="未找到该新闻内容"
    description="您访问的链接可能已经失效或被移除。"
    button-label="返回新闻列表"
    @action="router.push('/news')"
  >
    <template #button-icon>
      <ArrowLeft class="h-4 w-4" />
    </template>
  </EmptyStatePanel>

  <div v-else class="min-h-screen bg-[linear-gradient(180deg,#f6faff_0%,#eef5ff_100%)] pb-16 pt-20">
    <PageBreadcrumb
      :items="[
        { label: '首页', to: '/' },
        { label: '新闻动态', to: '/news' },
        { label: currentCategoryTitle, to: `/news?tab=${category ?? 'dynamic'}` },
        { label: currentNews.title },
      ]"
    />

    <div class="mx-auto mt-10 flex max-w-[1320px] flex-col gap-8 px-4 md:flex-row md:px-8">
      <div class="w-full shrink-0 md:w-72">
        <SideMenuCard
          title="新闻动态"
          :items="menuConfig"
          :active-id="category ?? 'dynamic'"
        />
      </div>

      <article class="min-h-[600px] flex-1 rounded-[30px] border border-[#d8e6fb] bg-white p-6 shadow-[0_20px_44px_rgba(58,92,148,0.10)] md:p-12">
        <div class="mb-8 border-b border-[#dbe7f8] pb-7 text-center">
          <h1 class="mx-auto mb-4 max-w-4xl text-2xl font-bold leading-tight text-[#0a2f72] md:text-[28px]">
            {{ currentNews.title }}
          </h1>
          <div class="mx-auto mb-5 h-[3px] w-16 rounded-full bg-gradient-to-r from-[#0b4bb3] to-[#6ea6ff]" />
          <div class="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm font-mono text-slate-500">
            <span>发布时间：{{ currentNews.date }}</span>
            <span>分类：{{ currentCategoryTitle }}</span>
          </div>
        </div>

        <div class="text-justify font-serif text-[16px] leading-loose text-slate-700">
          <p
            v-for="(paragraph, index) in currentNews.content"
            :key="index"
            class="mb-5 indent-8"
          >
            {{ paragraph }}
          </p>

          <div v-if="currentNews.qrCode" class="my-8 flex flex-col items-center rounded-[24px] border border-dashed border-[#bdd2f1] bg-[#f6f9ff] px-6 py-8">
            <img
              :src="currentNews.qrCode.src"
              :alt="currentNews.qrCode.alt"
              class="w-full max-w-[260px] rounded-[18px] border border-[#d8e5f9] bg-white p-2 shadow-[0_12px_28px_rgba(70,103,158,0.08)]"
            />
            <span v-if="currentNews.qrCode.caption" class="mt-3 text-sm text-slate-500">
              {{ currentNews.qrCode.caption }}
            </span>
          </div>

          <div v-if="currentNews.img" class="my-8 flex flex-col items-center">
            <img
              :src="currentNews.img"
              alt="新闻配图"
              class="max-w-full rounded-[22px] border border-[#d8e5f9] bg-white p-1 shadow-[0_12px_28px_rgba(70,103,158,0.08)] md:max-w-[80%]"
            />
            <span class="mt-2 text-xs text-slate-500"></span>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>
