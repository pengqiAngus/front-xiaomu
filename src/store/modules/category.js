/**
 * 处理navigationBar 里面的数据
 */
import { ALL_CATEGORY_ITEM } from '../../constants'
import { CATEGORY_NOMAR_DATA } from '../../constants'
import { getCategory } from '../../api/category'
export default {
  // 独立作用域
  namespaced: true,
  state: () => {
    return {
      categorys: [CATEGORY_NOMAR_DATA] //使用vuex-persistedstate对其进行localstorage缓存
    }
  },
  mutations: {
    // 给categorys赋值
    setCategory(state, newCategorys) {
      state.categorys = [ALL_CATEGORY_ITEM, ...newCategorys]
    }
  },
  actions: {
    // 获取categorys数据，并自动保存到vuex中
    async useCategoryData(context) {
      const { categorys } = await getCategory()
      context.commit('setCategory', categorys)
    }
  }
}
