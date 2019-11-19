import { typeOf, deepMerge } from './utils'
import { Method } from '../types'

/**
 *格式化 headers 中的 属性
 *
 * @param {*} headers
 * @param {string} nomalizedName
 */
function nomalizeHeaderName(headers: any, nomalizedName: string): void {
  if (!headers) {
    return
  }
  Object.keys(headers).forEach(name => {
    if (name !== nomalizedName && name.toUpperCase() === nomalizedName.toUpperCase()) {
      headers[nomalizedName] = headers[name]
      delete headers[name]
    }
  })
}

/**
 *处理 headers 默认配置
 * 
 * @export
 * @param {*} headers 
 * @param {*} data
 * @returns {*} 处理后 header 
 */
export function processHeaders(headers: any, data: any): any {
  nomalizeHeaderName(headers, 'Content-Type')
  if (typeOf(data) === 'object') {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }
  return headers
}

/**
 * 处理headers 与传入的header 进行合并
 * @param headers 传入的headers
 * @param method 请求方式
 */
export function flattenHeaders(headers: any, method: Method): any {
  if (!headers) {
    return headers
  }

  headers = deepMerge(headers.common, headers[method], headers)

  const methodsToDelete = ['delete', 'get', 'head', 'options', 'post', 'put', 'patch', 'common']

  methodsToDelete.forEach(method => {
    delete headers[method]
  })

  return headers
}
