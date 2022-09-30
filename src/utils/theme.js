import { watch } from 'vue'
import { THEME_LIGHT, THEME_DARK, THEME_SYSTEM } from '../constants/index'
import store from '../store'
/**监听系统主题变更
 *
 */
let matchMedia
const watchSystemThemeChange = () => {
  if (matchMedia) return
  matchMedia = window.matchMedia('(prefers-colors-scheme:dark)')
  matchMedia.onchange = () => {
    changeTheme(THEME_SYSTEM)
  }
}
const changeTheme = (theme) => {
  let themeClassName = ''
  switch (theme) {
    case THEME_LIGHT:
      themeClassName = 'light'
      break
    case THEME_DARK:
      themeClassName = 'dark'
      break
    case THEME_SYSTEM:
      watchSystemThemeChange()
      themeClassName = matchMedia.matches ? 'dark' : 'light'
      break
  }
  document.querySelector('html').className = themeClassName
}
/**
 * 初始化主题
 */
export default () => {
  watch(() => store.getters.themeType, changeTheme, { immediate: true })
}
