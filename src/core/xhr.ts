import { AxiosRequestConfig, AxiosResponse, AxiosPromise } from '../types'
import { createError } from '../helper/error'

/**
 *xhr 请求
 *
 * @export
 * @param {AxiosRequestConfig} config 请求配置
 * @returns {AxiosPromise} 返回 promise 对象
 */
export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { data = null, url, method = 'get', headers, responseType, timeout } = config

    const request = new XMLHttpRequest()

    if (responseType) {
      request.responseType = responseType
    }
    if (timeout) {
      request.timeout = timeout
    }

    request.open(method.toUpperCase(), url!, true)

    request.onreadystatechange = function handleLoad() {
      if (request.readyState !== 4) {
        return
      }

      if (request.status === 0) {
        return
      }

      const responseHeaders = request.getAllResponseHeaders()
      const responseData = responseType !== 'text' ? request.response : request.responseText
      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }
      handleResponse(response)
    }
    
    // 网络出错
    request.onerror = function handleError() {
      reject(createError('Network Error', config, null, request))
    }

    // 请求超时
    request.ontimeout = function handleTimeOut() {
      reject(createError('Time of ' + timeout, config, 'ECONNABORTED', request))
    }
    Object.keys(headers).forEach(name => {
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })

    // 发送请求
    request.send(data)

    // 处理响应
    function handleResponse(response: AxiosResponse): void {
      if (response.status >= 200 && response.status < 300) {
        resolve(response)
      } else {
        reject(
          createError(
            'Request failed with status code ' + response.status,
            config,
            null,
            request,
            response
          )
        )
      }
    }
  })
}
