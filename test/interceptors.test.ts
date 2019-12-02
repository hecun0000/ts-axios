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
    test('拦截器测试', () => {
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
        response.data.hecun = 'jy'
        return response
      })
      let response: AxiosResponse
      request.get('/foo').then(res => {
        response = res
      })

      getAjaxRequest().then(res => {
        res.respondWith({
          status: 200
        })
        setTimeout(() => {
          expect(response.config.timeout).toBe(300)
          expect(response.config.withCredentials).toBeFalsy()
          expect(response.config.headers.test).toBe('hecun')
          expect(response.data.hecun).toBe('jy')
        })
      })
    })

    test('拦截器 删除', () => {
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
      request.get('/foo').then(res => {
        response = res
      })

      getAjaxRequest().then(res => {
        res.respondWith({
          status: 200
        })
        setTimeout(() => {
          expect(res.url).toBe('http://hecun.site/foo')
          expect(response.config.timeout).toBe(300)
          expect(response.config.withCredentials).toBeFalsy()
          expect(response.data.hecun).toBeUndefined()
        })
      })
    })
  })
})
