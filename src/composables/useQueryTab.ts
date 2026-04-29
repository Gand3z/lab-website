import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export function useQueryTab<T extends string>(
  validTabs: readonly T[],
  fallbackTab: T,
  path: string,
) {
  const route = useRoute()
  const router = useRouter()

  const activeTab = computed<T>(() => {
    const tab = route.query.tab
    return typeof tab === 'string' && validTabs.includes(tab as T) ? (tab as T) : fallbackTab
  })

  async function setActiveTab(tabId: T) {
    await router.replace({ path, query: { tab: tabId } })
  }

  return {
    activeTab,
    setActiveTab,
  }
}
