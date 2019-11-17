import axios from '../../src/index'

//  数组格式
axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: [
      'bar',
      'baz'
    ]
  }
})

// 时间格式
axios({
  method: 'get',
  url: '/base/get',
  params: {
    date: new Date()
  }
})

// 对象格式
axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: {
      baz:'baz'
    }
  }
})

// 特使字符
axios({
  method: 'get',
  url: '/base/get',
  params: {
    a: '[%$#,; ] '
  }
})

// 空值
axios({
  method: 'get',
  url: '/base/get',
  params: {
    a: null,
    b: undefined,
    c: 1
  }
})

// 存在哈希
axios({
  method: 'get',
  url: '/base/get#base',
  params: {
    a: 1,
    b: 2
  }
})

// 已经存在参数
axios({
  method: 'get',
  url: '/base/get?c=3',
  params: {
    a: 1,
    b: 2
  }
})

