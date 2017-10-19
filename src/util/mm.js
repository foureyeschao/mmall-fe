/*
* @Author: victor
* @Date:   2017-10-11 16:31:04
* @Last Modified by:   victor
* @Last Modified time: 2017-10-12 23:09:52
*/
'use strict';

var Hogan = require('hogan.js');

var conf = {
    serverHost : ''
};

var _mm = {
    request : function(param){
        var _this = this;
        $.ajax({
            type        : param.method   || 'get',
            url         : param.url      || '',
            dataType    : param.type     || 'json',
            data        : param.data     || '',
            success     : function(res){
                if(0 === res.status){
                    typeof param.success === 'function' && param.success(res.data, res.msg);     
                }
                else if(10 === res.status){
                     _this.doLogin();
                }
                else if(1 === res.status){
                    typeof param.error === 'function' && param.error(res.msg);
                }

            },
            error       : function(err){
                typeof param.error === 'function' && param.error(err.statusText);

            }
        });
    },

    //get server url
    getServerUrl : function(path){
        return conf.serverHost + path;
    },

    getUrlParam : function(name){
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        var result = window.location.search.substr(1).match(reg);
        return result ? decodeURIComponent(result[2]) : null;

    },

    renderHtml: function(htmlTemplate, data){
        var template = Hogan.compile(htmlTemplate),
            result   = template.render(data);
        return result;

    },

    successTips : function(msg){
        alert(msg || 'success!');
    },

    errorTips : function(msg){
        alert(msg || 'erorr!');
    },

    validate  : function(value,type){
        var value = $.trim(value);
        if('require' === type){
            return !!value;
        }
        if('phone' === type){
            return /^5\d{9}$/.test(value);
        }

        if('email' === type){
            return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
        }
    },
    
    
    doLogin : function(){
        window.location.href = './login.html?redirect=' + encodeURIComponent(window.location.href);
    },

    goHome  : function(){
        window.location.href = './index.html';
    }
};

module.exports = _mm;