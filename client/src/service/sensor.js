import request from '../utils/request'

export function getSensors(id) {
  return request({
    url: '/get-all-sensors',
    method: 'get',
    params: { id }
  })
}

// edit-sensors
// delete-sensors

export function addSensor(data)  {
    return request({
        url: '/create-new-sensors',
        method: 'post',
        data
    })
}

export function updateSensor(data) {
    return request({
        url: '/edit-sensors',
        method: 'put',
        data
    })
}

export function deleteSensor(data) {
    return request({
        url: '/delete-sensors',
        method: 'delete',
        data
    })
}