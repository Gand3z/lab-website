<script setup lang="ts">
import { RouterView } from 'vue-router'
import LayoutFooter from './components/LayoutFooter.vue'
import LayoutNavbar from './components/LayoutNavbar.vue'
import { useHashScroll } from './composables/useHashScroll'

useHashScroll()
</script>

<template>
  <div class="flex min-h-screen flex-col bg-white font-sans text-slate-900 selection:bg-[#003380] selection:text-white">
    <LayoutNavbar />
    <main class="flex-grow">
      <RouterView />
    </main>
    <LayoutFooter />
  </div>
</template>
