import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import xhr from './xhr'
import { buildURl } from '../helper/url'
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
  processConfig(config)
  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}

/**
 *请求前处理配置
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
function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURl(url!, params)
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
