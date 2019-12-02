import axios, {
  AxiosResponse,
  AxiosError,
  AxiosRequestConfig,
  AxiosTransformer
} from '../src/index'
import { getAjaxRequest } from './helper'

describe('axios 实例方法测试', () => {
  beforeEach(() => {
    jasmine.Ajax.install()
  })

  afterEach(() => {
    jasmine.Ajax.uninstall()
  })

  describe('create 测试', () => {
    test('get 方法', () => {
      const request = axios.create({
        timeout: 300
      })

      request.get('/foo')

      return getAjaxRequest().then(res => {
        expect(res.url).toBe('/foo')
        expect(res.method).toBe('GET')
      })
    })
    test('post 方法', () => {
      const request = axios.create({
        timeout: 300
      })

      request.post('/foo')

      return getAjaxRequest().then(res => {
        expect(res.url).toBe('/foo')
        expect(res.method).toBe('POST')
      })
    })
    test('put 方法', () => {
      const request = axios.create({
        timeout: 300
      })

      request.put('/foo')

      return getAjaxRequest().then(res => {
        expect(res.url).toBe('/foo')
        expect(res.method).toBe('PUT')
      })
    })

    test('delete 方法', () => {
      const request = axios.create({
        timeout: 300
      })

      request.delete('/foo')

      return getAjaxRequest().then(res => {
        expect(res.url).toBe('/foo')
        expect(res.method).toBe('DELETE')
      })
    })

    test('options 方法', () => {
      const request = axios.create({
        timeout: 300
      })

      request.options('/foo')

      return getAjaxRequest().then(res => {
        expect(res.url).toBe('/foo')
        expect(res.method).toBe('OPTIONS')
      })
    })

    test('head 方法', () => {
      const request = axios.create({
        timeout: 300
      })

      request.head('/foo')

      return getAjaxRequest().then(res => {
        expect(res.url).toBe('/foo')
        expect(res.method).toBe('HEAD')
      })
    })

    test('patch 方法', () => {
      const request = axios.create({
        timeout: 300
      })

      request.patch('/foo')

      return getAjaxRequest().then(res => {
        expect(res.url).toBe('/foo')
        expect(res.method).toBe('PATCH')
      })
    })

    test('patch 方法', () => {
      const request = axios.create({
        timeout: 300
      })

      request.patch('/foo')
      return getAjaxRequest().then(res => {
        expect(res.url).toBe('/foo')
        expect(res.method).toBe('PATCH')
      })
    })

    test('getUri 方法', () => {
      const config: AxiosRequestConfig = {
        baseUrl: 'http://hecun.site',
        url: '/foo',
        data: {
          h: 1
        },
        params: {
          a: 1,
          b: {
            a: 'false'
          }
        }
      }

      expect(axios.getUri(config)).toBe('http://hecun.site/foo?a=1&b={"a":"false"}')
    })

    test('transformRequest 方法', done => {
      const request = axios.create({
        timeout: 300,
        transformRequest: [
          function(data) {
            data.hecun = 'test'
            return data
          },
          ...(axios.defaults.transformRequest as AxiosTransformer[])
        ],
        transformResponse: [
          ...(axios.defaults.transformResponse as AxiosTransformer[]),
          function(data) {
            if (typeof data === 'object') {
              data.b = 2
            } else {
              data.c = 4
            }
            return data
          }
        ]
      })
      let responce: AxiosResponse
      request.post('/foo', { a: 1 }).then(res => {
        responce = res
      })
      getAjaxRequest().then(res => {
        res.respondWith({
          status: 200,
          responseText: '{"a": 1}'
        })
      })

      setTimeout(() => {
        expect(responce.data.a).toBe(1)
        expect(responce.data.b).toBe(2)
        done()
      }, 100)
    })
  })
})
