// 환경변수 local환경에서와 deploy한 후, 두 가지 경우 따로 생각을 해줘야한다. NODE.ENV -> 환경변수
if(process.env.NODE.ENV === 'production'){ 
    module.exports = require('./prod');
} else {
    module.exports = require('./dev');
}