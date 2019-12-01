import { createError } from '../../src/helper/error'
import { AxiosRequestConfig, AxiosResponse } from '../../src/types'

describe('helpers:error', () => {
  test('创建一个 error ', () => {
    const request = new XMLHttpRequest()
    const config: AxiosRequestConfig = { method: 'post' }
    const response: AxiosResponse = {
      status: 200,
      statusText: 'ok',
      headers: null,
      request,
      config,
      data: {
        a: 2
      }
    }
    const error = createError('boom', config, 'code', request, response)
    expect(error instanceof Error).toBeTruthy()
    expect(error.message).toBe('boom')
    expect(error.config).toBe(config)
    expect(error.request).toBe(request)
    expect(error.response).toBe(response)
  })
})
