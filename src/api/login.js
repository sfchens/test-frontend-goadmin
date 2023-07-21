import request from '@/utils/request'

// 获取验证码
export function getCodeImg() {
  return request({
    url: '/captcha/get_one',
    method: 'get'
  })
}

// 查询 此接口不在验证数据权限
export function getSetting(data) {
  return request({
    url: '/sys/login_info',
    method: 'get',
    params: data
  })
}
