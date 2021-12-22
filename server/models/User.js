// Schema란 ?
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10 //salt 자리수
const jwt = require('jsonwebtoken');
const userSchema = mongoose.Schema({
    name : {
        type : String,
        maxlength : 50
    },
    email : {
        type : String,
        trim : true, // 공백을 없애주는 역할
        unique : 1
    },
    password : {
        type : String,
        minlength : 5
    },
    lastname : {
        type : String,
        maxlength : 30
    },
    role : {
        type : Number,
        default : 0
    },
    image : String,
    token : { // 유효성 관리
        type : String 
    },
    tokenExp : {
        type : Number
    }
})

// mongoose method 'pre'method 'save'전 단계에서 수행할 때
userSchema.pre('save', function( next ){
    //비밀 번호를 암호화 시킨다., salt를 이용하여 비밀번호를 암호화한다. salt를 생성해야함.
    const user = this;
    if(user.isModified('password')){
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) return next(err)
            bcrypt.hash(user.password, salt, function(err, hash) {  // myPlaintextPassword 암호화 전 비밀번호
                if(err) return next(err)
                user.password = hash
                next()
            })
        })
    }
    else{
        next()
    }
})

userSchema.methods.comparePassword = function(plainPassword, cb){
    // plainPassword 와 암호화된 비밀번호를 비교한다. plainPassword를 암호화한뒤 dB에 있는 비밀번호와 같은지 비교
    // 암호화된 passWord는 복구할 수 없다. 
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(err) return cb(err);
        cb(null, isMatch)
    })
}

userSchema.methods.generateToken = function(cb){
    const user = this;
    // jsonWebtoken을 사용하여 token 생성하기.
    const token = jwt.sign(user._id.toHexString(), 'secretToken')

    user.token = token
    user.save(function(err, user){
        if(err) return cb(err)
        cb(null, user)
    })
}
userSchema.statics.findByToken = function(token, cb) {
    var user = this;
    
    //토큰을 decode한다.
    jwt.verify(token, 'secretToken', function(err, decoded) {
        //유저 아이디를 이용해서 유저를 찾은 다음에 클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인
        // findOne -> mongoDB method
        user.findOne({"_id":decoded, "token":token}, function(err, user){
            if(err) return cb(err);
            cb(null, user)
        })
    })
}
const User = mongoose.model('User', userSchema) // schema를 model로 감싸준다. 

module.exports = { User }   // model을 다른 곳에서도 사용할 수 있도록 exports 해준다.