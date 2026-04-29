<script setup lang="ts">
import { RouterLink } from 'vue-router'

type SideMenuItem = {
  id: string
  title: string
  to?: string
}

const props = defineProps<{
  title: string
  items: SideMenuItem[]
  activeId: string
}>()

const emit = defineEmits<{
  select: [id: string]
}>()
</script>

<template>
  <div class="overflow-hidden rounded-[28px] border border-[#d8e6fb] bg-white shadow-[0_18px_40px_rgba(58,92,148,0.10)]">
    <div class="bg-gradient-to-r from-[#003b8f] to-[#0b4fb4] px-6 py-5 text-lg font-bold text-white">
      {{ title }}
    </div>

    <div class="flex gap-2 overflow-x-auto bg-[linear-gradient(180deg,#ffffff_0%,#f6f9ff_100%)] p-3 md:flex-col">
      <template v-for="item in props.items" :key="item.id">
        <RouterLink
          v-if="item.to"
          :to="item.to"
          :class="[
            'block flex-1 whitespace-nowrap rounded-[16px] border px-5 py-3.5 text-center text-[15px] transition-all duration-300 outline-none md:w-full md:text-left',
            props.activeId === item.id
              ? 'border-[#bdd2f1] bg-[#eef5ff] font-bold text-[#003380] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]'
              : 'border-transparent text-slate-700 hover:border-[#d8e6fb] hover:bg-white hover:text-[#003380]',
          ]"
        >
          {{ item.title }}
        </RouterLink>

        <button
          v-else
          type="button"
          :class="[
            'flex-1 whitespace-nowrap rounded-[16px] border px-5 py-3.5 text-center text-[15px] transition-all duration-300 outline-none md:w-full md:text-left',
            props.activeId === item.id
              ? 'border-[#bdd2f1] bg-[#eef5ff] font-bold text-[#003380] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]'
              : 'border-transparent text-slate-700 hover:border-[#d8e6fb] hover:bg-white hover:text-[#003380]',
          ]"
          @click="emit('select', item.id)"
        >
          {{ item.title }}
        </button>
      </template>
    </div>
  </div>
</template>
