// 백엔드의 시작점

const express = require('express') // express 모듈을 가져온다.
const app = express()              // express 앱 생성
const port = 3000                  // 포트
const mongoose = require('mongoose') // mongoose는 mongoDB를 편하게 사용할 수 있게 해주는 tool이다.
mongoose.connect('mongodb+srv://jeongdo:abcd1234@boilerplate.dzgjh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
.then(()=> console.log('MongoDB connected ..'))
.catch(err => console.log(err))
// mongoose와 mongoDB를 연결.


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

