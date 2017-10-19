/*
* @Author: victor
* @Date:   2017-10-14 00:05:51
* @Last Modified by:   victor
* @Last Modified time: 2017-10-14 00:25:26
*/
var _mm = require('util/mm.js');

var _user = {
    
    checkLogin : function(resolve,reject){
        _mm.request({
            url    : _mm.getServerUrl('/user/get_user_info.do'),
            method : 'POST',
            success: resolve,
            error  : reject

        });
    },

// Logout
    logout : function(resolve,reject){
        _mm.request({
            url    : _mm.getServerUrl('/user/logout.do'),
            method : 'POST',
            success: resolve,
            error  : reject

        });
    }
}

module.exports = _user;