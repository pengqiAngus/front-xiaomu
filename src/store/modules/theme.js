import { THEME_LIGHT } from '../../constants'
export default {
  namespaced: true,
  state: () => {
    return {
      themeType: THEME_LIGHT
    }
  },
  mutations: {
    changeThemeType(state, newTheme) {
      state.themeType = newTheme
    }
  },
  actions: {
    goChangeThemeType(context, newTheme) {
      context.commit('changeThemeType', newTheme)
    }
  }
}
