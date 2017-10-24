/*
* @Author: victor
* @Date:   2017-10-07 12:23:57
* @Last Modified by:   victor
* @Last Modified time: 2017-10-24 12:58:04
*/
var webpack           = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
// dev / online
var WEBPACK_ENV       = process.env.WEBPACK_ENV || 'dev';
console.log(WEBPACK_ENV);
//get html-webpack-plugin 
var getHtmlConfig     = function(name,title){
    return{
            template : './src/view/'+ name +'.html',
            filename : 'view/'+ name +'.html',
            title    : title,
            inject   : true,
            hash     : true,
            chunks   : ['common', name]
    }
};
//webpack config
var config = {
    entry: {
        'common'                  : ['./src/page/common/index.js'],
        'index'                   : ['./src/page/index/index.js'],
        'user-login'              : ['./src/page/user-login/index.js'],
        'user-register'           : ['./src/page/user-register/index.js'],
        'user-pass-reset'         : ['./src/page/user-pass-reset/index.js'],
        'user-center'             : ['./src/page/user-center/index.js'],
        'user-center-update'      : ['./src/page/user-center-update/index.js'],
        'user-pass-update'      : ['./src/page/user-pass-update/index.js'],
        'result'                  : ['./src/page/result/index.js'],

    },
    output: {
        path: './dist',
        publicPath: '/dist',
        filename: 'js/[name].js'
    },
    externals : {
        'jquery' : 'window.jQuery'
    },
    module: {
        loaders: [
           {test: /\.css$/, loader: ExtractTextPlugin.extract ("style-loader","css-loader")},
           {test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resource/[name].[ext]'},
           {test: /\.string$/, loader: 'html-loader'}
        ]
    },
    resolve: {
        alias : {
            node_modules    : __dirname + '/node_modules',
            util            : __dirname + '/src/util',
            page            : __dirname + '/src/page',
            service         : __dirname + '/src/service',
            image           : __dirname + '/src/image'
        }
    },
    plugins: [
        //common moduel add to js/base.js
        new webpack.optimize.CommonsChunkPlugin({
            name : 'common',
            filename : 'js/base.js'
        }),
        //package css file
        new ExtractTextPlugin("css/[name].css"),
        //html template
        new HtmlWebpackPlugin(getHtmlConfig('index', 'HomePage')),
        new HtmlWebpackPlugin(getHtmlConfig('user-login' , 'Login')),
        new HtmlWebpackPlugin(getHtmlConfig('user-register' , 'Register')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset' , 'Reset password')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center' , 'My profil')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center-update' , 'Update profil')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-update' , 'Update password')),
        new HtmlWebpackPlugin(getHtmlConfig('result', 'Result')),
        
    ]
};

if('dev' === WEBPACK_ENV ){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/')
}

module.exports = config;
