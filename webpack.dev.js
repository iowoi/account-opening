const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common,{
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env':{
                'NODE_ENV': JSON.stringify('develop'),                           
            },
            ROOT_PATH: JSON.stringify('/'),
            API_URL: JSON.stringify('http://testapi.kvbkunlun.com/api2/SecurityAccount')
        }),
        new HtmlWebpackPlugin({
            title: 'Account Opening', 
            hash: true, 
            template: 'index-template.ejs'
        })
    ]
   
});

