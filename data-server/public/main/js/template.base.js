/**
 * Created by $ on 2017/11/6.
 * 配置html字符串模板
 * 调用模板fn
 */
var getTemplate = function(){
    var template = {};
    /*登陆和注册字符串模板*/
    template.logAndReg ='<div class="box-input-tips"></div><div class="login-register"><input type="text" id="username" autocomplete="off" name="username" placeholder="用户名"><input type="password" id="password" autocomplete="off" name="password" placeholder="密码"><input type="password" class="hide" autocomplete="off" id="repassword" name="repassword" placeholder="确认密码"><button type="submit" blog-status="login" class="blog-register-btn">登录</button><div class="other"><div class="other-login">其他登录方式：<a title="使用微博帐号登录" href="/index/open-login?platform=sina" target="_blank" class="weibo-btn"></a><a title="使用微信帐号登录" href="/index/open-login?platform=wechat" target="_blank" class="weixin-btn"></a></div><div class="forget-reg"><a href="" target="" class="forget-password">忘记密码？</a><a href="#register" target="" class="reg">立即注册</a></div></div></div>';
    return function(temp){
        return  temp  = template[temp] ? template[temp] : null,
            temp;
    }
}()

