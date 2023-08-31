import request from '@/utils/request'

// 菜单Tree
export function treeListMenuApi(query) {
  return request({
    url: '/sys/menu/tree_list',
    method: 'get',
    params: query
  })
}

// 新增菜单
export function addMenuApi(data) {
  return request({
    url: '/sys/menu/add',
    method: 'post',
    data: data
  })
}

// 编辑菜单
export function editMenuApi(data) {
  return request({
    url: '/sys/menu/edit',
    method: 'post',
    data: data
  })
}

// 菜单列表数据
export function treeListAllMenuApi(query) {
  return request({
    url: '/sys/menu/list',
    method: 'get',
    params: query
  })
}

// 查询菜单详细
export function getMenu(menuId) {
  return request({
    url: '/api/v1/menu/' + menuId,
    method: 'get'
  })
}

// 查询菜单下拉树结构
// export function treeselect() {
//   return request({
//     url: '/api/v1/menuTreeselect',
//     method: 'get'
//   })
// }

// 根据角色ID查询菜单下拉树结构
export function roleMenuTreeselect(roleId) {
  return request({
    url: '/api/v1/roleMenuTreeselect/' + roleId,
    method: 'get'
  })
}

// 新增菜单
export function addMenu(data) {
  return request({
    url: '/api/v1/menu',
    method: 'post',
    data: data
  })
}

// 修改菜单
export function updateMenu(data, id) {
  return request({
    url: '/api/v1/menu/' + id,
    method: 'put',
    data: data
  })
}

// 删除菜单
export function delMenu(data) {
  return request({
    url: '/api/v1/menu',
    method: 'delete',
    data: data
  })
}
