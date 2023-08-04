import request from '@/utils/request'

// 新增用户
export function addAdminApi(data) {
  return request({
    url: '/sys/admin/add',
    method: 'post',
    data: data
  })
}

// 管理员列表
export function listAdminApi(data) {
  return request({
    url: '/sys/admin/list',
    method: 'get',
    data: data
  })
}
