import request from '@/utils/request'

// 新增部门
export function addOrEditDeptApi(data) {
  return request({
    url: '/sys/dept/add',
    method: 'post',
    data: data
  })
}

export function treeListDeptApi(data) {
  return request({
    url: '/sys/dept/tree_list',
    method: 'get',
    params: data
  })
}

export function listDeptApi(data) {
  return request({
    url: '/sys/dept/list',
    method: 'get',
    params: data
  })
}

// 查询部门详细
export function getOneDeptApi(data) {
  return request({
    url: '/sys/dept/get_one',
    method: 'get',
    params: data
  })
}

// 批量删除
export function delMultiDeptApi(data) {
  return request({
    url: '/sys/dept/delete_multi',
    method: 'post',
    data: data
  })
}
