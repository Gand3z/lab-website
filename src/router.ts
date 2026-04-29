import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './pages/HomePage.vue'
import NewsDetailPage from './pages/NewsDetailPage.vue'
import NewsPage from './pages/NewsPage.vue'
import TeamMemberDetailPage from './pages/TeamMemberDetailPage.vue'
import TeamPage from './pages/TeamPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomePage },
    { path: '/team', component: TeamPage },
    { path: '/team/:group/:id', component: TeamMemberDetailPage },
    { path: '/news', component: NewsPage },
    { path: '/news/:category/:id', component: NewsDetailPage },
  ],
})

export default router
