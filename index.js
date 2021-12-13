// 백엔드의 시작점
const express = require('express') // express 모듈을 가져온다.
const app = express()              // express 앱 생성
const port = 5000                  // 포트
const mongoose = require('mongoose') // mongoose는 mongoDB를 편하게 사용할 수 있게 해주는 tool이다.
const config = require('./config/key');
mongoose.connect(config.mongoURI)
.then(()=> console.log('MongoDB connected ..'))
.catch(err => console.log(err))
// mongoose와 mongoDB를 연결.
const bodyParser = require('body-parser');
const { User } = require("./models/User"); // User model을 불러온다

// application/x-www-form-urlencoded 이런 데이터를 분석해서 가져온다.
app.use(bodyParser.urlencoded({extended:true}));
// application/json을 분석해서 가져온다.
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!!!~!~!')
})

app.post('/register', (req, res) => {
    // 회원 가입 할 때 필요한 정보들을 client에서 가져오면 데이터 베이스에 넣어준다.
    const user = new User(req.body) // req.body 여기에 정보가 담겨있다. body-parser를 사용한 것임.
    user.save((err, userInfo) => {  // save는 mongoose method
        if(err) return res.json({ success : false, err})
        return res.status(200).json({
            success : true
        })
    })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

