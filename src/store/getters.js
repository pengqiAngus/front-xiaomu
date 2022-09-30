import search from './modules/search'

export default {
  // 简单访问
  categorys: (state) => state.category.categorys,
  themeType: (state) => state.theme.themeType,
  // 选中的category
  currentCategory: (state) => state.app.currentCategory,
  // 选中category的下标
  currentCategoryIndex: (state, getters) => {
    const res = getters.categorys.findIndex((item) => {
      return item.id === getters.currentCategory.id
    })
    return res
  },
  searchHistory: (state) => state.search.historys,
  searchText: (state) => state.app.searchText,
  token: (state) => state.user.token,
  userInfo: (state) => state.user.userInfo
}
