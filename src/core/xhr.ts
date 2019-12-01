import { AxiosRequestConfig, AxiosResponse, AxiosPromise } from '../types'
import { createError } from '../helper/error'
import { isURLSameOrigin } from '../helper/url'
import cookie from '../helper/cookie'
import { isFormData } from '../helper/utils'
import { parseHeaders } from '../helper/headers'

/**
 * xhr 请求
 *
 * @export
 * @param {AxiosRequestConfig} config 请求配置
 * @returns {AxiosPromise} 返回 promise 对象
 */
export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const {
      data = null,
      url,
      method = 'get',
      headers,
      responseType,
      timeout,
      cancelToken,
      withCredentials,
      xsrfCookieName,
      xsrfHeaderName,
      onDownloadProgress,
      onUploadProgress,
      auth,
      validateStatus
    } = config

    const request = new XMLHttpRequest()

    request.open(method.toUpperCase(), url!, true)

    configureRequest()

    addEvent()

    processRequestHeaders()

    processCancel()

    // 发送请求
    request.send(data)

    function configureRequest(): void {
      if (responseType) {
        request.responseType = responseType
      }
      if (timeout) {
        request.timeout = timeout
      }

      if (withCredentials) {
        request.withCredentials = withCredentials
      }
      if (onDownloadProgress) {
        request.onprogress = onDownloadProgress
      }

      if (onUploadProgress) {
        request.upload.onprogress = onUploadProgress
      }
    }

    function processRequestHeaders(): void {
      if (isFormData(data)) {
        delete headers['Content-Type']
      }

      if (auth) {
        headers['Authorization'] = 'Basic ' + btoa(auth.username + ':' + auth.password)
      }

      if ((withCredentials || isURLSameOrigin(url!)) && xsrfCookieName) {
        const xsrfValue = cookie.read(xsrfCookieName)
        if (xsrfValue && xsrfHeaderName) headers[xsrfHeaderName] = xsrfValue
      }
      Object.keys(headers).forEach(name => {
        if (data === null && name.toLowerCase() === 'content-type') {
          delete headers[name]
        } else {
          request.setRequestHeader(name, headers[name])
        }
      })
    }

    function addEvent(): void {
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
          headers: parseHeaders(responseHeaders),
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
        reject(
          createError('Timeout of ' + timeout + ' ms exceeded', config, 'ECONNABORTED', request)
        )
      }
    }

    function processCancel(): void {
      if (cancelToken) {
        cancelToken.promise
          .then(reason => {
            request.abort()
            reject(reason)
          })
          .catch(
            /* istanbul ignore next */
            () => {
              // do nothing
            }
          )
      }
    }

    // 处理响应
    function handleResponse(response: AxiosResponse): void {
      if (!validateStatus || validateStatus(response.status)) {
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
