//md5加密
const md5 = require('blueimp-md5')
//引入mongoose
const mongoose = require('mongoose')

//连接数据库
mongoose.connect('mogodb://localhost:27017/ggzhipin_text')

//获得连接对象
const conn = mongoose.connection

//监听是否完成连接
conn.on('connected',function(){
    console.log('数据库连接成功')
})