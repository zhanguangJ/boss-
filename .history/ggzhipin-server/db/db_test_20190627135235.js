//md5加密
const md5 = require('blueimp-md5')
//引入mongoose
const mongoose = require('mongoose')
//连接数据库
mongoose.connect('mongodb://localhost:27017/ggzhipin_text')

//获得连接对象
const conn = mongoose.connection

//监听是否完成连接
conn.on('connected',function(){
    console.log('数据库连接成功')
})

//Schema规则
const userSchema = mongoose.Schema({
    username : {type : String, require : true},//用户名
    password : {type : String, require : true},//密码
    type : {type : String, require : true},//用户类型
    header : {type : String}
})

//定义Model(与集合对应，可以操作集合)
const UserModel = mongoose.model('user',userSchema) 

//通过Model或其实例对集合数据进行 CURD 操作
function testSave(){
    //创建UserModel的实例
    const userModel = new UserModel({username : 'Bob', password : md5('123456'), type : 'dashen' })
    userModel.save(function(error,user){
        console.log('save()',error,user)
    })
}
testSave()