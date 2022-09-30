/**
 * 搜索历史数据
 */
export default {
  namespaced: true,
  state: () => {
    return {
      historys: []
    }
  },
  mutations: {
    /**
     * 新增
     * 1.新增历史记录出现在头部
     * 2.不可出现重复记录
     */
    addHistory(state, newHistory) {
      const isFindIndex = state.historys.findIndex((item) => {
        return item === newHistory
      })
      if (isFindIndex !== -1) {
        state.historys.splice(isFindIndex, 1)
      }
      state.historys.push(newHistory)
    },
    /**
     * 单个删除
     */
    deleteHistory(state, index) {
      state.historys.splice(index, 1)
    },

    /**
     * 全部清空
     */
    clearHistory(state) {
      state.historys = []
    }
  },
  actions: {}
}
