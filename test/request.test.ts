import axios, { AxiosResponse, AxiosError } from '../src/index'
import { getAjaxRequest } from './helper'

describe('requests', () => {
  beforeEach(() => {
    jasmine.Ajax.install()
  })

  afterEach(() => {
    jasmine.Ajax.uninstall()
  })

  test('单个 url 参数', () => {
    axios('/foo')
    return getAjaxRequest().then(res => {
      expect(res.url).toBe('/foo')
      expect(res.method).toBe('GET')
    })
  })

  test('将method 转化为小写', () => {
    axios({ url: '/foo', method: 'POST' }).then(response => {
      expect(response.config.method).toBe('post')
    })
    return getAjaxRequest().then(request => {
      request.respondWith({
        status: 200
      })
    })
  })

  test('網絡錯誤', () => {
    const resolveSpy = jest.fn((res: AxiosResponse) => {
      return res
    })

    const rejectSpy = jest.fn((e: AxiosError) => {
      return e
    })

    jasmine.Ajax.uninstall()

    return axios('/foo')
      .then(resolveSpy)
      .catch(rejectSpy)
      .then(next)

    function next(reason: AxiosResponse | AxiosError) {
      expect(resolveSpy).not.toHaveBeenCalled()
      expect(rejectSpy).toHaveBeenCalled()
      expect(reason instanceof Error).toBeTruthy()
      expect((reason as Error).message).toBe('Network Error')
      // expect.any 创建 构造实例
      expect(reason.request).toEqual(expect.any(XMLHttpRequest))
      jasmine.Ajax.install()
    }
  })

  test('網絡超时', done => {
    let err: AxiosError
    axios('/foo', {
      timeout: 2000,
      method: `post`
    }).catch(error => {
      err = error
    })

    getAjaxRequest().then(request => {
      //  @ts-ignore
      request.eventBus.trigger('timeout')

      setTimeout(() => {
        expect(err instanceof Error).toBeTruthy()
        expect(err.message).toBe('Timeout of 2000 ms exceeded')
        done()
      }, 0)
    })
  })

  test('自定义状态码 错误', () => {
    const resolveSpy = jest.fn((res: AxiosResponse) => {
      return res
    })

    const rejectSpy = jest.fn((e: AxiosError) => {
      return e
    })

    axios('/foo', {
      validateStatus(status) {
        return status !== 500
      }
    })
      .then(resolveSpy)
      .catch(rejectSpy)
      .then(next)

    return getAjaxRequest().then(request => {
      request.respondWith({
        status: 500
      })
    })

    function next(reason: AxiosResponse | AxiosError) {
      expect(resolveSpy).not.toHaveBeenCalled()
      expect(rejectSpy).toHaveBeenCalled()
      expect(reason instanceof Error).toBeTruthy()
      expect((reason as AxiosError).message).toBe('Request failed with status code 500')
      expect((reason as AxiosError).request.status).toBe(500)
    }
  })

  test('自定义状态码 正确', () => {
    const resolveSpy = jest.fn((res: AxiosResponse) => {
      return res
    })

    const rejectSpy = jest.fn((e: AxiosError) => {
      return e
    })

    axios('/foo', {
      validateStatus(status) {
        return status === 500
      }
    })
      .then(resolveSpy)
      .catch(rejectSpy)
      .then(next)

    return getAjaxRequest().then(request => {
      request.respondWith({
        status: 500
      })
    })

    function next(res: AxiosResponse | AxiosError) {
      expect(resolveSpy).toHaveBeenCalled()
      expect(rejectSpy).not.toHaveBeenCalled()
      expect(res.config.url).toBe('/foo')
    }
  })
  test('验证 返回 json 数据格式', done => {
    let response: AxiosResponse
    axios('/foo', {
      auth: {
        username: '',
        password: ''
      },
      method: 'post',
      headers: {
        Acceot: 'application/json'
      }
    }).then(res => {
      response = res
    })

    getAjaxRequest().then(request => {
      request.respondWith({
        status: 200,
        statusText: 'OK',
        responseText: '{"errno": 0}'
      })
    })

    setTimeout(() => {
      expect(response.data).toEqual({ errno: 0 })
      done()
    }, 100)
  })
  test('验证 返回 json 数据格式 错误', done => {
    let response: AxiosResponse
    axios('/foo', {
      auth: {
        username: '',
        password: ''
      },
      method: 'post',
      headers: {
        Acceot: 'application/json'
      }
    }).catch(error => {
      response = error.response
    })

    getAjaxRequest().then(request => {
      request.respondWith({
        status: 400,
        statusText: 'Bad Request',
        responseText: '{"errno": 0, "code": 1}'
      })
    })

    setTimeout(() => {
      expect(typeof response.data).toEqual('object')
      expect(response.data.errno).toEqual(0)
      expect(response.data.code).toEqual(1)
      done()
    }, 100)
  })

  test('处理正确响应', done => {
    let response: AxiosResponse
    axios('/foo').then(res => {
      response = res
    })

    getAjaxRequest().then(request => {
      request.respondWith({
        status: 200,
        statusText: 'OK',
        responseText: '{"foo": "bar"}',
        responseHeaders: {
          'Content-Type': 'application/json'
        }
      })
    })

    setTimeout(() => {
      expect(response.data.foo).toBe('bar')
      expect(response.status).toBe(200)
      expect(response.statusText).toBe('OK')
      expect(response.headers['content-type']).toBe('application/json')
      done()
    }, 100)
  })

  test('测试 重写 headers', () => {
    let response: AxiosResponse
    axios
      .post(
        '/foo',
        { prop: 'value' },
        {
          headers: {
            'content-type': 'application/json'
          }
        }
      )
      .then(res => {
        response = res
      })

    getAjaxRequest().then(request => {
      expect(request.requestHeaders['Content-Type']).toBe('application/json')
    })
  })
})
