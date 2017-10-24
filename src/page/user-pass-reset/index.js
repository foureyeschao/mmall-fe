/*
* @Author: victor
* @Date:   2017-10-21 15:38:26
* @Last Modified by:   victor
* @Last Modified time: 2017-10-22 22:06:21
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
    
    data : {

        username: '',
        question: '',
        answer  : '',
        token   : ''

    },

    init : function(){

        this.onLoad();
        this.bindEvent();
    },

    onLoad    : function(){
        this.loadStepUsername();

    },
    
    bindEvent : function(){
        var _this = this;

        $('#submit-username').click(function(){

            var username = $.trim($('#username').val());
            if(username){

                _user.getQuestion(username,function(res){
                    _this.data.username = username;
                    _this.data.question = res;
                    _this.loadStepQuestion();

                },function(errMsg){
                    formError.show(errMsg);

                });
            }

            else{
                formError.show('Please input username');
            }

        });


        $('#submit-question').click(function(){

            var answer = $.trim($('#answer').val());
            if(answer){

                _user.checkAnswer({
                    username  : _this.data.username,
                    question  : _this.data.question,
                    answer    :  answer
                },function(res){
                    _this.data.answer = answer;
                    _this.data.token  = res;
                    _this.loadStepPassword();

                },function(errMsg){
                    formError.show(errMsg);

                });
            }

            else{
                formError.show('Please input answer');
            }

        });



         $('#submit-password').click(function(){
           
            var password = $.trim($('#password').val());
            if(password && password.length >= 6){

                _user.resetPassword({
                    username       : _this.data.username,
                    passwordNew   : password,
                    forgetToken    : _this.data.token 
                },function(res){
                    window.location.href = './result.html?type=pass-reset';

                },function(errMsg){
                    formError.show(errMsg);

                });
            }

            else{
                formError.show('Please input a new password at least 6 characters');
            }

        });


    },

   loadStepUsername : function(){
      $('.step-username').show();
   },
   loadStepQuestion : function(){

      formError.hide();
      $('.step-username').hide()
         .siblings('.step-question').show()
         .find('.question').text(this.data.question);

   },
   loadStepPassword : function(){

     formError.hide();
     $('.step-question').hide()
         .siblings('.step-password').show();
      
   }

};

$(function(){
    page.init();
});