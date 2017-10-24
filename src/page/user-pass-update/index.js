/*
* @Author: victor
* @Date:   2017-10-24 12:39:59
* @Last Modified by:   victor
* @Last Modified time: 2017-10-24 13:43:38
*/
'use strict';
require('page/common/nav/index.js');
require('page/common/header/index.js');
require('./index.css');
var navSide       = require('page/common/nav-side/index.js');
var _mm           = require('util/mm.js');
var _user           = require('service/user-service.js');


var page = {
    
    init : function(){
        
        this.onLoad();
        this.bindEvent();
    },


    onLoad : function(){

     navSide.init({
            name : 'user-pass-update'
        });


    },

    

    bindEvent : function(){
        var _this = this;
        // 点击提交按钮后的动作
        $(document).on('click', '.btn-submit', function(){
            var userInfo = {
                password             : $.trim($('#password').val()),
                passwordNew          : $.trim($('#password-new').val()),
                passwordConfirm      : $.trim($('#password-confirm').val())
            },
            validateResult = _this.validateForm(userInfo);
            if(validateResult.status){
                // 更改用户password
                _user.updatePassword({
                    passwordOld  : userInfo.password,
                    passwordNew  : userInfo.passwordNew
                    }, function(res, msg){
                    _mm.successTips(msg);
                    
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
        

        if(!_mm.validate(formData.password, 'require')){
            result.msg = "Old password can't be empty";
            return result;

        }


        if(!formData.passwordNew || formData.passwordNew.length < 6){
            result.msg = "New password is at least 6 charaters";
            return result;

        }


        if(formData.passwordNew !== formData.passwordConfirm){
            result.msg = "Password does not match the confirm password";
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