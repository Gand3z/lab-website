<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import PageBreadcrumb from '../components/PageBreadcrumb.vue'
import SideMenuCard from '../components/SideMenuCard.vue'
import { useQueryTab } from '../composables/useQueryTab'
import { TEAM_DATA, type TeamGroup } from '../data/siteData'

const MEMBERS_PER_PAGE = 8

const menuConfig = [
  { id: 'mentor' as const, title: '领衔导师', data: TEAM_DATA.mentor },
  { id: 'member' as const, title: '核心成员', data: TEAM_DATA.member },
]

const currentMemberPage = ref(1)

const { activeTab, setActiveTab } = useQueryTab<TeamGroup>(
  ['mentor', 'member'],
  'mentor',
  '/team',
)
const currentMenu = computed(
  () => menuConfig.find((menu) => menu.id === activeTab.value) ?? menuConfig[0],
)

const isMemberTab = computed(() => activeTab.value === 'member')

const totalMemberPages = computed(() =>
  Math.max(1, Math.ceil(TEAM_DATA.member.length / MEMBERS_PER_PAGE)),
)

const memberPageNumbers = computed(() =>
  Array.from({ length: totalMemberPages.value }, (_, index) => index + 1),
)

const displayedPeople = computed(() => {
  if (!isMemberTab.value) {
    return currentMenu.value.data
  }

  const start = (currentMemberPage.value - 1) * MEMBERS_PER_PAGE
  return TEAM_DATA.member.slice(start, start + MEMBERS_PER_PAGE)
})

watch(activeTab, () => {
  currentMemberPage.value = 1
})

watch(totalMemberPages, (pages) => {
  if (currentMemberPage.value > pages) {
    currentMemberPage.value = pages
  }
})

async function handleTabSelect(tab: TeamGroup) {
  currentMemberPage.value = 1
  await setActiveTab(tab)
}

function goToMemberPage(page: number) {
  if (page < 1 || page > totalMemberPages.value) {
    return
  }

  currentMemberPage.value = page
}
</script>

<template>
  <div class="min-h-screen bg-[linear-gradient(180deg,#f6faff_0%,#eef5ff_100%)] pb-16 pt-20">
    <PageBreadcrumb
      :items="[
        { label: '首页', to: '/' },
        { label: '研究队伍' },
        { label: currentMenu.title },
      ]"
    />

    <div class="mx-auto mt-10 flex max-w-[1320px] flex-col gap-8 px-4 md:flex-row md:px-8">
      <div class="w-full shrink-0 md:w-72">
        <SideMenuCard
          title="研究队伍"
          :items="menuConfig"
          :active-id="activeTab"
          @select="handleTabSelect($event as TeamGroup)"
        />
      </div>

      <div class="min-h-[500px] flex-1 rounded-[30px] border border-[#d8e6fb] bg-white p-6 shadow-[0_20px_44px_rgba(58,92,148,0.10)] md:p-10">
        <div class="mb-8 flex flex-col items-center md:items-start">
          <h2 class="text-[1.95rem] font-bold text-[#0a2f72]">{{ currentMenu.title }}</h2>
          <div class="mt-4 h-[3px] w-16 rounded-full bg-gradient-to-r from-[#0b4bb3] to-[#6ea6ff]" />
        </div>

        <div class="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:gap-6">
          <RouterLink
            v-for="person in displayedPeople"
            :key="person.id"
            :to="`/team/${currentMenu.id}/${person.id}`"
            class="group flex cursor-pointer flex-col items-center rounded-[22px] border border-[#d8e6fb] bg-[linear-gradient(180deg,#ffffff_0%,#f6f9ff_100%)] p-4 shadow-[0_12px_28px_rgba(70,103,158,0.08)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#bdd2f1] hover:shadow-[0_16px_32px_rgba(70,103,158,0.12)]"
          >
            <div class="relative mb-4 aspect-[3/4] w-full overflow-hidden rounded-[18px] border border-[#d8e5f9] bg-[#f2f6fd] shadow-[inset_0_1px_0_rgba(255,255,255,0.72)]">
              <img
                :src="person.avatar"
                :alt="person.name"
                class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div class="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/5" />
            </div>
            <h4 class="text-center text-[18px] font-bold text-[#18315a] transition-colors group-hover:text-[#003380]">
              {{ person.name }}
            </h4>
          </RouterLink>

          <div v-if="displayedPeople.length === 0" class="col-span-full py-20 text-center text-gray-400">
            暂无成员数据
          </div>
        </div>

        <div v-if="isMemberTab && totalMemberPages > 1" class="mt-10 flex flex-wrap justify-center gap-2">
          <button
            type="button"
            :disabled="currentMemberPage === 1"
            class="rounded-[12px] border px-4 py-2 text-sm transition-all duration-300"
            :class="
              currentMemberPage === 1
                ? 'cursor-not-allowed border-[#d8e6fb] bg-[#f4f8ff] text-slate-400'
                : 'border-[#d8e6fb] bg-white text-slate-600 hover:border-[#bdd2f1] hover:bg-[#eef5ff] hover:text-[#003380]'
            "
            @click="goToMemberPage(currentMemberPage - 1)"
          >
            上一页
          </button>
          <button
            v-for="page in memberPageNumbers"
            :key="page"
            type="button"
            class="rounded-[12px] border px-4 py-2 text-sm font-medium transition-all duration-300"
            :class="
              page === currentMemberPage
                ? 'border-[#003b8f] bg-[#003b8f] text-white shadow-[0_8px_18px_rgba(0,59,143,0.18)]'
                : 'border-[#d8e6fb] bg-white text-slate-600 hover:border-[#bdd2f1] hover:bg-[#eef5ff] hover:text-[#003380]'
            "
            @click="goToMemberPage(page)"
          >
            {{ page }}
          </button>
          <button
            type="button"
            :disabled="currentMemberPage === totalMemberPages"
            class="rounded-[12px] border px-4 py-2 text-sm transition-all duration-300"
            :class="
              currentMemberPage === totalMemberPages
                ? 'cursor-not-allowed border-[#d8e6fb] bg-[#f4f8ff] text-slate-400'
                : 'border-[#d8e6fb] bg-white text-slate-600 hover:border-[#bdd2f1] hover:bg-[#eef5ff] hover:text-[#003380]'
            "
            @click="goToMemberPage(currentMemberPage + 1)"
          >
            下一页
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
