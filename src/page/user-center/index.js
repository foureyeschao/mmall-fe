/*
* @Author: victor
* @Date:   2017-10-22 22:26:30
* @Last Modified by:   victor
* @Last Modified time: 2017-10-24 09:14:58
*/

'use strict';
require('page/common/nav/index.js');
require('page/common/header/index.js');
require('./index.css');
var navSide       = require('page/common/nav-side/index.js');
var _mm           = require('util/mm.js');
var _user           = require('service/user-service.js');
var templateIndex = require('./index.string');


var page = {
    
    init : function(){
        
        this.onLoad();
    },
    
    onLoad : function(){

     navSide.init({
            name : 'user-center'
        });

        this.loadUserInfo();

    },

    loadUserInfo : function(){
        var userHtml = '';
        _user.getUserInfo(function(res){
           userHtml = _mm.renderHtml(templateIndex, res);
           $('.panel-body').html(userHtml);
        }, function(errMsg){
            _mm.errorTips(errMsg);
        });

    }

};

$(function(){
    page.init();
});