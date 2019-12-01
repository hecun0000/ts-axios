import { transformRequest, transformResponse } from '../../src/helper/data'

describe('helpers:data', () => {
  describe('transformRequest', () => {
    test('普通对象转换', () => {
      const a = { b: 1 }
      expect(transformRequest(a)).toBe('{"b":1}')
    })

    test('非普通对象转换', () => {
      expect(transformRequest('string')).toBe('string')
    })
  })

  describe('transformResponse', () => {
    test('将json数据转为对象', () => {
      const a = { b: 1 }
      expect(transformResponse('{"b":1}')).toEqual({ b: 1 })
    })

    test('将对象直接返回', () => {
      expect(transformResponse({ b: 1 })).toEqual({ b: 1 })
    })
  })
})
