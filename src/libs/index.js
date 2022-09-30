import SvgIcon from './svg-icon/index.vue'
import Popup from './popup/index.vue'
import { defineAsyncComponent } from 'vue'
export { confirm } from './confirm/index'
export { message } from './message/index'
export default {
  install(app) {
    // 自动化注册组件：
    // 1.获取当前路径下所有文件夹中的index.vue
    const components = import.meta.glob('./*/index.vue')
    // 2.遍历获取到的组件模块(index.vue)
    for (const [fullPath, fn] of Object.entries(components)) {
      // 3.利用app.component进行注册
      const componentName = 'm-' + fullPath.replace('./', '').split('/')[0]
      app.component(componentName, defineAsyncComponent(fn))
    }
  }
}
