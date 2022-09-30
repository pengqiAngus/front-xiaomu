import request from '../utils/request'
export const getVIP = () => {
  return request({
    url: '/user/vip/pay/list'
  })
}
