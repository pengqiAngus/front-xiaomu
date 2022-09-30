import { h, render } from 'vue'
import confirmComponent from './index.vue'
/**
 * @param {*} title 标题
 * @param {*} content 内容
 * @param {*} cancelText 取消按钮文本
 * @param {*} confirmText 确认按钮文本
 */
export const confirm = (title, content, cancelText, confirmText) => {
  return new Promise((resolve, reject) => {
    if (title && !content) {
      content = title
      title = ''
    }
    /**
     * 关闭回调
     */
    const close = () => {
      // 取消vNode
      render(null, document.body)
    }
    /**
     * 取消按钮事件
     */
    const cancelHandler = () => {
      reject(new Error('取消清空'))
    }
    /**
     * 确认按钮事件
     */
    const confirmHandler = () => {
      resolve()
    }
    // 1.生成vNode
    const vNode = h(confirmComponent, {
      title,
      content,
      cancelText,
      confirmText,
      cancelHandler,
      confirmHandler,
      close
    })
    // 2.render函数进行渲染
    render(vNode, document.body)
  })
}
