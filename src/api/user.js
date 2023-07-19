import request from '@/utils/request'

// login 登陆
export function login(data) {
  return request({
    url: '/api/v1/sys/login',
    method: 'post',
    data
  })
}

// logout 退出
export function logout() {
  return request({
    url: '/api/v1/sys/logout',
    method: 'post'
  })
}

// refreshtoken 刷新token
export function refreshtoken(data) {
  return request({
    url: '/refreshtoken',
    method: 'post',
    data
  })
}

// getInfo 获取用户基本信息
export function getInfo() {
  return request({
    url: '/api/v1/sys/admin/get_admin_info',
    method: 'get'
  })
}

