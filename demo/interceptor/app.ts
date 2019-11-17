import axios from '../../src/index'


axios.interceptors.request.use(config => {
  config.headers.test += `1`
  console.log(22222,config)
  return config
})

axios.interceptors.request.use(config => {
  config.headers.test += '2'
  return config
})

axios.interceptors.request.use(config => {
  config.headers.test += '3'
  return config
})


axios.interceptors.response.use(res => {
  res.data += `1`
  return res
})

let interceptors = axios.interceptors.response.use(res => {
  res.data += '2'
  return res
})

axios.interceptors.response.use(res => {
  res.data += '3'
  return res
})

axios.interceptors.response.eject(interceptors)

axios({
  url: '/interceptor/get',
  method: 'get',
  headers: {
    test: '111'
  }
}).then(res => {
  console.log(res.data)
})
