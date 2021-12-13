// Schema란 ?
const mongoose = require('mongoose');
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

const User = mongoose.model('User', userSchema) // schema를 model로 감싸준다. 

module.exports = { User }   // model을 다른 곳에서도 사용할 수 있도록 exports 해준다.