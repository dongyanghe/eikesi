const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Is the current build a development build
const IS_DEV = (process.env.NODE_ENV === 'dev');

const dirNode = 'node_modules';
const dirApp = path.join(__dirname, 'app');
const dirAssets = path.join(__dirname, 'assets');

const appHtmlTitle = 'Eikesi官网';

/**
 * Webpack 基本配置
 */
module.exports = {
    // mode: 'production',
    entry: {    //  入口
        // vendor: [
        //     'lodash'
        // ],
		lodash: 'lodash',
        index: path.join(dirApp, 'index'),
        // bundle: path.join(dirApp, 'index'), //  每个依赖最后的输出位置
    },
	output: {
		path:path.resolve(__dirname, 'dist'),
		// 打包多出口文件
		// 生成 index.bundle.js  jquery.bundle.js
		filename: './js/[name].bundle-[hash].js'
	},
    resolve: {
        modules: [
            dirNode,
            dirApp,
            dirAssets
        ]
    },
    plugins: [  //  用来处理各种各样的任务,包括打包优化和压缩、重新定义环境中的变量
        new webpack.DefinePlugin({
            IS_DEV: IS_DEV
        }),
		// 全局暴露统一入口
		new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
		}),
        new HtmlWebpackPlugin({     //  依据一个简单的html模板，生成一个自动引用你打包后的JS文件的新index.html
			chunks: ["index"],  // 按需引入对应名字的js文件
            template: path.join(__dirname, 'index.ejs'),
            title: appHtmlTitle
        })
    ],
    module: {   //  使用对应loader进行转换某个或某些文件
        rules: [
            // BABEL
            {
                test: /\.js$/,  //  匹配loaders所处理文件的拓展名的正则表达式
                loader: 'babel-loader', //  插件名称
                // include: 正则表达式, 必须包括的文件/文件夹
                exclude: /(node_modules)/,  //  排除的文件/文件夹
                options: {
                    compact: true
                }
            },

            // STYLES
            {
                test: /\.css$/,
                use: [
                    'style-loader', //  将所有的计算后的样式加入页面中
                    {
                        loader: 'css-loader',   //  能够使用类似@import 和 url(...)的方法实现 require()的功能
                        options: {
                            sourceMap: IS_DEV,
                            // modules: true, // 指定启用css modules划分，防止类名冲突
                            // localIdentName: '[name]__[local]--[hash:base64:5]' // 指定css的类名格式
                        }
                    },
                ]
            },

            // CSS / SASS
            {
                test: /\.scss/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: IS_DEV,
                            // modules: true, // 指定启用css modules划分，防止类名冲突
                            // localIdentName: '[name]__[local]--[hash:base64:5]' // 指定css的类名格式
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: IS_DEV,
                            includePaths: [dirAssets]
                        }
                    }
                ]
            },

            // IMAGES
            {
                test: /\.(jpe?g|png|gif)$/,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]'
                }
            }
        ]
    }
};

