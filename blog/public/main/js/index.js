/**
 * Created by $ on 2017/11/1.
 */
!function($,doc,global){
    'user strict'
    var userLogin = './api/user/';
    var BLOG = BLOG || {};
    var _ = BLOG;
    _.register = {
        event : function(ele,type,fn){
            $(doc).on(type,ele,fn);
        }
    }
    _.eventsMap = [
        {
            info: '注册或者登陆模块',
            stackClass: '.blog-register-btn',
            type: 'click',
            onFn: loginAndRes
        },
        {
            info: '登陆按钮',
            stackClass: '.headerv-login',
            type: 'click',
            onFn: showLogin
        },
        {
            info: '注册和登陆切换',
            stackClass: '.forget-reg .reg',
            type: 'click',
            onFn: toggleLoginAndRes
        },
        {
            info: '退出登陆',
            stackClass: '.headerv-logout',
            type: 'click',
            onFn: logout
        }
    ]

    /*注册句柄事件*/
    function showLogin(){
        var temp = getTemplate('logAndReg');//获取登陆和注册字符串模板
        var modalv = new ModalV('登录或注册',temp);
    }
    function logout(){
        console.log(userLogin + 'logout');
        $.ajax({
            type: 'get',
            url: userLogin + 'logout',
            success: function(data){
                if(data.message){
                    location.reload();
                }
            }
        })
    }

    function loginAndRes(){
        var status = $(this).attr('blog-status');
        loginAndResFns.status = status;
        var tipText = loginAndResFns.Verifica();
        if(tipText){
            loginAndResFns.tipFn(tipText);
            return ;
        }else{
            var data = loginAndResFns.getFrom();
            loginAndResFns.doPost(data,userLogin + status);
        }
    }

    /*注册和登陆方法*/
    var loginAndResFns = {
        status: 'login',
        regesterBox: $('.login-regester'),
        dataDom:{
            username: '#username',
            password: '#password',
            repassword: '#repassword',
            tips: '.box-input-tips',
            btn: '.blog-register-btn',
            reg: '.forget-reg .reg',
            headervUser: '.headerv-user'
        },
        Verifica: function(){
            var validator = new Validator();
            validator.addRule('username',[{
                strategy: 'isEmpty',
                errorMsg: '用户名不能为空'
            }]);
            validator.addRule('password',[{
                strategy: 'isEmpty',
                errorMsg: '密码名不能为空'
            }]);
            if(loginAndResFns.status === 'resgister'){
                validator.addRule('password repassword',[{//需要传2个dom
                    strategy: 'isSame',
                    errorMsg: '两次输入密码不相同'
                }]);
            }
            return validator.start();
        },
        getFrom: function(){
            var doms = loginAndResFns.dataDom;
            var data = {
                username: $(doms.username).val(),
                password: $(doms.password).val()
            }
            if(loginAndResFns.status === 'resgister'){
                data.repassword = $(doms.repassword).val();
            }
            return data;
        },
        tipFn: function(text){
            var tip = $(loginAndResFns.dataDom.tips);
            tip.text(text);
            setTimeout(function(){
                tip.text('');
            },2000)
        },
        doPost: function(data,url){
            $.ajax({
                type: 'post',
                url: url,
                data: data,
                dataType: 'json',
                success: function(data){
                    var code = data.code;
                    if(code){
                        loginAndResFns.doSuccess(data.username);
                    }
                    loginAndResFns.tipFn(data.message);
                }
            });
        },
        doSuccess: function(name){
            if(loginAndResFns.status === 'login'){
                this.loginSuccess(name);
            }else if(loginAndResFns.status === 'register'){
                this.toggleFn();
            }
        },
        loginSuccess: function(){
            var userBox = $(loginAndResFns.dataDom.headervUser);
            location.reload();
            //登陆成功后，刷新页面，session控制登陆
            /*userBox.html('<a href=""' + ' class="router-link-active">' + name + '</a>'
                        +'<a href="/api/user/logout" class="headerv-logout"></a>');*/
        },
        toggleFn: function(){
            var btn = $(loginAndResFns.dataDom.btn);
            var reg = $(loginAndResFns.dataDom.reg);
            var repassword = $(loginAndResFns.dataDom.repassword);
            repassword.toggle();
            if(this.status === 'register'){
                this.status = 'login';
                btn.attr('blog-status','login').text('登陆');
                reg.text('立即注册');
            }else{
                this.status = 'login';
                btn.attr('blog-status','register').text('注册');
                this.status = 'register';
                reg.text('立即登陆');
            }
        }
    }

    function toggleLoginAndRes(){
        loginAndResFns.toggleFn();
    }

    Function.prototype.after = function(fn){
        var self = this;
        return function(){
            self.apply(self);
            var result = fn.apply(this,arguments);
            return result;
        }
    }

    var registerEvent =  BLOG.register.event;
    _.eventsMap.forEach(function(item){
        registerEvent(item.stackClass,item.type,item.onFn);
    });

    global.BLOG = BLOG;
}(jQuery,document,window)
