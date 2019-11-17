import { typeOf } from './utils'
export function transformRequest(data: any): any {
  if (typeOf(data) === 'object') {
    return JSON.stringify(data)
  }
  return data
}

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
