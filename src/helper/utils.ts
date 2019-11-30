import { TypeOfMap } from '../types'

/**
 * 判断参数类型
 *
 * @export
 * @param {*} obj 判断的对象
 * @returns {string}  返回值
 */
export function typeOf(obj: any): string {
  const toString = Object.prototype.toString
  const map: TypeOfMap = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  }
  return map[toString.call(obj)]
}

/**
 * 联合类型
 *
 * @export
 * @template T
 * @template U
 * @param {T} to
 * @param {U} from
 * @returns {(T & U)}
 */
export function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    ;(to as T & U)[key] = from[key] as any
  }
  return to as T & U
}

/**
 * 合并 config 参数
 *
 * @export
 * @param {...any[]} objs 需要合并的参数
 * @returns {*} 合并后结果
 */
export function deepMerge(...objs: any[]): any {
  const result = Object.create(null)

  objs.forEach(obj => {
    if (obj) {
      Object.keys(obj).forEach(key => {
        const val = obj[key]
        if (typeOf(val) === 'object') {
          if (typeOf(result[key]) === 'object') {
            result[key] = deepMerge(result[key], val)
          } else {
            result[key] = deepMerge(val)
          }
        } else {
          result[key] = val
        }
      })
    }
  })

  return result
}

/**
 * 判断是不是 FormData
 *
 * @export
 * @param {*} val
 * @returns {val is FormData}
 */
export function isFormData(val: any): val is FormData {
  return typeof val !== 'undefined' && val instanceof FormData
}

/**
 * 判断是不是 URLSearchParams
 *
 * @export
 * @param {*} val
 * @returns {val is URLSearchParams}
 */
export function isURLSearchParams(val: any): val is URLSearchParams {
  return typeof val !== 'undefined' && val instanceof URLSearchParams
}
