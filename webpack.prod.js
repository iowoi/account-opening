const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common');

module.exports = merge(common, {
    devtool: 'cheap-module-source-map',
    output: {
        publicPath: '/Security'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env':{
                'NODE_ENV': JSON.stringify('production'),                           
            },
            ROOT_PATH: JSON.stringify('/Security/')
        }),
        new UglifyJSPlugin({
            sourceMap: true
        })
    ]
})