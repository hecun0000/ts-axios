import { typeOf } from './utils'

/**
 *处理请求数据
 *
 * @export
 * @param {*} data
 * @returns {*}
 */
export function transformRequest(data: any): any {
  if (typeOf(data) === 'object') {
    return JSON.stringify(data)
  }
  return data
}

/**
 *处理响应诗句
 *
 * @export
 * @param {*} data
 * @returns {*}
 */
export function transformResponse(data: any): any {
  if (typeOf(data) === 'string') {
    try {
      data = JSON.parse(data)
    } catch (error) {
      // do
    }
  }
  return data
}
