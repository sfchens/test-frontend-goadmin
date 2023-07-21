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

// 查询部门下拉树结构
export function treeselect() {
  return request({
    url: '/api/v1/deptTree',
    method: 'get'
  })
}

// 根据角色ID查询部门树结构
export function roleDeptTreeselect(roleId) {
  return request({
    url: '/api/v1/roleDeptTreeselect/' + roleId,
    method: 'get'
  })
}

// 新增部门
export function addDept(data) {
  return request({
    url: '/api/v1/dept',
    method: 'post',
    data: data
  })
}

// 修改部门
export function updateDept(data, id) {
  return request({
    url: '/api/v1/dept/' + id,
    method: 'put',
    data: data
  })
}

// 删除部门
export function delDept(data) {
  return request({
    url: '/api/v1/dept',
    method: 'delete',
    data: data
  })
}
