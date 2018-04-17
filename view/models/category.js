/**
 * Created by $ on 2017/11/8.
 */
var mongoose = require('mongoose');
var CategoryBase = require('../schemas/categorys.js');

module.exports = mongoose.model('categorys',CategoryBase);

