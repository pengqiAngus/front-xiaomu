import { useIntersectionObserver } from '@vueuse/core'
export default {
  // 图片懒加载 :用户无法看到图片时，不加载图片.
  mounted(el) {
    const imgSrc = el.src
    el.src = ''
    // 用户看到图片时，开始加载图片
    const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
      if (isIntersecting) {
        el.src = imgSrc
        // 停止监听
        stop()
      }
    })
  }
}
