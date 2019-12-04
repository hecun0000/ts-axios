import { AxiosRequestConfig } from './types'
import { processHeaders } from './helper/headers'
import { transformRequest, transformResponse } from './helper/data'

// 定义默认配置
const defaults: AxiosRequestConfig = {
  method: 'get',

  timeout: 0,

  headers: {
    common: {
      Accept: 'application/json, text/javascript, */*'
    }
  },

  // 需携带的cookies名称
  xsrfCookieName: 'XSRF-TOKEN',
  // 携带后 header 中参数名称
  xsrfHeaderName: 'X-XSRF-TOKEN',
  // 请求前 参数处理 包括 data 和 headers
  transformRequest: [
    function(data: any, headers: any): any {
      processHeaders(headers, data)
      return transformRequest(data)
    }
  ],
  // 处理相应后返回数据
  transformResponse: [
    function(data: any): any {
      return transformResponse(data)
    }
  ],
  // http 状态码可用的范围
  validateStatus(status: number): boolean {
    return status >= 200 && status < 300
  }
}

const methodsNoData = ['delete', 'get', 'head', 'options']
// 没有 data 的请求处理
methodsNoData.forEach(method => {
  defaults.headers[method] = {}
})

const methodsData = ['post', 'put', 'patch']
//  处理 content-type
methodsData.forEach(method => {
  defaults.headers[method] = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

export default defaults
