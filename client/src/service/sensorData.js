import request from '../utils/request'

export function getSensorDataList(id) {
  return request({
    url: '/get-all-sensorData',
    method: 'get',
    params: { id }
  })
}
