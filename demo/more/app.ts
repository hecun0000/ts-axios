import axios from '../../src/index'

const instance = axios.create({
  xsrfHeaderName: 'X-XSRF-TOKEN-D',
  xsrfCookieName: 'XSRF-TOKEN-D'
})

// instance.get('/more/get').then(res => {
//   console.log(res)
// })

// instance.get('/more/get').then(res => {
//   console.log(res)
// })

// instance.get('/more/get', {
//   auth: {
//     username: 'hecun',
//     password: '123456'
//   }
// }).then(res => {
//   console.log(res)
// })

// instance.get('/more/304').then(res => {
//   console.log(res)
// })

// tslint:disable-next-line: no-floating-promises
// instance.get('/more/304', {
//   validateStatus(status) {
//     return status >= 200 && status < 400
//   }
// }).then(res => {
//   console.log(res)
// })

// instance.get('/more/get', {
//   params: {
//     username: 'hecun',
//     password: '123456'
//   }
// }).then(res => {
//   console.log(res)
// })


// instance.get('/more/get', {
//   params: new URLSearchParams('a=b&c=d')
// }).then(res => {
//   console.log(res)
// })


// instance.get('/more/get', {
//   params: {
//     username: 'hecun',
//     password: '123456',
//     arr: [1, 2, 3]
//   },
//   paramsSerializer(params) {
//     return JSON.stringify(params) + 'hecun'
//   }
// }).then(res => {
//   console.log(res)
// })


// const fakeConfig = {
//   baseUrl: 'http://www.baidu.com',
//   url: '/more/get',
//   params: {
//     username: 'hecun',
//     password: '123456',
//     arr: [1, 2, 3]
//   },
// }

const a = instance.get('/more/get')
const b = instance.get('/more/get')

axios.all([a, b]).then(axios.spread(function (a, b) {
  console.log(a.data, b.data)
}))



axios.all([a, b]).then(([a, b]) => {
  console.log(a.data, b.data)
})

// console.log(axios.getUri(fakeConfig))