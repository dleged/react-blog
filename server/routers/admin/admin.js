/**
 * Created by $ on 2017/11/1.
 */
var express = require('express');
var router = express.Router();
var UserBase = require('../../models/user');
var CategoryBase = require('../../models/category');

//返回统一的对象
var responseData;
router.use(function(req,res,next){
    responseData = {
        code: 0,
        message: ''
    }
    next();
});

/*管理后台首页*/
router.get('/',function(req,res,next){
    res.render('admin/index',{
        userInfo: req.userInfo
    });
})

/**************************************************
 *
 * 用户列表
 *
 ****************************************************/
/*用户列表*/
router.get('/user',function(req,res,next){
    /*从用户数据库中读取用户数据*/
    var limit = 5; //读取的条数
    var page = Number(req.query.page || 1);//当前页数
    var skip = 0; //（当前页-1）*limit 跳过的条数;
    var pages = 0;//总条数
    console.log('**************' + '打开用户列表' + '**************');
    UserBase.count().then(function(count){
        pages = Math.ceil(count/limit);
        page = Math.min(page,pages); //page不能超过总页数
        page = Math.max(page,1);     //page不能小于第1页
        skip = (page - 1) * limit;
        UserBase.find().limit(limit).skip(skip).then(function(users){
            res.render('admin/user_list',{
                userInfo: req.userInfo,
                responseData: {
                    code: 1,
                    message: '用户查询成功！',
                    data: users,
                    /*分页组件参数*/
                    count: count,
                    pages: pages,
                    page: page,
                    limit: limit,
                    url: '/admin/user'
                }
            });
        });
    })
})


/**************************************************
 *
 * 博客类型
 *
 ****************************************************/
/*博客类型添页面*/
router.get('/category/add',function(req,res,next){
    responseData.code = 1;
    res.render('admin/category_add',{
        userInfo: req.userInfo,
        responseData: responseData
    });
})

/*博客类型添加保存*/
router.post('/category/add',function(req,res,next){
    var type = req.body.type;
    var author = req.userInfo.username;
    if(!type){
        responseData.code = 0;
        responseData.message = '分类信息不能为空!';
        return res.render('admin/category_add',{
            userInfo: req.userInfo,
            responseData: responseData
        });
    }else{
        /*分类是否存在*/
        CategoryBase.findOne({type: type}).then(function(category){
            if(category){
                responseData.code = 0;
                responseData.message = '该分类已经存在!';
            }else{
                responseData.code = 1;
                responseData.message = '新增分类成功!';
                var category = new CategoryBase({
                    type: type,
                    author: author
                });
                category.save();
            }
            res.render('admin/category_add',{
                userInfo: req.userInfo,
                responseData: responseData
            });
        });
    }
});

/*博客类型列表查询*/
router.get('/category',function(req,res,next){
    /*从用户数据库中读取用户数据*/
    var limit = 5; //读取的条数
    var page = Number(req.query.page || 1);//当前页数
    var skip = 0; //（当前页-1）*limit 跳过的条数;
    var pages = 0;//总条数
    CategoryBase.count().then(function(count){
        pages = Math.ceil(count/limit);
        page = Math.min(page,pages); //page不能超过总页数
        page = Math.max(page,1);     //page不能小于第1页
        skip = (page - 1) * limit;
        /*
        * sort()：按照字段排序，1顺序，-1倒序
        * */
        CategoryBase.find().sort({_id: -1}).limit(limit).skip(skip).then(function(categorys){
            res.render('admin/category_list',{
                userInfo: req.userInfo,
                responseData: {
                    code: 1,
                    message: '列表查询成功！',
                    data: categorys,
                    /*分页组件参数*/
                    count: count,
                    pages: pages,
                    page: page,
                    limit: limit,
                    url: '/admin/category'
                }
            });
        });
    })
})

/*博客类型删除*/
router.get('/category/delete',function(req,res,next){
    var _id = req.query.id;
    CategoryBase.remove({_id:_id}, function(err){
        if(!err){
            res.redirect('/admin/category')
        }
    });
})

/*博客类型编辑*/
router.post('/category/editor',function(req,res,next){
    var id = req.body.id || '';
    var type = req.body.type || '';

    if(!type){
        responseData.code = 0;
        responseData.message = '分类信息不能为空!';
        res.json({
            userInfo: req.userInfo,
            responseData: responseData
        });
    }

    CategoryBase.findOne({_id: id}).then(function(category){
        /*没有更名保存*/
       if(category.type === type){
           responseData.code = 1;
           responseData.message = '保存成功!';
           return res.json({
               userInfo: req.userInfo,
               responseData: responseData
           });
       }else{
           /*修改过后保存验证,*/
           CategoryBase.findOne({_id: {$ne:id},type:type}).then(function(category){
               if(category){//存在同名
                   responseData.code = 0;
                   responseData.message = '分类名已存在!';
                   return res.json({
                       userInfo: req.userInfo,
                       responseData: responseData
                   });
               }else{
                   /*更改更新*/
                   CategoryBase.update({_id: id},{type: type}).then(function(err){
                       if(!err){
                           responseData.code = 1;
                           responseData.message = '保存成功!';
                           return res.json({
                               userInfo: req.userInfo,
                               responseData: responseData
                           });
                       }
                   })
               }
           });
       }
    })
})


/**************************************************
*
* 博客文章
*
****************************************************/
var contentBase = require('../../models/content');
/*博客文章添加页面*/
router.get('/content/add',function(req,res,next){
    /*编辑入口*/
    var _id = req.query.editor_id || '';
    CategoryBase.find({}).then(function(Category) {//获取分类列表
        if (Category) {
            if (_id) {//编辑-保存，返回博客的信息
                contentBase.find({_id: _id}).then(function (content) {
                    if (content) {
                        res.render('admin/content_add', {
                            userInfo: req.userInfo,
                            responseData: {
                                code: 1,
                                message: '',
                                data: {
                                    Category: Category,
                                    textInfo: content[0]
                                },
                                isEditor: true
                            }
                        })
                    }
                })
            } else {
                //新增-保存，直接渲染页面
                res.render('admin/content_add', {
                    userInfo: req.userInfo,
                    responseData: {
                        code: 1,
                        message: '',
                        data: {
                            Category: Category
                        }
                    }
                })
            }
        }
    })
})

/*博客文章添加&&编辑保存*/
router.post('/content/add',function(req,res,next){
    var title   = req.body.title || '';
    var type    = req.body.type || '';
    var mark    = req.body.mark || '';
    var content = req.body.content || '';
    var info    = req.body.info || '';
    var contentSave = new contentBase({
        title: title,
        type: type,
        mark: mark,
        content: content,
        author: req.userInfo.username,
        info: info
    });
    /*编辑-保存入口*/
    var _id = req.body.id || '';//如果存在参数传递博客id,则为编辑的保存
    if(_id){
        contentBase.update({_id:_id},{
            title: title,
            type: type,
            mark: mark,
            content: content,
            author: req.userInfo.username
        }).then(function(content){

            if(content){
                responseData.code = 1;
                responseData.message = '修改博客成功';
                res.json({
                    serInfo: req.userInfo,
                    responseData: responseData
                });
                console.log({
                    serInfo: req.userInfo,
                    responseData: responseData
                })
            }
        });
        return;
    }else{
        /*添加-保存入口*/
        contentSave.save().then(function(content,err){
            if(content){
                responseData.code = 1;
                responseData.message = '新增博客成功';
            }else{
                responseData.code = 0;
                responseData.message = '新增博客失败';
            }
            res.json({
                serInfo: req.userInfo,
                responseData: responseData
            });
        });
    }
})

/*博客文章列表*/
router.get('/content',function(req,res,next){
    /*从用户数据库中读取用户数据*/
    var limit = 5; //读取的条数
    var page = Number(req.query.page || 1);//当前页数
    var skip = 0; //（当前页-1）*limit 跳过的条数;
    var pages = 0;//总条数
    contentBase.count().then(function(count){
        pages = Math.ceil(count/limit);
        page = Math.min(page,pages); //page不能超过总页数
        page = Math.max(page,1);     //page不能小于第1页
        skip = (page - 1) * limit;
        /*
         * sort()：按照字段排序，1顺序，-1倒序
         * */
        contentBase.find().sort({_id: -1}).limit(limit).skip(skip).then(function(categorys){
            res.render('admin/content_list',{
                userInfo: req.userInfo,
                responseData: {
                    code: 1,
                    message: '列表查询成功！',
                    data: categorys,
                    /*分页组件参数*/
                    count: count,
                    pages: pages,
                    page: page,
                    limit: limit,
                    url: '/admin/content'
                }
            });
        });
    })
})

/*博客文章删除*/
router.get('/content/delete',function(req,res,next){
    var _id = req.query.id;
    contentBase.remove({_id:_id}, function(err){
        if(!err) {
            res.redirect('/admin/content')
        }
    });
})

/**************************************************
 *
 * 博客评论
 *
 ****************************************************/


module.exports = router;
