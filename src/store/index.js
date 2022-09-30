import { createStore } from 'vuex'
import getters from './getters'
import category from './modules/category'
import theme from './modules/theme'
import app from './modules/app'
import search from './modules/search'
import user from './modules/user'
import createPersistedState from 'vuex-persistedstate'
const store = createStore({
  getters,
  modules: {
    category,
    theme,
    app,
    search,
    user
  },
  plugins: [
    createPersistedState({
      // key:指定保存到localstorage中的key值
      key: 'xiaomu',
      // paths:需要保存的模块
      paths: ['category', 'theme', 'search', 'user']
    })
  ]
})

export default store
