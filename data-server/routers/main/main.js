/**
 * Created by $ on 2017/11/1.
 */
var express = require('express');
var router = express.Router();
var ContentBase = require('../../models/content');

/*
 * 博客首页
 * */
 router.get('/',function(req,res,next){
     /*从博客列表中读取列表*/
     var limit = 5; //读取的条数
     var page = Number(req.query.page || 1);//当前页数
     var skip = 0; //（当前页-1）*limit 跳过的条数;
     var pages = 0;//总条数
     ContentBase.count().then(function(count){
         pages = Math.ceil(count/limit);
         page = Math.min(page,pages); //page不能超过总页数
         page = Math.max(page,1);     //page不能小于第1页
         skip = (page - 1) * limit;
         ContentBase.find().sort({_id: -1}).limit(limit).skip(skip)
             .then(function(contents){
             if(contents){
                 //返回数据接口
                 let responseData = {
                     code: 1,
                     message: '博客列表查询成功！',
                     data: contents,
                     /*分页组件参数*/
                     count: count,
                     pages: pages,//总页数
                     page: page,//当前页
                     limit: limit,
                     url: '/admin/user'
                 }
                 res.render('main/index',responseData);
             }
         });
     })
 })



/*
* 博客详情
* */
router.get('/list',function(req,res,next){
    var id = req.query._id;
    ContentBase.findOne({_id: id}).then(function(content){
        if(content){
            res.render('main/article_details',{
                userInfo: req.userInfo,
                responseData: {
                    code: 1,
                    message: '博客详情查询成功！',
                    data: content
                }
            });
        }
    });
})

/*
 *@react-blog接口
 *获取博客列表-api
 */
router.post('/queryList',function(req,res,next){
    /*从博客列表中读取列表*/
    var limit = 5; //读取的条数
    var page = Number(req.body.page || 1);//当前页数
    console.log(req.body)
    var skip = 0; //（当前页-1）*limit 跳过的条数;
    var pages = 0;//总条数
    ContentBase.count().then(function(count){
        pages = Math.ceil(count/limit);
        page = Math.min(page,pages); //page不能超过总页数
        page = Math.max(page,1);     //page不能小于第1页
        skip = (page - 1) * limit;
        ContentBase.find().sort({_id: -1}).limit(limit).skip(skip)
            .then(function(contents){
            if(contents){
                //返回数据接口
                let responseData = {
                    code: 1,
                    message: '博客列表查询成功！',
                    data: contents,
                    /*分页组件参数*/
                    count: count,
                    pages: pages,//总页数
                    page: page,//当前页
                    limit: limit,
                    url: '/admin/user'
                }
                res.json(responseData);
            }
        });
    })
})

/*
*@react-blog接口
* 博客详情-api
* */
router.post('/listDetail',function(req,res,next){
    var id = req.body.id;
    ContentBase.findOne({_id: id}).then(function(content){
        if(content){
            responseData = {
                code: 1,
                message: '博客详情查询成功！',
                data: content
            }
            res.json(responseData);
        }
    });
})


module.exports = router;
