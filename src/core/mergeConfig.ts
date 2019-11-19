import { AxiosRequestConfig } from '../types'
import { typeOf, deepMerge } from '../helper/utils'

const strats = Object.create(null)

function defaultStrat(val1: any, val2: any): any {
  return typeof val2 !== 'undefined' ? val2 : val1
}

function fromVal2Strat(val1: any, val2: any): any {
  if (typeof val2 !== 'undefined') {
    return val2
  }
}

function deepMergeStrat(val1: any, val2: any): any {
  if (typeOf(val2) === 'object') {
    return deepMerge(val1, val2)
  } else if (typeof val2 !== 'undefined') {
    return val2
  } else if (typeOf(val1) === 'object') {
    return deepMerge(val1)
  } else if (typeof val1 !== 'undefined') {
    return val1
  }
}

const stratKeysDeepMerge = ['headers']
stratKeysDeepMerge.forEach(key => {
  strats[key] = deepMergeStrat
})

const stratKeysFromVal2 = ['url', 'params', 'data']

stratKeysFromVal2.forEach(key => {
  strats[key] = fromVal2Strat
})

/**
 * 配置合并
 *
 * @export
 * @param {AxiosRequestConfig} config1
 * @param {AxiosRequestConfig} config2
 * @returns 合并后的配置
 */
export default function mergeConfig(config1: AxiosRequestConfig, config2: AxiosRequestConfig) {
  if (!config2) {
    config2 = {}
  }
  const config = Object.create(null)

  for (let key in config2) {
    mergeField(key)
  }

  for (let key in config1) {
    if (!config2[key]) {
      mergeField(key)
    }
  }

  function mergeField(key: string): void {
    const strat = strats[key] || defaultStrat
    config[key] = strat(config1[key], config2[key])
  }

  return config
}
