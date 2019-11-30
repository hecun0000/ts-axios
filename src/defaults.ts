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

  xsrfCookieName: 'XSRF-TOKEN',

  xsrfHeaderName: 'X-XSRF-TOKEN',

  transformRequest: [
    function(data: any, headers: any): any {
      processHeaders(headers, data)
      return transformRequest(data)
    }
  ],

  transformResponse: [
    function(data: any): any {
      return transformResponse(data)
    }
  ],

  validateStatus(status: number): boolean {
    return status >= 200 && status < 300
  }
}

const methodsNoData = ['delete', 'get', 'head', 'options']
methodsNoData.forEach(method => {
  defaults.headers[method] = {}
})

const methodsData = ['post', 'put', 'patch']

methodsData.forEach(method => {
  defaults.headers[method] = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

export default defaults
