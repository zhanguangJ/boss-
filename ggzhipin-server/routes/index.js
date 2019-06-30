var express = require('express');
var router = express.Router();

const md5 = require('blueimp-md5')
const {UserModel,ChatModel} = require('../db/model.js')
const filter = {password:0, __v:0}//指定过滤的属性

//注册
router.post('/register',function(req,res){
    //读取请求的参数数据
    // console.log(req.body)
    const {username,password,type} = req.body;
    //判断是否存在
    // console.log(username)
    UserModel.findOne({username},function(err,user){
      if(user){
        res.send({code : 1, msg : '此用户已存在'})
      }else{
        //保存到数据库
        new UserModel({username, type, password: md5(password)}).save(function(err,user){
          //生成一天的Cookie
          res.cookie('userid',user._id,{maxAge:1000*60*60*24})
          //返回数据
          const data = {username, type, _id : user._id }
          res.send({code:0,data})
        })
      }
    })
    
})

//登录
router.post('/login',function(req,res){
  const {username,password} = req.body
  //查询数据库
  UserModel.findOne({username,password:md5(password)},filter,function(err,user){
    if(user){
      //生成一天的Cookie
      res.cookie('userid',user._id,{maxAge:1000*60*60*24})
      //返回登录的信息
      res.send({code:0,data:user})
    }else{
      res.send({code:1,msg:'用户名或密码不正确！'})
    }
  })
})

//更新用户信息
router.post('/update',function(req,res){
  //从请求的cookie得到userid
  const userid = req.cookies.userid;
  //不存在就返回一个提示信息
  if(!userid){
    return res.send({code:1,msg:'请先登录'})
  }
  //存在
  const user = req.body
  UserModel.findByIdAndUpdate({_id:userid},user,function(err,olduser){
    if(!olduser){
      //如果不存在，删除cookie
      res.clearCookie('userid')
      res.send({code:1,msg:'请先登录'})
    }else{
      const {_id,usernam,type} = olduser
      const data = Object.assign({_id,usernam,type},user)
      res.send({code:0,data})
    }
  })

})

// 获取用户信息的路由(根据cookie中的userid)
router.get('/user',function(req,res){
   //从请求的cookie得到userid
   const userid = req.cookies.userid;
   //不存在就返回一个提示信息
   if(!userid){
     return res.send({code:1,msg:'请先登录'})
   } 
   // 根据userid查询对应的user
  UserModel.findOne({_id: userid}, filter, function (error, user) {
    if(user) {
      res.send({code: 0, data: user})
    } else {
      // 通知浏览器删除userid cookie
      res.clearCookie('userid')
      res.send({code: 1, msg: '请先登录'})
    }

  })
})

// 获取用户列表(根据类型)
router.get('/userlist', function (req, res) {
  const {type} = req.query
  UserModel.find({type}, filter, function (error, users) {
    res.send({code: 0, data: users})
  })
})


/*
获取当前用户所有相关聊天信息列表
 */
router.get('/msglist', function (req, res) {
  // 获取cookie中的userid
  const userid = req.cookies.userid
  // 查询得到所有user文档数组
  UserModel.find(function (err, userDocs) {
    // 用对象存储所有user信息: key为user的_id, val为name和header组成的user对象
    /*const users = {} // 对象容器
    userDocs.forEach(doc => {
      users[doc._id] = {username: doc.username, header: doc.header}
    })*/

    const users = userDocs.reduce((users, user) => {
      users[user._id] = {username: user.username, header: user.header}
      return users
    } , {})
    /*
    查询userid相关的所有聊天信息
     参数1: 查询条件
     参数2: 过滤条件
     参数3: 回调函数
    */
    ChatModel.find({'$or': [{from: userid}, {to: userid}]}, filter, function (err, chatMsgs) {
      // 返回包含所有用户和当前用户相关的所有聊天消息的数据
      res.send({code: 0, data: {users, chatMsgs}})
    })
  })
})


//修改指定消息为已读
router.post('/readmsg',function(req,res){
  const from = req.body.from
  const to = req.cookies.userid

  /* 更 新 数 据 库 中 的 chat
数 据
参 数 1:
查 询 条 件
参 数 2:
更 新 为 指 定 的 数 据 对 象
参 数 3:
是 否 1
次 更 新 多 条 ,
默 认 只 更 新 一 条
参 数 4:
更 新 完 成 的 回 调 函 数
*/ 
  ChatModel.update({from,to,read:false},{read:true},{multi:true},function(err,doc){
    console.log('/readmsg',doc)
    res.send({code:0,data:doc.nModified})//更新数量
  })
})

module.exports = router;
 