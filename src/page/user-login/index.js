/*
* @Author: victor
* @Date:   2017-10-09 12:33:55
* @Last Modified by:   victor
* @Last Modified time: 2017-10-19 10:23:18
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
            username : $.trim($('#username').val()),
            password : $.trim($('#password').val()),
        },
      
       validateResult = this.formValidate(formData);
       if(validateResult.status){

         _user.login(formData, function(res){
            window.location.href = _mm.getUrlParam('redirect') || './index.html';},
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
            result.msg = 'username is invalid';
            return result;

        }

        if(!_mm.validate(formData.password, 'require')){
            result.msg = 'password is invalid';
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