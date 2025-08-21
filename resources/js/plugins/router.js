import { createRouter, createWebHistory } from 'vue-router'

// Import pages
import Login from '../pages/Login.vue'
import Dashboard from '../pages/Dashboard.vue'
import TalentType from '../pages/TalentType.vue'

const routes = [
  { path: '/', name: 'Login', component: Login },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/talent-type', name: 'TalentType', component: TalentType },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
