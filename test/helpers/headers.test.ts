import { processHeaders, flattenHeaders, parseHeaders } from '../../src/helper/headers'

describe('helpers:headers', () => {
  describe('parseHeaders', () => {
    test('处理响应 headers 转化', () => {
      const res = parseHeaders(
        'Cache-Control: public, max-age=0\r\n' +
          'Connection: keep-alive\r\n' +
          'Content-Length: 311\r\n' +
          'Content-Type: text/html; charset=UTF-8\r\n' +
          'key\r\n' +
          ':aa\r\n' +
          'hecun: 1 \r\n' +
          'hecun1:\r\n' +
          'Date: Sun, 01 Dec 2019 02:43:29 GMT'
      )
      expect(res['cache-control']).toBe('public, max-age=0')
      expect(res['connection']).toBe('keep-alive')
      expect(res['date']).toEqual('Sun, 01 Dec 2019 02:43:29 GMT')
      expect(res['key']).toBeUndefined()
      expect(res['hecun']).toEqual('1')
      expect(res['hecun1']).toBeUndefined()
      expect(parseHeaders('')).toEqual({})
    })
  })

  describe('processHeaders', () => {
    test('处理请求 headers 配置', () => {
      expect(processHeaders({}, {})['Content-Type']).toEqual('application/json;charset=utf-8')

      expect(processHeaders(undefined, {})).toBeUndefined()

      expect(processHeaders(undefined, null)).toBeUndefined()

      const headers = {
        'Content-Type': 'application/json'
      }

      expect(processHeaders(headers, {})['Content-Type']).toEqual('application/json')
      const headers1 = {
        'contENT-Type': 'application/json'
      }
      expect(processHeaders(headers1, {})['Content-Type']).toEqual('application/json')
    })
  })

  describe('flattenHeaders', () => {
    test('处理请求 headers 合并', () => {
      expect(flattenHeaders({}, 'post')).toEqual({})
      expect(flattenHeaders(null, 'post')).toBeNull()
      expect(
        flattenHeaders(
          {
            post: {
              'Content-Type': 'application/json'
            }
          },
          'post'
        )
      ).toEqual({
        'Content-Type': 'application/json'
      })
      expect(
        flattenHeaders(
          {
            hecun: 'hecun',
            post: {
              'Content-Type': 'application/json'
            }
          },
          'post'
        )
      ).toEqual({
        hecun: 'hecun',
        'Content-Type': 'application/json'
      })
    })
  })
})
