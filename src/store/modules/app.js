import { ALL_CATEGORY_ITEM } from '../../constants/index'
export default {
  namespaced: true,
  state: () => {
    return {
      // 当前选中的分类
      currentCategory: ALL_CATEGORY_ITEM,
      searchText: ''
    }
  },
  mutations: {
    // 切换选中分类
    changeCurrentCategory(state, newCategory) {
      state.currentCategory = newCategory
    },
    // 修改searchText
    changeTextSearchText(state, newSearchText) {
      state.searchText = newSearchText
    }
  },
  actions: {}
}
