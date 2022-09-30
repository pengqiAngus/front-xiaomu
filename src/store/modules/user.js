import md5 from 'md5'
import { loginUser, getProfile } from '../../api/sys'
import { message } from '../../libs'
export default {
  namespaced: true,
  state: () => {
    return {
      token: '',
      userInfo: {}
    }
  },
  mutations: {
    setToken(state, newToken) {
      state.token = newToken
    },
    setUserInfo(state, newUserInfo) {
      state.userInfo = newUserInfo
    }
  },
  actions: {
    async login(context, payload) {
      const { password } = payload
      const data = await loginUser({
        ...payload,
        password: password ? md5(password) : ''
      })
      // 保存token
      context.commit('setToken', data.token)
      context.dispatch('getUserInfo')
    },
    async getUserInfo(context, payload) {
      const res = await getProfile()
      context.commit('setUserInfo', res)
      message(
        'success',
        `${data.vipLevel ? '尊贵的VIP' : '用户'} ${data.nickname}`,
        6000
      )
    }
  }
}
