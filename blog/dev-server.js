/**
 * Created by $ on 2017/11/29.
 */


// usr/local/mongodb/bin/mongod --dbpath=/Users/fanduanduan/Desktop/FRONT-END/node/blog/db
/*
* TODO：require('server.conf').dev开发环境配置
*       require('server.conf').build部署环境设置
* */
process.env.PORT = 9999;
const config = require('./build/server.conf.js').dev;
const port = config.port;
const express = require('express');
const swig = require('swig');//模块引擎
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Cookies = require('cookies');
const path = require('path');
const cp = require('child_process');
const opn = require('opn');
const User = require('./models/user');
//const DB_NAME = 'mongodb://47.96.167.149:27017/usr/local/mongodb/db/blogDB';//连接远mongodb
const DB_NAME = 'mongodb://localhost:27017/db';
//创建app应用 ==》nodeJs 中的http.createServer();
const app = express();

/*
 * 配置模板引擎
 * 定义当前应用所使用的模板引擎
 * 第一个参数：模板的名称，也即是文件的后缀，第二个参数：表示用于解析处理模板内容的方法
 * */
app.engine('html',swig.renderFile);
//设置使用模板的目录，第一个参数必须是views，第二个参数是模板的路径
app.set('views',path.resolve(__dirname,'./views'));
//注册所使用的模板，第一个参数必须是view engine，第二个参数为app.engine这个方法中配置模板名称（第一个参数）
app.set('view engine','html');
//设置swig页面不缓存
swig.setDefaults({
    cache: false,
    tzOffset: false
})

/*bodyParse设置,解析url路径*/
app.use(bodyParser.urlencoded({extended: true}));

/*
 * 设置静态文件托管
 * */
const staticDir = path.posix.join(config.assetsPublicPath,config.assetsSubDirectory);
app.use(staticDir,express.static(__dirname + '/public'));


/*设置cookies*/
app.use(function(req,res,next){
    req.cookies = new Cookies(req,res);
    //解析cookies用户信息
    req.userInfo = {};
    try{
        req.userInfo = JSON.parse(req.cookies.get('userInfo'));
        /!*判断是否是管理员*!/
        User.findById(req.userInfo.id).then(function(user){
            req.userInfo.isAdmin = Boolean(user.isAdmin);
        })
    }catch(e) {
        //清空cookies的情况
        console.log('角色分配出现错误！');
    }
    next();
});

/*
 * 根据不同的功能划分模块
 * 监听http请求
 * 用户发送http - url - 解析路由 - 找到匹配规则 -
 * 指定绑定函数，返回对象内容至用户
 * */
app.use('/',require('./routers/main/main'));//页面跳转
app.use('/api',require('./routers/admin/api'));//后台接口路由
app.use('/admin',require('./routers/admin/admin'));
mongoose.connect(DB_NAME,function(err){
    if(err){
        console.log('**********连接mongoose数据失败**********');
    }else{
        console.info(`  连接mongoose数据成功`);
        app.listen(port);
        console.info(`  local http://localhost:${port}`)
        opn('localhost:' + port + '/');
    }
});
