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
    test('getUri 方法', done => {
      const config: AxiosRequestConfig = {
        baseUrl: 'http://hecun.site',
        post: {
          headers: {
            hecun: 'test'
          }
        }
      }

      const request = axios.create(config)

      request
        .post(
          '/foo',
          {},
          {
            headers: {
              hecun: 'jy',
              'content-type': 'application/json'
            }
          }
        )
        .then(() => {
          done()
        })

      getAjaxRequest().then(res => {
        setTimeout(() => {
          expect(res.requestHeaders.hecun).toBe('jy')
          expect(res.requestHeaders['Content-Type']).toBe('application/json')
        }, 200)

        res.respondWith({
          status: 200
        })
      })
    })
  })
})
