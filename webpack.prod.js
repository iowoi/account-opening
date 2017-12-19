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
                window.open('./upload')
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