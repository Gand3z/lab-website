<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeft, User } from 'lucide-vue-next'
import EmptyStatePanel from '../components/EmptyStatePanel.vue'
import PageBreadcrumb from '../components/PageBreadcrumb.vue'
import SideMenuCard from '../components/SideMenuCard.vue'
import { TEAM_DATA, type DetailField, type TeamGroup } from '../data/siteData'

const route = useRoute()
const router = useRouter()

const group = computed<TeamGroup | null>(() => {
  if (route.params.group === 'mentor' || route.params.group === 'member') {
    return route.params.group
  }

  return null
})

const currentPerson = computed(() => {
  if (!group.value) {
    return null
  }

  const personId = Number(route.params.id)
  return TEAM_DATA[group.value].find((person) => person.id === personId) ?? null
})

const currentCategoryTitle = computed(() => {
  if (group.value === 'mentor') {
    return '领衔导师'
  }

  if (group.value === 'member') {
    return '核心成员'
  }

  return ''
})

const menuConfig = [
  { id: 'mentor', title: '领衔导师', to: '/team?tab=mentor' },
  { id: 'member', title: '核心成员', to: '/team?tab=member' },
]

const detailSections: Array<{ title: string; field: DetailField }> = [
  { title: '个人简介', field: 'bio' },
  { title: '主持或参与项目', field: 'projects' },
  { title: '代表性奖励', field: 'awards' },
  { title: '代表性论文、著作', field: 'publications' },
  { title: '代表性专利', field: 'patents' },
]

const visibleDetailSections = computed(() => {
  if (!currentPerson.value) {
    return detailSections
  }

  const visibleSections = detailSections.filter((section) => {
    const items = currentPerson.value?.[section.field] ?? []
    return items.some((item: string) => item?.trim())
  })

  const publicationFirstNames = ['魏靖烜', '谭铖', '刘玉文']
  if (publicationFirstNames.includes(currentPerson.value.name)) {
    return [...visibleSections].sort((a, b) => {
      if (a.field === 'publications' && b.field === 'awards') return -1
      if (a.field === 'awards' && b.field === 'publications') return 1
      return detailSections.findIndex((section) => section.field === a.field) -
        detailSections.findIndex((section) => section.field === b.field)
    })
  }

  return visibleSections
})
</script>

<template>
  <EmptyStatePanel
    v-if="!currentPerson"
    :icon="User"
    title="未找到该成员信息"
    button-label="返回团队列表"
    @action="router.push('/team')"
  >
    <template #button-icon>
      <ArrowLeft class="h-4 w-4" />
    </template>
  </EmptyStatePanel>

  <div v-else class="min-h-screen bg-[linear-gradient(180deg,#f6faff_0%,#eef5ff_100%)] pb-16 pt-20">
    <PageBreadcrumb
      :items="[
        { label: '首页', to: '/' },
        { label: '研究队伍', to: '/team' },
        { label: currentCategoryTitle, to: `/team?tab=${group ?? 'mentor'}` },
        { label: currentPerson.name },
      ]"
    />

    <div class="mx-auto mt-10 flex max-w-[1320px] flex-col gap-8 px-4 md:flex-row md:px-8">
      <div class="w-full shrink-0 md:w-72">
        <SideMenuCard
          title="研究队伍"
          :items="menuConfig"
          :active-id="group ?? 'mentor'"
        />
      </div>

      <div class="min-h-[600px] flex-1">
        <div class="mb-8 rounded-[30px] border border-[#d8e6fb] bg-white p-6 shadow-[0_20px_44px_rgba(58,92,148,0.10)] md:p-10">
          <div class="flex flex-col-reverse gap-10 md:flex-row">
            <div class="flex flex-1 flex-col justify-center">
              <div class="mb-5 pb-4">
                <h1 class="mb-3 text-3xl font-bold text-[#0a2f72]">
                  {{ currentPerson.name }}
                </h1>
                <div class="mb-4 h-[3px] w-16 rounded-full bg-gradient-to-r from-[#0b4bb3] to-[#6ea6ff]" />
                <span class="text-[15px] font-medium text-[#163a78]">{{ currentPerson.title }}</span>
              </div>

              <div class="member-meta space-y-3 text-[14px] leading-relaxed text-slate-700">
                <div v-if="currentPerson.email" class="flex gap-2">
                  <span class="shrink-0 font-bold text-gray-900">电子邮箱:</span>
                  <span class="break-all">{{ currentPerson.email }}</span>
                </div>
                <div v-if="currentPerson.office" class="flex gap-2">
                  <span class="shrink-0 font-bold text-gray-900">通讯地址:</span>
                  <span class="break-all">{{ currentPerson.office }}</span>
                </div>
                <div v-if="currentPerson.homepage" class="flex gap-2">
                  <span class="shrink-0 font-bold text-gray-900">科研主页:</span>
                  <a
                    :href="currentPerson.homepage"
                    target="_blank"
                    rel="noreferrer"
                    class="break-all text-[#003380] hover:underline"
                  >
                    {{ currentPerson.homepage }}
                  </a>
                </div>
                <div v-if="currentPerson.researchDirection" class="flex gap-2">
                  <span class="shrink-0 font-bold text-gray-900">研究方向:</span>
                  <span>{{ currentPerson.researchDirection }}</span>
                </div>
              </div>
            </div>

            <div class="mx-auto w-48 shrink-0 md:mx-0">
              <div class="aspect-[3/4] overflow-hidden rounded-[22px] border border-[#d8e5f9] bg-[#f2f6fd] p-1 shadow-[0_12px_28px_rgba(70,103,158,0.10)]">
                <img :src="currentPerson.avatar" :alt="currentPerson.name" class="h-full w-full object-cover" />
              </div>
            </div>
          </div>
        </div>

        <div
          v-for="section in visibleDetailSections"
          :key="section.field"
          class="detail-section mb-8 rounded-[28px] border border-[#d8e6fb] bg-white p-6 shadow-[0_16px_34px_rgba(65,97,149,0.08)] md:p-10"
        >
          <div class="mb-6">
            <h3 class="text-xl font-bold text-[#0a2f72]">{{ section.title }}</h3>
            <div class="mt-3 h-[3px] w-14 rounded-full bg-gradient-to-r from-[#0b4bb3] to-[#6ea6ff]" />
          </div>
          <div class="text-justify font-serif text-[15px] leading-loose text-slate-700">
            <template v-if="currentPerson[section.field].length > 0">
              <p
                v-for="(item, index) in currentPerson[section.field]"
                :key="`${section.field}-${index}`"
                class="mb-4 indent-8"
              >
                {{ item }}
              </p>
            </template>
            <p v-else class="italic text-gray-400">暂无内容，等待补充</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.member-meta > div > span:first-child {
  color: #18315a;
}

.detail-section p {
  color: #475569;
}
</style>
