/*
* @Author: victor
* @Date:   2017-10-23 15:11:45
* @Last Modified by:   victor
* @Last Modified time: 2017-10-24 12:34:46
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
        this.bindEvent();
    },


    onLoad : function(){

     navSide.init({
            name : 'user-center-update'
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

    },

    bindEvent : function(){
        var _this = this;
        // 点击提交按钮后的动作
        $(document).on('click', '.btn-submit', function(){
            var userInfo = {
                phone       : $.trim($('#phone').val()),
                email       : $.trim($('#email').val()),
                question    : $.trim($('#question').val()),
                answer      : $.trim($('#answer').val())
            },
            validateResult = _this.validateForm(userInfo);
            if(validateResult.status){
                // 更改用户信息
                _user.updateUserInfo(userInfo, function(res, msg){
                    _mm.successTips(msg);
                    window.location.href = './user-center.html';
                }, function(errMsg){
                    _mm.errorTips(errMsg);
                });
            }
            else{
                _mm.errorTips(validateResult.msg);
            }
        });
    },
    

    validateForm : function(formData){
        var result = {
            status : false,
            msg : ''
        };
        

        if(!_mm.validate(formData.phone, 'phone')){
            result.msg = "Phone number is invalide";
            return result;

        }


        if(!_mm.validate(formData.email, 'email')){
            result.msg = "Email is invalide";
            return result;

        }


        if(!_mm.validate(formData.question, 'require')){
            result.msg = "Question can't be left empty";
            return result;

        }


        if(!_mm.validate(formData.answer, 'require')){
            result.msg = "Answer can't be left empty";
            return result;

        }


        result.status = true;
        result.msg    = 'validate success';
        return result;




    }

};

$(function(){
    page.init();
});