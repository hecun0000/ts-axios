import { buildURl, isURLSameOrigin, isAbsoluteURL, combineURl } from '../../src/helper/url'

describe('helpers:url', () => {
  describe('isURLSameOrigin', () => {
    test('isURLSameOrigin', () => {
      expect(isURLSameOrigin('/get')).toBeTruthy()
      expect(isURLSameOrigin('http://www.baidu.com')).toBeFalsy()
    })
  })

  describe('isAbsoluteURL', () => {
    test('判断是不是绝对路径', () => {
      expect(isAbsoluteURL('/get')).toBeFalsy()
      expect(isAbsoluteURL('http://www.baidu.com')).toBeTruthy()
      expect(isAbsoluteURL('file://www.baidu.com')).toBeTruthy()
      expect(isAbsoluteURL('123://www.baidu.com')).toBeFalsy()
    })
  })
  // combineURl
  describe('combineURl', () => {
    test('拼接請求url', () => {
      expect(combineURl('/get')).toBe('/get')
      expect(combineURl('http://www.baidu.com', 'get')).toBe('http://www.baidu.com/get')
      expect(combineURl('http://www.baidu.com/', '/get')).toBe('http://www.baidu.com/get')
      expect(combineURl('http://www.baidu.com/', 'get')).toBe('http://www.baidu.com/get')
      expect(combineURl('http://www.baidu.com', '/get')).toBe('http://www.baidu.com/get')
    })
  })

  // buildURl
  describe('buildURl', () => {
    test('仅传递url', () => {
      expect(buildURl('', {})).toBe('')
      expect(buildURl('/get')).toBe('/get')
      expect(buildURl('/get', null)).toBe('/get')
      expect(buildURl('/get', undefined)).toBe('/get')
    })
    test('url + params', () => {
      expect(buildURl('/get', { a: 1 })).toBe('/get?a=1')
      expect(buildURl('/get?c=1', { a: 1 })).toBe('/get?c=1&a=1')
      expect(buildURl('/get', { a: [1, 2] })).toBe('/get?a[]=1&a[]=2')
      expect(buildURl('/get', { a: [1, 2], c: null })).toBe('/get?a[]=1&a[]=2')
      expect(buildURl('/get', { a: [1, 2], c: undefined })).toBe('/get?a[]=1&a[]=2')
      const urlParams = new URLSearchParams('a=1')
      expect(buildURl('/get', urlParams)).toBe('/get?a=1')
      const date = new Date()
      expect(buildURl('/get', { a: date })).toBe('/get?a=' + date.toISOString())
      expect(buildURl('/get', { a: { c: 1 } })).toBe('/get?a={"c":1}')
      expect(buildURl('/get#hash', { a: date })).toBe('/get?a=' + date.toISOString())
    })

    test('paramsSerializer', () => {
      const paramsSerializer = jest.fn(() => {
        return 'hecun'
      })
      expect(buildURl('/get', { a: 1 }, paramsSerializer)).toBe('/get?hecun')
    })
  })
})
