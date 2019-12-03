import axios, {
  AxiosResponse,
  AxiosError,
  AxiosRequestConfig,
  AxiosTransformer
} from '../src/index'
import { getAjaxRequest } from './helper'

describe('mergeConfig', () => {
  beforeEach(() => {
    jasmine.Ajax.install()
  })

  afterEach(() => {
    jasmine.Ajax.uninstall()
  })

  describe('mergeConfig', () => {
    test('参数合并 方法', done => {
      const config: AxiosRequestConfig = {
        baseUrl: 'http://hecun.site',
        timeout: 300,
        headers: {
          post: {
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
            timeout: 100,
            headers: {
              hecun: 'jy',
              'content-type': 'application/json'
            }
          }
        )
        .then(res => {
          setTimeout(() => {
            expect(res.config.headers.hecun).toBe('jy')
            expect(res.config.timeout).toBe(100)
            expect(res.config.headers['Content-Type']).toBe('application/json')
            done()
          }, 200)
        })

      getAjaxRequest().then(res => {
        res.respondWith({
          status: 200
        })
      })
    })
  })
})
