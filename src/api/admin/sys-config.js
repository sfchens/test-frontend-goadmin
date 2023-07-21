import request from '@/utils/request'

// 新增参数配置
export function addConfigApi(data) {
  return request({
    url: '/sys/config/add',
    method: 'post',
    data: data
  })
}

// 修改参数配置
export function editConfigApi(data) {
  return request({
    url: '/sys/config/edit',
    method: 'post',
    data: data
  })
}

// 查询参数列表
export function listConfigApi(query) {
  return request({
    url: '/sys/config/list',
    method: 'get',
    params: query
  })
}

// 删除参数配置
export function delConfigApi(data) {
  return request({
    url: '/sys/config/delete',
    method: 'post',
    data: data
  })
}

// 设置状态
export function SetStatusConfigApi(data) {
  return request({
    url: '/sys/config/set_status',
    method: 'post',
    data: data
  })
}
