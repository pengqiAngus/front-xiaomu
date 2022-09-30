import { h, render } from 'vue'
import messageComponent from './index.vue'
export const message = (type, content, duration = 3000) => {
  const onDestroy = () => {
    render(null, document.body)
  }
  // 1.拿到vNode
  const vNode = h(messageComponent, {
    type,
    content,
    duration,
    destroy: onDestroy
  })
  // 2.render vNode
  render(vNode, document.body)
  // 3.删除render
}
