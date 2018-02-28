/**
 * Created by $ on 2017/11/1.
 */

var mongoose = require('mongoose');
var UserBase = require('../schemas/users');

/*创建名为users的表*/
module.exports = mongoose.model('users',UserBase);