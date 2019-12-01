import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import xhr from './xhr'
import { buildURl, isAbsoluteURL, combineURl } from '../helper/url'
import { flattenHeaders } from '../helper/headers'
import transform from './transform'

/**
 * 请求发送一管理
 *
 * @export
 * @param {AxiosRequestConfig} config
 * @returns {AxiosPromise}
 */
export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  throwIfCancellationRequested(config)
  processConfig(config)
  return xhr(config).then(
    res => {
      return transformResponseData(res)
    },
    e => {
      if (e && e.response) {
        e.response = transformResponseData(e.response)
      }
      return Promise.reject(e)
    }
  )
}

/**
 * 请求前处理配置
 *
 * @param {AxiosRequestConfig} config
 */
function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config)
  config.data = transform(config.data, config.headers, config.transformRequest)
  config.headers = flattenHeaders(config.headers, config.method!)
}

/**
 * 处理请求地址 url
 *
 * @param {AxiosRequestConfig} config
 * @returns {string}
 */
export function transformURL(config: AxiosRequestConfig): string {
  let { url, params, paramsSerializer, baseUrl } = config
  if (baseUrl && !isAbsoluteURL(url!)) {
    url = combineURl(baseUrl, url)
  }
  return buildURl(url!, params, paramsSerializer)
}

/**
 * 处理请求响应
 *
 * @param {AxiosResponse} res
 * @returns {AxiosResponse}
 */
function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transform(res.data, res.headers, res.config.transformResponse)
  return res
}

function throwIfCancellationRequested(config: AxiosRequestConfig): void {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested()
  }
}
