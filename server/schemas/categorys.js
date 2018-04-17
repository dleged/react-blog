/**
 * Created by $ on 2017/11/8.
 */
var Schema = require('mongoose').Schema;
module.exports = new Schema({
        type: String,
        author: String,
        createTime: {
            type: Date,
            default: Date.now//js对象的Date
        },
        updateTime: {
            type: Date,
            default: Date.now
        }
});
