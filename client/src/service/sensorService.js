import request from '@/utils/request'

export function getSensors(id) {
  return request({
    url: '/create-new-sensors',
    method: 'get',
    params: {id}
  })
}

export function addSensors(data) {
  return request({
    url: '/role',
    method: 'post',
    data
  })
}

export function updateRole(id, data) {
  return request({
    url: `/role/${id}`,
    method: 'put',
    data
  })
}

export function deleteRole(id) {
  return request({
    url: `/role/${id}`,
    method: 'delete'
  })
}