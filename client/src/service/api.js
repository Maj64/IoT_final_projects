import request from '../utils/request'

export function getSensor(id) {
  return request({
    url: '/get-all-sensors',
    method: 'get',
    params: { id }
  })
}

// export function getInfo(token) {
//   return request({
//     url: '/user/info',
//     method: 'get',
//     params: { token }
//   })
// }

// export function logout() {
//   return request({
//     url: '/user/logout',
//     method: 'post'
//   })
// }
