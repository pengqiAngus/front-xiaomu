/**
 *
 * @param {*} val
 * @returns 可以是true表示通过， 为String，表示未通过，提示未通过原因.
 */
export const validateUsername = (val) => {
  if (!val) {
    return '用户名必填'
  }
  return true
}
export const validatePassword = (val) => {
  if (!val) {
    return '密码必填'
  }
  return true
}
