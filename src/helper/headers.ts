import { typeOf, deepMerge } from './utils'
import { Method } from '../types'

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
 * 处理headers
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
