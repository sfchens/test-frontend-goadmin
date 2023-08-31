import request from '@/utils/request'

// 列表数据
export function listCategoryApi(data) {
  return request({
    url: '/product/category/list',
    method: 'get',
    params: data
  })
}

// 新增
export function addCategoryApi(data) {
  return request({
    url: '/product/category/add',
    method: 'post',
    data: data
  })
}

// 新增
export function delMultiCategoryApi(data) {
  return request({
    url: '/product/category/delete_multi',
    method: 'post',
    data: data
  })
}
