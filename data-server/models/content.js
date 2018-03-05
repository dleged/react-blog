/**
 * Created by $ on 2017/11/13.
 */
var mongoose = require('mongoose');
var contentBase = require('../schemas/contents');

module.exports = mongoose.model('content',contentBase);