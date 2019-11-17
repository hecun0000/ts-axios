import axios from '../../src/index'

//  post
axios({
  method: 'post',
  url: '/post',
  data: {
    foo: 12222
  }
})

//  
axios({
  method: 'post',
  url: '/post',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json, text/plain, */*'
  },
  data: {
    foo: 2233
  }
})
