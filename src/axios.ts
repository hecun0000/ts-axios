import { AxiosRequestConfig, AxiosStatic } from './types'
import Axios from './core/Axios'
import { extend } from './helper/utils'
import defaults from './defaults'
import mergeConfig from './core/mergeConfig'
import CancelToken from './cancel/CancelToken'
import Cancel, { isCancel } from './cancel/Cancel'

/**
 * 创建请求实例
 *
 * @param {AxiosRequestConfig} 请求配置
 * @returns {AxiosStatic} 返回axios实例
 */
function createInstance(config: AxiosRequestConfig): AxiosStatic {
  const context = new Axios(config)
  // 将 axios 中的 this 绑定到 request 中
  // request方法内部会用到axios实例
  const instance = Axios.prototype.request.bind(context)

  // 将 context 合并到 instance 中
  // 这里之所以不能使用Object.setPrototypeOf(instance, Axios.prototype)
  // 是因为 interceptors/defaults 等属性存在于Axios实例中而不是其原型中.
  extend(instance, context)

  return instance as AxiosStatic
}

const axios = createInstance(defaults)

/***
 * 添加静态方法 create 自行创建 axios 实例
 * 传入 config 配置
 * 返回 axios 实例
 */
axios.create = function create(config: AxiosRequestConfig) {
  return createInstance(mergeConfig(defaults, config))
}

// 添加 静态方法
axios.CancelToken = CancelToken
axios.Cancel = Cancel
axios.isCancel = isCancel
axios.all = function all(promises) {
  return Promise.all(promises)
}
axios.spread = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr)
  }
}

axios.Axios = Axios

export default axios
