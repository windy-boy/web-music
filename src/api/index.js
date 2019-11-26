import util from '../libs/axios'
export function getBanner (params) {
  return util.get('/banner', { params })
}