import axios, { AxiosTransformer } from '../../src/index'
import * as qs from 'qs'

axios.defaults.headers.common['test'] = 123
axios.defaults.headers.common['testd'] = 123

axios({
  url: '/config/post',
  method: 'post',
  headers: {
    test: '111',
    sss: '444'
  },
  data: qs.stringify({ a: 111 })
}).then(res => {
  console.log(res)
})


axios({
  transformRequest: [
    (function (data) {
      return qs.stringify(data)
    }),
    ...(axios.defaults.transformRequest as AxiosTransformer[])
  ],
  transformResponse: [
    ...(axios.defaults.transformResponse as AxiosTransformer[]),
    function (data) {
      if (typeof data === 'object') {
        data.b = 2
      } else {
        data.c = 4
      }
      return data
    }
  ],
  url: '/config/post',
  method: 'post',
  headers: {
    test: '111',
    sss: '444'
  },
  data: {
    a: 'sssss'
  }
}).then(res => {
  console.log(res.data)
})



const request = axios.create({
  transformRequest: [
    (function (data) {
      return qs.stringify(data)
    }),
    ...(axios.defaults.transformRequest as AxiosTransformer[])
  ],
  transformResponse: [
    ...(axios.defaults.transformResponse as AxiosTransformer[]),
    function (data) {
      if (typeof data === 'object') {
        data.b = 2
      } else {
        data.c = 4
      }
      return data
    }
  ]
})

request({
  url: '/config/post',
  method: 'post',
  headers: {
    test: '111',
    sss: '444'
  },
  data: {
    a: 'sssss'
  }
}).then(res => {
  console.log(res.data)
})