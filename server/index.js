// 백엔드의 시작점
const express = require('express') // express 모듈을 가져온다.
const app = express()              // express 앱 생성
const port = 5000                  // 포트
const mongoose = require('mongoose') // mongoose는 mongoDB를 편하게 사용할 수 있게 해주는 tool이다.
const config = require('./config/key');
const cookieParser = require('cookie-parser')
const { auth } = require('./middleware/auth')
mongoose.connect(config.mongoURI)
.then(()=> console.log('MongoDB connected ..'))
.catch(err => console.log(err))
// mongoose와 mongoDB를 연결.
const bodyParser = require('body-parser');
const { User } = require("./models/User"); // User model을 불러온다
const { cookie } = require('express/lib/response');

// application/x-www-form-urlencoded 이런 데이터를 분석해서 가져온다.
app.use(bodyParser.urlencoded({extended:true}));
// application/json을 분석해서 가져온다.
app.use(bodyParser.json());
app.use(cookieParser());


app.get('/', (req, res) => {
  res.send('Hello World!!!~!~!')
})

app.get('/api/hello', (req, res) => {
    res.send('안녕하세요~')
})

app.post('/api/users/register', (req, res) => {
    // 회원 가입 할 때 필요한 정보들을 client에서 가져오면 데이터 베이스에 넣어준다.
    const user = new User(req.body) // req.body 여기에 정보가 담겨있다. body-parser를 사용한 것임.
    user.save((err, userInfo) => {  // save는 mongoose method
        if(err) return res.json({ success : false, err})
        return res.status(200).json({
            success : true
        })
    })
})

app.post('/api/users/login', (req, res) => {
    // 요청된 이메일을 데이터베이스에서 있는지 찾는다. 비밀번호가 같은지 확인한다. 비밀번호까지 같다면 Token 생성한다.
    User.findOne({ email: req.body.email }, (err, user) =>{     // mongoDB method
        if(!user){
            return res.json({
                loginSuccess: false,
                message: "제공된 이메일에 해당하는 유저가 없습니다."
            })
        }
        // comparePassword method를 생성해서 사용한다. 
        user.comparePassword(req.body.password, (err, isMatch) => {
            if(!isMatch)
                return res.json({ loginSuccess : false, message : "비밀번호가 틀렸습니다"})

                // 비밀번호가 일치하면 토큰 생성
            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);
                // 토큰을 저장한다.  쿠키에 저장 localstorage도 가능 여러 곳에 저장 가능하다.
                res.cookie("x_auth", user.token)
                .status(200)
                .json({loginSuccess: true, userId: user._id})
            })
        })
    })
})

app.get('/api/users/auth', auth, (req, res) => {

    // 여기까지 미들웨어를 통과해 왔다는 얘기는 Authenticatino이 True라는 의미
    res.status(200).json({
        _id : req.user.id,
        isAdmin : req.user.role === 0 ? false : true,
        isAuth : true,
        email : req.user.email,
        lastname : req.user.lastname,
        role : req.user.role,
        image : req.user.image
    })
})

app.get('/api/users/logout', auth, (req, res) => {
    User.findOneAndUpdate({_id: req.user._id}, 
        {token: ""}
        ,(err, user) => {
            if (err) return res.json({ success : false, err});
            return res.status(200).send({
                success : true
            })
        })
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

