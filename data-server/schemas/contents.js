/**
 * Created by $ on 2017/11/13.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
module.exports = new Schema({
    title: String,
    type: String,
    mark: String,
    content: String,
    info: String,
    author: String,
    createTime:{
        type: Date,
        default: Date.now
    },
    updateTime:{
        type: Date,
        default: Date
    }
});
