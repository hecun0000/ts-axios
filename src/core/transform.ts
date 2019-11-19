import { AxiosTransformer } from '../types'

/**
 * 处理 链式调用
 *
 * @export
 * @param {*} data
 * @param {*} headers
 * @param {(AxiosTransformer | AxiosTransformer[])} [fns]
 * @returns {*}
 */
export default function transform(
  data: any,
  headers: any,
  fns?: AxiosTransformer | AxiosTransformer[]
): any {
  if (!fns) {
    return data
  }

  if (!Array.isArray(fns)) {
    fns = [fns]
  }

  fns.forEach(fn => {
    data = fn(data, headers)
  })

  return data
}
