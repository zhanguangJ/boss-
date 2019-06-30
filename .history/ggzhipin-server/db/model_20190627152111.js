/* 包 含 n个 能 操 作 mongodb数 据 库 集 合 的 model的 模 块
*/

//引入mongoose 
const mongoose = require('mongoose')
//连接数据库 
mongoose.connect('mongodb://localhost:27017//ggzhipin')
//获取连接对象
const conn = mogoose.connection

//监听是否完成连接
conn.on('connected',function(){
    console.log('数据库连接成功')
})
//定义出对应特定集合的Model并向外暴露、
//Schema规则
const userSchema = mongoose.Schema({
    username : {type : String, require : true},//用户名
    password : {type : String, require : true},//密码
    type : {type : String, require : true},//用户类型
    header : {type : String},//头像名称
    post : {type : String},//职位
    info : {type : String},//个人信息
    company : {type : String},//公司名称
    salary : {type : String}//月薪
})

//定义Model(与集合对应，可以操作集合)
const UserModel = mongoose.model('user',userSchema)

//向外暴露Model
exports.UserModel = UserModel
