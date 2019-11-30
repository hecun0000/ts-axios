import { typeOf, deepMerge, extend, isFormData, isURLSearchParams } from '../../src/helper/utils'

describe('helpers:util', () => {
  describe('typeOf', () => {
    test('验证 typeOf 函数', () => {
      expect(typeOf(1)).toBe('number')
      expect(typeOf('1')).toBe('string')
      expect(typeOf(() => 1)).toBe('function')
      expect(typeOf({})).toBe('object')
      expect(typeOf(null)).toBe('null')
      expect(typeOf([1, 2, 3])).toBe('array')
      expect(typeOf(undefined)).toBe('undefined')
      expect(typeOf(new Date())).toBe('date')
    })
  })

  describe('is XXX', () => {
    test('isFormData', () => {
      expect(isFormData(1)).toBeFalsy()
      expect(isFormData(new FormData())).toBeTruthy()
    })

    test('isURLSearchParams', () => {
      expect(isURLSearchParams('a=b&c=d')).toBeFalsy()
      expect(isURLSearchParams(new URLSearchParams('a=b&c=d'))).toBeTruthy()
    })
  })

  describe('extend', () => {
    test('should be mutable', () => {
      const a = Object.create(null)
      const b = { foo: 123 }

      extend(a, b)

      expect(a.foo).toBe(123)
    })

    test('should be extend properties', () => {
      const a = { foo: 123, bar: 456 }
      const b = { bar: 789 }

      extend(a, b)

      expect(a.foo).toBe(123)
      expect(a.bar).toBe(789)
    })
  })

  describe('deepMerge', () => {
    test('should be immutable', () => {
      const a = Object.create(null)
      const b: any = { foo: 123 }
      const c: any = { bar: 456 }

      deepMerge(a, b, c)

      expect(typeof a.foo).toBe('undefined')
      expect(typeof a.bar).toBe('undefined')
      expect(typeof b.bar).toBe('undefined')
      expect(typeof c.foo).toBe('undefined')
    })

    test('should be deepMerge properties', () => {
      const a = { foo: 123 }

      const b = { bar: 456 }
      const c = { foo: 789 }

      const d = deepMerge(a, b, c)

      expect(d.foo).toBe(789)
      expect(d.bar).toBe(456)
    })

    test('should be deepMerge recursively', () => {
      const a = { foo: { bar: 123 } }
      const b = { foo: { baz: 123 }, bar: { qux: 789 } }

      const c = deepMerge(a, b)

      expect(c).toEqual({
        foo: { bar: 123, baz: 123 },
        bar: { qux: 789 }
      })
    })

    test('should be deepMerge all references from nested objects', () => {
      const a = { foo: { bar: 123 } }
      const b = {}

      const c = deepMerge(a, b)

      expect(c).toEqual({ foo: { bar: 123 } })
      expect(c.foo).not.toBe(a.foo)
    })

    test('should handle null undefined', () => {
      expect(deepMerge(undefined, undefined)).toEqual({})
      expect(deepMerge(undefined, { a: 1 })).toEqual({ a: 1 })
      expect(deepMerge({ a: 1 }, undefined)).toEqual({ a: 1 })

      expect(deepMerge(null, null)).toEqual({})
      expect(deepMerge(null, { a: 1 })).toEqual({ a: 1 })
      expect(deepMerge({ a: 1 }, null)).toEqual({ a: 1 })
    })
  })
})
