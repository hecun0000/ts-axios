import { ResolvedFn, RejectedFn } from '../types'

interface Interceptor<T> {
  resolved: ResolvedFn<T>
  rejected?: RejectedFn
}

/**
 * 拦截器实例
 *
 * @export
 * @class InterceptorManager
 * @template T
 */
export default class InterceptorManager<T> {
  private interceptors: Array<Interceptor<T> | null>

  constructor() {
    this.interceptors = []
  }

  /**
   * 添加拦截器
   *
   * @param {ResolvedFn<T>} resolved 成功时的回调
   * @param {RejectedFn} [rejected] 失败时的回调
   * @returns
   * @memberof InterceptorManager
   */
  use(resolved: ResolvedFn<T>, rejected?: RejectedFn) {
    this.interceptors.push({
      resolved,
      rejected
    })
    return this.interceptors.length - 1
  }

  /**
   * 删除拦截器
   *
   * @param {number} id 所删除拦截器的id
   * @memberof InterceptorManager
   */
  eject(id: number): void {
    if (this.interceptors[id]) {
      this.interceptors[id] = null
    }
  }

  /**
   * 遍历并执行拦截器中的函数
   *
   * @param {(Interceptor: Interceptor<T>) => void} fn
   * @memberof InterceptorManager
   */
  forEach(fn: (Interceptor: Interceptor<T>) => void): void {
    this.interceptors.forEach(interceptor => {
      if (interceptor !== null) {
        fn(interceptor)
      }
    })
  }
}
