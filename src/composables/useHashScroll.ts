import { watch } from 'vue'
import { useRoute } from 'vue-router'

export function useHashScroll() {
  const route = useRoute()

  watch(
    () => route.fullPath,
    () => {
      if (route.hash) {
        window.setTimeout(() => {
          const element = document.getElementById(route.hash.replace('#', ''))
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
          }
        }, 100)
        return
      }

      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    { immediate: true },
  )
}
