/**
 * Created by $ on 2017/11/1.
 */
var Schema = require('mongoose').Schema;
/*建立表结构*/
module.exports = new Schema({
    username: String,
    password: String,
    isAdmin: {//是否是管理员
        type: Boolean,
        default: false
    },
    createTime: {
        type: Date,
        default: Date.now
    },
    updateTime: {
        type: Date,
        default: Date.now
    }
});
