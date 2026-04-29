<script setup lang="ts">
import { MapPin, Target } from 'lucide-vue-next'
import { INSTITUTION_FULL, LAB_NAME } from '../data/siteData'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="mt-auto border-t-4 border-[#00112b] bg-[#011B60] py-10 text-gray-300">
    <div class="mx-auto grid max-w-[1200px] grid-cols-1 gap-8 px-4 md:grid-cols-2 md:px-8">
      <div class="flex flex-col items-center justify-center">
        <img src="/校徽.png" alt="校徽" class="w-333 h-auto object-contain" />
      </div>

      <div class="flex items-center justify-start gap-10">
        <div class="flex flex-col justify-center gap-3">
          <div class="flex items-center gap-2 whitespace-nowrap text-sm">
            <MapPin class="h-4 w-4 shrink-0 text-blue-400" />
            <span>山东省济南市长清区齐鲁工业大学 3501 号</span>
          </div>

          <div class="flex items-center gap-2 whitespace-nowrap text-sm">
            <Target class="h-4 w-4 shrink-0 text-blue-400" />
            <span>邮编: 250353</span>
          </div>
        </div>

        <div class="flex gap-6">
          <div class="flex flex-col items-center shrink-0">
            <div class="h-24 w-24 overflow-hidden rounded border border-blue-400">
              <img src="/ZhangHao/公众号.jpg" alt="微信公众号" class="h-full w-full object-cover" />
            </div>
            <span class="mt-2 text-sm text-blue-200">公众号</span>
          </div>
          <div class="flex flex-col items-center shrink-0">
            <div class="h-24 w-24 overflow-hidden rounded border border-blue-400">
              <img src="/ZhangHao/小红书.png" alt="小红书" class="h-full w-full object-cover" />
            </div>
            <span class="mt-2 text-sm text-blue-200">小红书</span>
          </div>
        </div>
      </div>
    </div>

    <div class="mx-auto mt-8 max-w-[1200px] border-t border-[#003380]/50 px-4 pt-6 text-center text-xs text-blue-300 md:px-8">
      版权所有 © {{ year }} {{ INSTITUTION_FULL }} {{ LAB_NAME }}。保留所有权利。
    </div>
  </footer>
</template>