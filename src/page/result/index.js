/*
* @Author: victor
* @Date:   2017-10-18 10:31:37
* @Last Modified by:   victor
* @Last Modified time: 2017-10-18 12:30:36
*/
'use strict';
require('./index.css');
require('page/common/nav-simple/index.js');
var _mm = require('util/mm.js');

$(function(){

    var type = _mm.getUrlParam('type') || 'default',
        $element = $('.' + type + '-success');

        $element.show();

})