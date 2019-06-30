var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/register', function(req, res, next) {
  const {username,password} = req.body
  if(username ==='admin'){
    res.send({code:1,msg : '此用户已存在'})
  }else{
    res.send({code:0,data:{id:'abc123',username,password}})
  }
});

module.exports = router;
