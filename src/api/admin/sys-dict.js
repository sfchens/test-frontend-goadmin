
import request from '@/utils/request'

export function addDictApi(data) {
  return request({
    url: '/sys/switch/add',
    method: 'post',
    data: data
  })
}

export function listDictApi(data) {
  return request({
    url: '/sys/switch/list',
    method: 'get',
    params: data
  })
}

export function delDictApi(data) {
  return request({
    url: '/sys/switch/delete',
    method: 'post',
    data: data
  })
}

export function SetStatusDictApi(data) {
  return request({
    url: '/sys/switch/set_status',
    method: 'post',
    data: data
  })
}
