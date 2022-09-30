import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import './styles/index.scss'
import router from './router'
import store from './store'
import { useREM } from './utils/flexible'
import myLibs from './libs'
import directive from './directives'
import useTheme from './utils/theme'
import 'virtual:svg-icons-register' // 注册svg-icon
useREM()
useTheme()
createApp(App).use(router).use(store).use(myLibs).use(directive).mount('#app')
