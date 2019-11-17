import axios from '../../src/index'

//  post
axios({
  method: 'post',
  url: '/post',
  data: {
    foo: 12222
  }
}).then(res => {
  console.log(res)
})

//  
axios({
  method: 'post',
  url: '/post/buffer',
  responseType: 'json',
  data: new Uint16Array([22, 33])
}).then(res => {
  console.log(res, 'dddddd')
})
