import axios from '../../src/index'

//  post
axios({
  method: 'post',
  url: '/extend/post',
  data: {
    msg: 'hi'
  }
}).then(res => {
  console.log(res)
})

axios('/extend/post', {
  method: 'post',
  data: {
    msg: 'hi---ssss'
  }
}).then(res => {
  console.log(res)
})


axios.request({
  method: 'post',
  url: '/extend/post',
  data: {
    msg: 'hello'
  }
}).then(res => {
  console.log(res)
})

function test1() {
  return new Promise(resolve=>{
    resolve()
  })
}

test1()

axios.get('/extend/get')
axios.options('/extend/options')
axios.delete('/extend/delete')
axios.delete('/extend/delete')
axios.head('/extend/head')

axios.post('/extend/post', { msg: 'post' })
axios.put('/extend/put', { msg: 'put' })
axios.patch('/extend/patch', { msg: 'patch' })


interface ResponseData<T> {
  code: number
  result: T
  message: string
}

interface User {
  name: string
  age: number
}

function getUser<T>() {
  return axios<ResponseData<T>>('/extend/user')
    .then(res => res.data)
    .catch(err => console.error(err))
}

async function test() {
  const user = await getUser<User>()
  if (user) {
    console.log(user.result.name)
  }
}

test()