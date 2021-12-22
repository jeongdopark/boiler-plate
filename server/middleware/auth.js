const { User } = require('../models/User')

let auth = (req, res, next) => {
    // 인증 처리를 하는 곳

    // cookie에서 token을 가져온다.
    let token = req.cookies.x_auth;

    // token을 복호화 한후 유저를 찾는다
    User.findByToken(token, (err, user) => {
        if(err) throw err;
        if(!user) return res.json({ isAuth : false, error: true})

        req.token = token
        req.user = user // request에 user와 token정보를 넣어준다.
        next() // next가 없으면 middleware에 갇혀있다.
    })
    // 유저가 있으면 인증 Okay
}

module.exports = { auth };