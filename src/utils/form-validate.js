export function checkEmailByForm(rule, value, cb) {
// 验证邮箱的正则表达式
  const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
  if (regEmail.test(value)) {
    return cb()
  }
  cb(new Error('请输入合法的邮箱！'))
}
export function checkMobileByForm(rule, value, cb) {
  const regMobile = /^(0|86|17951)?(13[0-9]|15[0123456789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
  if (regMobile.test(value)) {
    return cb()
  }
  cb(new Error('请输入合法的手机号！'))
}
