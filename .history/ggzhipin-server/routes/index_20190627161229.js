var express = require('express');
var router = express.Router();

const md5 = require('blueimp-md5')
const {UserModel} = require('../db/model.js')
const filter = {password:0, __v:0}//指定过滤的属性

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


// //注册
// router.post('/register', function(req, res, next) {
//   const {username,password} = req.body
//   if(username ==='admin'){
//     res.send({code:1,msg : '此用户已存在'})
//   }else{
//     res.send({code:0,data:{id:'abc123',username,password}})
//   }
// });


//注册
router.post('/register',function(req,res,next){
    //读取请求的参数数据
    const {username,password,type} = req.body;
    //判断是否存在
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

module.exports = router;
