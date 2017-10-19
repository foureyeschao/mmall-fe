/*
* @Author: victor
* @Date:   2017-10-18 09:33:35
* @Last Modified by:   victor
* @Last Modified time: 2017-10-18 10:26:27
*/
'use strict';
require('./index.css');
var _mm = require('util/mm.js');
var templateIndex = require('./index.string');

var navSide = {

    option : {
        name : '',
        navList : [
             {name : 'user-center',    desc: 'my profil',       href: './user-center.html'},
             {name : 'order-list',     desc: 'my order',        href: './order-list.html'},
             {name : 'pass-update',    desc: 'password',        href: './pass-update.html'},
             {name : 'about',          desc: 'about us',           href: './about.html'}
        ]

    },
    
    init  : function(option){
        $.extend(this.option, option);
        this.renderNav();
    },

    renderNav : function(){

        for(var i = 0, iLength = this.option.navList.length;i<iLength;i++){
            if(this.option.navList[i].name === this.option.name){
                this.option.navList[i].isActive = true;
            }
        };

        var navHtml = _mm.renderHtml(templateIndex, {
            navList : this.option.navList
        });

        $('.nav-side').html(navHtml);

    }

 
};

module.exports = navSide;