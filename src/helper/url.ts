import { typeOf } from './utils'
import { isURLSearchParams } from '../helper/utils'

interface URLOrigin {
  protocol: string
  host: string
}

/**
 * 将特殊字符进行转义
 *
 * @param {string} val
 * @returns {string}
 */
function encode(val: string): string {
  return decodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

/**
 * 生成请求 url
 *
 * @export
 * @param {string} url 请求地址
 * @param {*} [params] 蚕食
 * @returns {string} 最终请求地址
 */
export function buildURl(
  url: string,
  params?: any,
  paramsSerializer?: (parmas: any) => string
): string {
  if (!params) {
    return url
  }

  let serializedParams

  if (paramsSerializer) {
    serializedParams = paramsSerializer(params)
  } else if (isURLSearchParams(params)) {
    serializedParams = params.toString()
  } else {
    const parts: string[] = []
    Object.keys(params).forEach(key => {
      const val = params[key]
      if (val === null || typeof val === 'undefined') return

      let values = []
      if (Array.isArray(val)) {
        values = val
        key += '[]'
      } else {
        values = [val]
      }

      values.forEach(val => {
        const valType = typeOf(val)
        if (valType === 'date') {
          val = (val as Date).toISOString()
        } else if (valType === 'object') {
          val = JSON.stringify(val)
        }
        parts.push(`${encode(key)}=${encode(val)}`)
      })
    })

    serializedParams = parts.join('&')
  }

  if (serializedParams) {
    const markIndex = url.indexOf('#')
    if (markIndex !== -1) {
      url = url.slice(0, markIndex)
    }
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }
  return url
}

// 判断是不是同源请求
export function isURLSameOrigin(requestURL: string): boolean {
  const parseOrigin = resolveURL(requestURL)
  return parseOrigin.protocol === currentOrigin.protocol && parseOrigin.host === currentOrigin.host
}

const UrlParsingNode = document.createElement('a')

const currentOrigin = resolveURL(window.location.href)

function resolveURL(url: string): URLOrigin {
  UrlParsingNode.setAttribute('href', url)
  const { protocol, host } = UrlParsingNode
  return { protocol, host }
}

/**
 * 判断是不是绝对路径
 *
 * @export
 * @param {string} url
 * @returns {boolean}
 */
export function isAbsoluteURL(url: string): boolean {
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url)
}

/**
 * 拼接 请求 url
 *
 * @export
 * @param {string} baseUrl
 * @param {string} [relativeURL]
 * @returns {string}
 */
export function combineURl(baseUrl: string, relativeURL?: string): string {
  if (relativeURL) {
    const res = baseUrl.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
  }

  return relativeURL ? baseUrl.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') : baseUrl
}
