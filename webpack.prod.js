const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
    devServer: {
        contentBase: './Security',
    },
   
    devtool: 'cheap-module-source-map',
    output: {
        publicPath: '/Security'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env':{
                'NODE_ENV': JSON.stringify('production'),                           
            },
            ROOT_PATH: JSON.stringify('/Security/'),
            API_URL: JSON.stringify('http://testapi.kvbkunlun.com/api2/SecurityAccount'),
            OPEN_UPLOAD: function(){
                if(window.location.pathname.indexOf('cn') > -1) {
                    window.open('//'+window.location.hostname+'/Security/cn/upload')
                }else{
                    window.open('//'+window.location.hostname+'/Security/en/upload')
                }
            },
            WEB_LANG: function(lang){
                if(lang){
                    return window.location.pathname.indexOf(lang) > -1
                }else{
                    if(window.location.pathname.indexOf('cn') > -1) {
                        return 'cn';
                    }else{
                        return 'en';
                    }
                }
            }
        }),
        new HtmlWebpackPlugin({
            title: 'Account Opening', 
            hash: true, 
            template: 'index-template.ejs',
            baseUrl: '/Security/'
        }),
        new UglifyJSPlugin({
            sourceMap: true
        })
    ]
})