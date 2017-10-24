/*
* @Author: victor
* @Date:   2017-10-19 22:05:20
* @Last Modified by:   victor
* @Last Modified time: 2017-10-20 21:56:43
*/

'use strict';
require('./index.css');
require('page/common/nav-simple/index.js');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');

var formError = {
    show : function(errMsg){
        $('.error-item').show().find('.err-msg').text(errMsg);

    },

    hide : function(){
        $('.error-item').hide().find('.err-msg').text('');

    }
};


var page = {
    
    init : function(){
        
        this.bindEvent();
    },
    
    bindEvent : function(){
        var _this = this;

        //validate username

        $('#username').blur(function(){
            var username = $.trim($(this).val());
            if(!username){
                return;
            }

            _user.checkUsername(username,function(res){
                formError.hide();
            }, function(errMsg){
                formError.show(errMsg);
            });

        });

        $('#submit').click(function(){

            _this.submit();

        });

        $('.user-content').keyup(function(e){
            if(e.keyCode === 13){
                _this.submit();
            }
        });

    },

    submit : function(){

        var formData = {
            username        : $.trim($('#username').val()),
            password        : $.trim($('#password').val()),
            passwordConfirm : $.trim($('#password-confirm').val()),
            phone           : $.trim($('#phone').val()),
            email           : $.trim($('#email').val()),
            question        : $.trim($('#question').val()),
            answer          : $.trim($('#answer').val())
        },
      
       validateResult = this.formValidate(formData);
       if(validateResult.status){

         _user.register(formData, function(res){
            window.location.href = './result.html?type=register';},
            function(errMsg){
              formError.show(errMsg);
         });

       }
       else{
            formError.show(validateResult.msg);
       }
    },

    formValidate : function(formData){
        var result = {
            status : false,
            msg : ''
        };
        if(!_mm.validate(formData.username, 'require')){
            result.msg = "Username can't' be left empty";
            return result;

        }

        if(!_mm.validate(formData.password, 'require')){
            result.msg = "Password can't be left empty";
            return result;

        }

        if(formData.password.length < 6){
            result.msg = "Password is at least 6 character ";
            return result;

        }

        if(formData.password !== formData.passwordConfirm){
            result.msg = "Password does not match the confirm password";
            return result;

        }


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