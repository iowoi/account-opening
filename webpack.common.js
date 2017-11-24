const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin'); // 使用 extract text webpack plugin

const ExtractMainCss = new ExtractTextPlugin({filename: 'css/main.css'})
module.exports = {
    devServer: {
        historyApiFallback: true,
        hot: true
    },
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './dist'),
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            }, {
                test: /\.css$/,
                use: ExtractMainCss.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader'
                        }
                    ]
                })
            }, {
                test: /\.scss$/,
                use: ExtractMainCss.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            }, {
                test: /\.(png|jpg|gif)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'img/'
                }
            }, {
                test: /\.svg$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'svg/'
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({title: 'Account Opening', hash: true, template: 'index-template.ejs'}),
        ExtractMainCss
    ]
};
