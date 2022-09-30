import request from '../utils/request'
export const getChatcha = (data) => {
  return request({
    url: '/sys/captcha',
    method: 'POST',
    data
  })
}
export const loginUser = (data) => {
  return request({
    url: '/sys/login',
    method: 'POST',
    data
  })
}
export const getProfile = () => {
  return request({
    url: '/user/profile'
  })
}
export const updateProfile = (data) => {
  return request({
    url: '/user/profile',
    method: 'PUT',
    data
  })
}
