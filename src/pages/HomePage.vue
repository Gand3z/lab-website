<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { ArrowRight, BookOpen, FileText, GraduationCap, Users } from 'lucide-vue-next'
import HomeNewsPanel from '../components/HomeNewsPanel.vue'
import PageShell from '../components/PageShell.vue'
import {
  DYNAMIC_NEWS,
  LAB_INTRO,
  LAB_NAME,
  LAB_NEWS,
  RESEARCH_AREAS,
  TEAM_DATA,
} from '../data/siteData'

const currentSlide = ref(0)
const carouselNews = [LAB_NEWS[0], ...DYNAMIC_NEWS.slice(0, 2)]
const mentorFallbackAvatar = '/DaTou/DaoShi/unknown.png'
const leadingMentors = computed(() => TEAM_DATA.mentor)
const teamStats = [
  { label: '领衔导师', value: `${TEAM_DATA.mentor.length} 人`, icon: GraduationCap },
  { label: '核心成员', value: `${TEAM_DATA.member.length} 人`, icon: Users },
]

let timer: number | undefined

onMounted(() => {
  if (carouselNews.length <= 1) {
    return
  }

  timer = window.setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % carouselNews.length
  }, 4000)
})

onBeforeUnmount(() => {
  if (timer) {
    window.clearInterval(timer)
  }
})

function useFallbackAvatar(event: Event) {
  const image = event.target as HTMLImageElement
  if (image.src.endsWith(mentorFallbackAvatar)) {
    return
  }

  image.src = mentorFallbackAvatar
}
</script>

<template>
  <div class="home-page min-h-screen bg-[linear-gradient(180deg,#f6faff_0%,#eef5ff_100%)] pt-20">
    <section class="relative overflow-hidden border-b border-[#d6e6ff] bg-[linear-gradient(135deg,#f8fbff_0%,#eef5ff_52%,#f9fcff_100%)] py-8">
      <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(129,177,255,0.14),transparent_32%),radial-gradient(circle_at_82%_18%,rgba(255,255,255,0.92),transparent_26%)]" />
      <PageShell>
        <div class="relative flex flex-col gap-8 md:items-start md:flex-row">
          <div class="group relative aspect-[16/9] overflow-hidden rounded-[28px] border border-[#cfe0ff] bg-[#dfeafc] shadow-[0_24px_50px_rgba(52,93,160,0.16)] md:w-7/12">
            <RouterLink
              v-for="(news, idx) in carouselNews"
              :key="news.id"
              :to="`/news/${news.category}/${news.id}`"
              :class="[
                'absolute inset-0 block transition-opacity duration-1000',
                idx === currentSlide ? 'z-10 opacity-100' : 'z-0 opacity-0',
              ]"
            >
              <img
                :src="news.img"
                :alt="news.title"
                class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div class="absolute bottom-0 left-0 w-full bg-gradient-to-t from-[#031b49]/92 via-[#08377a]/62 to-transparent p-5 pt-20 md:p-7">
                <p class="truncate text-lg font-semibold tracking-[0.04em] text-white transition-colors group-hover:text-blue-100 md:text-[1.35rem]">
                  {{ news.title }}
                </p>
              </div>
            </RouterLink>

            <div class="absolute bottom-5 right-5 z-20 flex space-x-2.5 md:bottom-6 md:right-6">
              <button
                v-for="(_, idx) in carouselNews"
                :key="idx"
                type="button"
                :class="[
                  'h-2.5 w-2.5 rounded-full border border-white/35 transition-all duration-300',
                  idx === currentSlide ? 'scale-110 bg-white shadow-[0_0_0_4px_rgba(255,255,255,0.18)]' : 'bg-white/40 hover:bg-white/80',
                ]"
                @click="currentSlide = idx"
              />
            </div>
          </div>

          <div class="flex flex-col justify-center md:w-5/12">
            <h2 class="text-[1.8rem] font-bold leading-[1.28] tracking-[0.02em] text-[#0a2f72] md:text-[2rem]">
              {{ LAB_NAME }}
            </h2>
            <div class="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-[#0b4bb3] to-[#6ea6ff]" />
            <div class="mt-5 text-justify text-sm leading-loose text-slate-700 md:text-[15px]">
              <p class="mb-4 indent-8">
                {{ LAB_INTRO[0] }}
              </p>
              <p class="indent-8">{{ LAB_INTRO[1] }}</p>
            </div>
          </div>
        </div>
      </PageShell>
    </section>

    <section id="news" class="news-section border-t border-[#deebfa] bg-[linear-gradient(180deg,rgba(246,250,255,0.72),rgba(239,245,255,0.94))] py-10">
      <div class="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 gap-8 md:grid-cols-2 items-stretch">
          <HomeNewsPanel
            title="科研动态"
            :icon="BookOpen"
            more-to="/news?tab=dynamic"
            category="dynamic"
            :items="DYNAMIC_NEWS"
          />

          <HomeNewsPanel
            title="实验室新闻"
            :icon="FileText"
            more-to="/news?tab=lab"
            category="lab"
            :items="LAB_NEWS"
          />
        </div>
      </div>
    </section>

    <section id="team-preview" class="team-preview-section border-t border-[#deebfa] py-11">
      <div class="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
        <div class="section-heading mb-8 flex flex-col items-center">
          <h2 class="text-2xl font-bold tracking-wide text-gray-800">研究团队</h2>
          <div class="mt-3 h-[3px] w-16 bg-[#003380]" />
        </div>

        <div class="team-preview-panel grid gap-8 p-5 sm:p-7 lg:grid-cols-[0.9fr_1.65fr] lg:items-center lg:p-8">
          <div class="team-preview-intro flex h-full flex-col justify-center">
            <div class="mb-5 flex h-12 w-12 items-center justify-center rounded-[16px] bg-[linear-gradient(135deg,#0b4cad_0%,#2f6fcc_100%)] text-white shadow-[0_10px_20px_rgba(11,76,173,0.18)]">
              <Users class="h-5 w-5" />
            </div>
            <h3 class="text-[22px] font-bold leading-snug text-[#0a2f72]">
              汇聚多学科交叉力量
            </h3>
            <p class="mt-4 max-w-[34rem] text-justify text-[15px] leading-loose text-slate-600">
              团队面向多模态推理、算力优化、数据驱动和交叉领域应用，凝聚导师与青年成员协同推进模型、系统和场景落地研究。
            </p>

            <RouterLink
              to="/team"
              class="mt-6 inline-flex w-fit items-center gap-2 rounded-[14px] border border-[#0b4bb3]/30 bg-white px-5 py-2.5 text-sm font-semibold text-[#003b8f] shadow-[0_10px_22px_rgba(56,89,143,0.08)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#0b4bb3] hover:bg-[#f2f7ff]"
            >
              查看全部成员
              <ArrowRight class="h-4 w-4" />
            </RouterLink>

            <div class="team-stat-grid mt-7 grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-2">
              <div
                v-for="stat in teamStats"
                :key="stat.label"
                class="team-stat-item flex items-center gap-3 rounded-[18px] border border-[#d8e6fb] bg-[#f6f9ff] px-4 py-3"
              >
                <component :is="stat.icon" class="h-5 w-5 shrink-0 text-[#0b4bb3]" />
                <div class="min-w-0 flex-1">
                  <div class="text-[13px] font-medium leading-snug text-slate-500">{{ stat.label }}</div>
                  <div class="mt-1 text-[15px] font-bold leading-tight text-[#18315a]">{{ stat.value }}</div>
                </div>
              </div>
            </div>
          </div>

          <div class="mentor-preview-panel rounded-[24px] border border-[#dbe7f8] bg-white/88 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.78)] sm:p-6">
            <div class="mb-5 flex items-center justify-between gap-4">
              <div>
                <h3 class="text-[20px] font-bold text-[#0a2f72]">领衔导师</h3>
                <div class="mt-2 h-[2px] w-12 rounded-full bg-gradient-to-r from-[#0b4bb3] to-[#6ea6ff]" />
              </div>
              <span class="shrink-0 rounded-full border border-[#d8e6fb] bg-[#f6f9ff] px-3 py-1 text-xs font-semibold text-[#163a78]">
                {{ leadingMentors.length }} 位
              </span>
            </div>

            <div class="mentor-grid">
              <RouterLink
                v-for="person in leadingMentors"
                :key="person.id"
                :to="`/team/mentor/${person.id}`"
                class="mentor-card group flex min-w-0 flex-col items-center rounded-[18px] border border-[#d8e6fb] bg-[linear-gradient(180deg,#ffffff_0%,#f7faff_100%)] p-3 shadow-[0_10px_22px_rgba(70,103,158,0.07)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#bdd2f1] hover:shadow-[0_14px_28px_rgba(70,103,158,0.11)]"
              >
                <div class="mentor-avatar overflow-hidden rounded-[14px] border border-[#d8e5f9] bg-[#f2f6fd]">
                  <img
                    :src="person.avatar || mentorFallbackAvatar"
                    :alt="person.name"
                    class="mentor-avatar-image h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    @error="useFallbackAvatar"
                  />
                </div>
                <h4 class="mt-3 max-w-full truncate text-center text-[16px] font-bold text-[#18315a] transition-colors group-hover:text-[#003380]">
                  {{ person.name }}
                </h4>
                <p class="mt-1 text-center text-[12px] font-medium text-[#0b4bb3]">领衔导师</p>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section v-if="false" id="tasks" class="tasks-section border-t border-gray-200 bg-white py-12">
      <PageShell>
        <div class="section-heading mb-10 flex flex-col items-center">
          <h2 class="text-2xl font-bold tracking-wide text-gray-800">当前重点建设任务</h2>
          <div class="mt-3 h-[3px] w-16 bg-[#003380]" />
        </div>

        <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div
            v-for="(task, idx) in CURRENT_TASKS"
            :key="task.id"
            class="task-card cursor-pointer border border-gray-200 bg-[#fbfbfb] p-6 transition-colors hover:border-[#003380]/30"
            @click="selectedTask = task; isModalOpen = true"
          >
            <div class="mb-2 font-serif text-2xl font-bold text-[#003380] opacity-20">0{{ idx + 1 }}</div>
            <h3 class="mb-3 text-[16px] font-bold leading-snug text-gray-800">{{ task.title }}</h3>
            <p class="text-justify text-sm leading-relaxed text-gray-600">{{ task.desc }}</p>
          </div>
        </div>
      </PageShell>
    </section>

    <section id="research" class="research-section border-t border-gray-200 bg-[#f5f5f5] py-12">
      <PageShell>
        <div class="section-heading mb-10 flex flex-col items-center">
          <h2 class="text-2xl font-bold tracking-wide text-gray-800">核心研究方向</h2>
          <div class="mt-3 h-[3px] w-16 bg-[#003380]" />
        </div>

        <div class="grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
          <div v-for="area in RESEARCH_AREAS" :key="area.id" class="research-card flex gap-4">
            <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-sm bg-[#003380] text-white">
              <component :is="area.icon" class="h-5 w-5" />
            </div>
            <div>
              <h3 class="mb-2 text-[16px] font-bold text-gray-800">{{ area.title }}</h3>
              <p class="text-justify text-[13px] leading-relaxed text-gray-600">{{ area.desc }}</p>
            </div>
          </div>
        </div>
      </PageShell>
    </section>
  </div>

  <!-- Task Detail Modal -->
  <div v-if="false && isModalOpen" class="task-modal fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" @click="isModalOpen = false">
    <div class="task-modal-panel max-w-2xl rounded-2xl bg-white p-8 shadow-2xl" @click.stop>
      <div class="mb-6 flex items-center justify-between">
        <h3 class="text-2xl font-bold text-gray-800">{{ selectedTask?.title }}</h3>
        <button @click="isModalOpen = false" class="text-2xl text-gray-400 hover:text-gray-600 leading-none">×</button>
      </div>
      <div class="space-y-6">
        <div class="task-modal-block rounded-lg bg-gray-50 p-4">
          <h4 class="mb-2 font-semibold text-gray-700">负责人员</h4>
          <p class="text-gray-500">{{ selectedTask?.owner }}</p>
        </div>
        <div class="task-modal-block rounded-lg bg-gray-50 p-4">
          <h4 class="mb-2 font-semibold text-gray-700">详细内容</h4>
          <p class="text-justify leading-relaxed text-gray-600">{{ selectedTask?.detail }}</p>
        </div>
        <div v-if="false" class="task-modal-block rounded-lg bg-gray-50 p-4">
          <h4 class="mb-2 font-semibold text-gray-700">负责人员</h4>
          <p class="text-gray-500">暂无内容，等待补充</p>
        </div>
        <div v-if="false" class="task-modal-block rounded-lg bg-gray-50 p-4">
          <h4 class="mb-2 font-semibold text-gray-700">详细内容</h4>
          <p class="text-gray-500">暂无内容，等待补充</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tasks-section {
  border-top-color: #dbe7f8;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.82), rgba(242, 247, 255, 0.96));
}

.research-section {
  border-top-color: #dbe7f8;
  background: linear-gradient(180deg, rgba(246, 250, 255, 0.95), rgba(239, 245, 255, 1));
}

.team-preview-section {
  border-top-color: #dbe7f8;
  background: linear-gradient(180deg, rgba(239, 245, 255, 0.94), rgba(246, 250, 255, 0.98));
}

.section-heading h2 {
  color: #0a2f72;
  font-size: 1.95rem;
  font-weight: 700;
  letter-spacing: 0.04em;
}

.section-heading > div:last-child {
  margin-top: 1rem;
  height: 3px;
  width: 4rem;
  border-radius: 9999px;
  background: linear-gradient(90deg, #0b4bb3 0%, #6ea6ff 100%);
}

.task-card {
  border: 1px solid #d8e6fb;
  border-radius: 24px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(243, 248, 255, 0.96));
  box-shadow: 0 16px 34px rgba(65, 97, 149, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
}

.task-card:hover {
  border-color: #bfd3f1;
  box-shadow: 0 20px 38px rgba(65, 97, 149, 0.12);
  transform: translateY(-2px);
}

.task-card > div:first-child {
  color: #0b4bb3;
}

.task-card h3 {
  color: #18315a;
}

.task-card p {
  color: #475569;
}

.research-card {
  height: 100%;
  gap: 1rem;
  padding: 1.25rem;
  border: 1px solid #d8e6fb;
  border-radius: 24px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(244, 249, 255, 0.96));
  box-shadow: 0 14px 30px rgba(63, 96, 148, 0.08);
}

.research-card > div:first-child {
  border-radius: 14px;
  background: linear-gradient(135deg, #0b4cad 0%, #2f6fcc 100%);
  box-shadow: 0 10px 20px rgba(11, 76, 173, 0.18);
}

.research-card h3 {
  color: #18315a;
}

.research-card p {
  color: #475569;
}

.team-preview-panel {
  border: 1px solid #d8e6fb;
  border-radius: 28px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.99), rgba(247, 250, 255, 0.97));
  box-shadow: 0 20px 44px rgba(58, 92, 148, 0.1);
}

.team-stat-item {
  min-height: 4.5rem;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.72);
}

.team-stat-item > div:last-child {
  overflow-wrap: normal;
  word-break: keep-all;
}

.mentor-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
}

.mentor-card {
  flex: 0 1 calc((100% - 1rem) / 2);
  overflow: hidden;
}

.mentor-avatar {
  width: min(100%, 7.25rem);
  height: 6.75rem;
  margin-inline: auto;
}

.mentor-avatar-image {
  object-position: center top;
}

@media (min-width: 640px) {
  .mentor-card {
    flex-basis: calc((100% - 2rem) / 3);
  }
}

@media (min-width: 1024px) {
  .mentor-card {
    flex-basis: calc((100% - 3rem) / 4);
  }
}

@media (max-width: 360px) {
  .mentor-card {
    flex-basis: 100%;
  }

  .mentor-avatar {
    width: min(100%, 8rem);
  }
}

.task-modal {
  background: rgba(4, 25, 61, 0.4);
}

.task-modal-panel {
  border: 1px solid #d8e6fb;
  border-radius: 28px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(244, 249, 255, 0.98));
  box-shadow: 0 24px 52px rgba(26, 54, 104, 0.18);
}

.task-modal-panel h3 {
  color: #0a2f72;
}

.task-modal-panel button {
  color: #94a3b8;
}

.task-modal-panel button:hover {
  color: #0b4bb3;
}

.task-modal-block {
  border: 1px solid #dbe7f8;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.88);
  box-shadow: 0 8px 18px rgba(56, 89, 143, 0.05);
}

.task-modal-block h4 {
  color: #18315a;
}

.task-modal-block p {
  color: #64748b;
}

@media (max-width: 767px) {
  .section-heading h2 {
    font-size: 1.75rem;
    text-align: center;
  }

  .task-card,
  .research-card {
    border-radius: 22px;
  }

  .team-preview-panel {
    border-radius: 24px;
  }
}
</style>
