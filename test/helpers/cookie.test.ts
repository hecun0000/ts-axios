import cookie from '../../src/helper/cookie'

describe('helpers:cookie', () => {
  test('验证 读取 cookie', () => {
    document.cookie = 'a=b'
    expect(cookie.read('a')).toBe('b')
  })

  test('验证 读取 cookie 读取 空值', () => {
    document.cookie = 'a=b'
    expect(cookie.read('c')).toBeNull()
  })
})
