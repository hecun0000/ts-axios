import axios, { AxiosResponse, AxiosError, AxiosRequestConfig } from '../src/index'
import { getAjaxRequest } from './helper'

describe('axios 实例方法测试', () => {
  beforeEach(() => {
    jasmine.Ajax.install()
  })

  afterEach(() => {
    jasmine.Ajax.uninstall()
  })

  describe('request 拦截测试', () => {
    test('拦截器测试', done => {
      const request = axios.create({
        timeout: 300
      })
      request.interceptors.request.use(config => {
        config.timeout = 2000
        return config
      })

      request.interceptors.request.use(config => {
        config.headers.test = 'hecun'
        config.withCredentials = true
        return config
      })

      request.interceptors.response.use(response => {
        response.data.errno += 'jy'
        // response.data.hecun = 'jy'
        return response
      })
      let response: AxiosResponse
      request
        .get('/foo')
        .then(res => {
          response = res
        })
        .then(next)

      getAjaxRequest().then(res => {
        res.respondWith({
          status: 200,
          responseText: '{"errno": 0}'
        })
      })

      function next() {
        expect(response.config.timeout).toBe(2000)
        expect(response.config.withCredentials).toBeTruthy()
        expect(response.config.headers.test).toBe('hecun')
        expect(response.data.errno).toBe('0jy')
        done()
      }
    })

    test('拦截器 删除', done => {
      const request = axios.create({
        baseUrl: 'http://hecun.site',
        timeout: 300
      })
      request.interceptors.request.use(config => {
        config.timeout = 2000
        return config
      })

      request.interceptors.request.use(config => {
        config.withCredentials = true
        return config
      })

      const id = request.interceptors.response.use(response => {
        response.data.hecun = 'jy'
        return response
      })
      request.interceptors.response.eject(id)
      request.interceptors.response.eject(5)
      let response: AxiosResponse
      request
        .get('/foo')
        .then(res => {
          response = res
        })
        .then(next)

      getAjaxRequest().then(res => {
        expect(res.url).toBe('http://hecun.site/foo')
        res.respondWith({
          status: 200
        })
      })

      function next() {
        expect(response.config.timeout).toBe(2000)
        expect(response.config.withCredentials).toBeTruthy()
        expect(response.data.hecun).toBeUndefined()
        done()
      }
    })
  })
})
