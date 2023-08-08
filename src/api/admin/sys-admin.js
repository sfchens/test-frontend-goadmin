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
    params: data
  })
}

// 重置密码
export function resetPwdAdminApi(data) {
  return request({
    url: '/sys/admin/reset_pwd',
    method: 'post',
    data: data
  })
}

// 设置状态
export function setStatusAdminApi(data) {
  return request({
    url: '/sys/admin/set_status',
    method: 'post',
    data: data
  })
}

// 批量删除
export function deleteBatchAdminApi(data) {
  return request({
    url: '/sys/admin/delete_batch',
    method: 'post',
    data: data
  })
}

export function setRoleAdminApi(data) {
  return request({
    url: '/sys/admin/set_role',
    method: 'post',
    data: data
  })
}
