/**
 * Created by $ on 2017/11/1.
 */
var express = require('express');
var UserBase = require('../../models/user');
var router = express.Router();

//返回统一的对象
var responseData;
router.use(function(req,res,next){
    responseData = {
        code: 0,
        message: ''
    }
    next();
});


/*
*   1.注册逻辑
*   2.用户名不能为空
*   3.密码不能为空
*   4.两次密码必须一致
*   5.用户名是否被注册-数据库查询
* */
router.post('/user/register',function(req,res,next){
    var json = req.body;
    var username = json.username;
    var password = json.password;
    var repassword = json.repassword;
    // 查找表username值是否唯一
    UserBase.findOne({ username: username }).then( function(character) {
        if(character){
            responseData.message = '用户已存在！';
            res.json(responseData);
            return;
        }
        var user = new UserBase({username:username,password:password});
        return user.save();
    }).then(function(userInfo){
        if(userInfo){
            responseData.code = 1;
            responseData.message = '注册成功！';
            res.json(responseData);
        }
    });
});

/*用户登陆*/
router.post('/user/login',function(req,res,next){
    var json = req.body;
    var username = json.username;
    var password = json.password;
    // 查找表username值是否唯一
    UserBase.findOne({ username: username }).then( function(character) {
        if(!character){
            responseData.code = 0;
            responseData.message = '用户不存在！';
            res.json(responseData);
            return;
        }
        if(character.password === password){
            responseData.code = 1;
            responseData.message = '登陆成功！';
            responseData.info = {
                id: character.id,
                username: character.username
            }
            req.cookies.set('userInfo',JSON.stringify(responseData.info));
            res.json(responseData);
        }else{
            responseData.code = 0;
            responseData.message = '密码错误！';
            res.json(responseData);
        }

    });
})

/*用户退出*/
router.get('/user/logout',function(req,res,next){
    req.cookies.set('userInfo',null);
    responseData.code = 1;
    responseData.message = '退出成功！';
    res.json(responseData);
})

module.exports = router;