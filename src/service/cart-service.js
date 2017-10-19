/*
* @Author: victor
* @Date:   2017-10-14 00:29:43
* @Last Modified by:   victor
* @Last Modified time: 2017-10-14 00:32:39
*/
var _mm = require('util/mm.js');

var _cart = {
    
// get cart count
    getCartCount : function(resolve,reject){
        _mm.request({
            url    : _mm.getServerUrl('/cart/get_cart_product_count.do'),
            success: resolve,
            error  : reject

        });
    }
}

module.exports = _cart;