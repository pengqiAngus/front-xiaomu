/**
 * 判断当前是否为移动设备，判断依据为屏幕的宽度是否大于指定值（1280）
 */
import { PC_DEVICE_WIDTH } from '../constants/index'
import { computed } from 'vue'
import { useWindowSize } from '@vueuse/core'

// 判断当前设备是否为移动设备， 根据屏幕宽度进行判断.
const { width } = useWindowSize()
export const isMobileTerminal = computed(() => {
  return width.value < PC_DEVICE_WIDTH
})

// 动态指定rem基准值 最大为40px， 根据用户的屏幕宽度进行计算
export const useREM = () => {
  // 定义最大 font-size
  const MAX_FONT_SIZE = 40
  document.addEventListener('DOMContentLoaded', () => {
    const html = document.querySelector('html')
    let fontSize = window.innerWidth / 10
    fontSize = fontSize > MAX_FONT_SIZE ? MAX_FONT_SIZE : fontSize
    html.style.fontSize = fontSize + 'px'
  })
}
