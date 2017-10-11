/*
* @Author: victor
* @Date:   2017-10-07 12:23:57
* @Last Modified by:   victor
* @Last Modified time: 2017-10-11 11:40:36
*/
var webpack           = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
// dev / online
var WEBPACK_ENV       = process.env.WEBPACK_ENV || 'dev';
console.log(WEBPACK_ENV);
//get html-webpack-plugin 
var getHtmlConfig     = function(name){
    return{
            template : './src/view/'+ name +'.html',
            filename : 'view/'+ name +'.html',
            inject   : true,
            hash     : true,
            chunks   : ['common', name]
    }
};
//webpack config
var config = {
    entry: {
        'common' : ['./src/page/common/index.js'],
        'index'  : ['./src/page/index/index.js'],
        'login'  : ['./src/page/login/index.js'],

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
           {test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resource/[name].[ext]'}
        ]
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
        new HtmlWebpackPlugin(getHtmlConfig('index')),
        new HtmlWebpackPlugin(getHtmlConfig('login')),
        
    ]
};

if('dev' === WEBPACK_ENV ){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/')
}

module.exports = config;
