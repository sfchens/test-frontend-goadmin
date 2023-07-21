import request from '@/utils/request'

// 查询SysApi列表
export function listSysApiApi(data) {
  return request({
    url: '/sys/api/list',
    method: 'get',
    params: data
  })
}

// 接口分类
export function getTagApiApi(data) {
  return request({
    url: '/sys/api/get_tag',
    method: 'get',
    params: data
  })
}

// 修改SysApi
export function editSysApiApi(data) {
  return request({
    url: '/sys/api/edit',
    method: 'post',
    data: data
  })
}

// 批量删除
export function deleteMultiApi(data) {
  return request({
    url: '/sys/api/delete_multi',
    method: 'post',
    data: data
  })
}

// 刷新接口
export function refreshApi() {
  return request({
    url: '/sys/api/refresh',
    method: 'post'
  })
}
