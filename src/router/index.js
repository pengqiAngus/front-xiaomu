import { createRouter, createWebHistory } from 'vue-router'
import { isMobileTerminal } from '../utils/flexible'
import mobileRoutes from './modules/mobile-routes'
import pcRoutes from './modules/pc-routes'
const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes: isMobileTerminal.value ? mobileRoutes : pcRoutes
})
export default router
