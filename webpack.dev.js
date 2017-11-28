const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common');

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
            ROOT_PATH: JSON.stringify('/')
        })
    ]
   
});

console.log(process.env.NODE_ENV)