const path = require('path');
const webpack = require('webpack');
const path = require('path');
const webpack = require('webpack');
const glob = require("glob");
//消除冗余的css
const purifyCssWebpack = require("purifycss-webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const extractTextPlugin = require("extract-text-webpack-plugin");
//静态资源输出
const copyWebpackPlugin = require("copy-webpack-plugin");
// Is the current build a development build
const IS_DEV = (process.env.NODE_ENV === 'dev');

const dirNode = 'node_modules';
const dirSrc = path.join(__dirname, 'src');
const dirAssets = path.join(__dirname, 'assets');

const appHtmlTitle = 'Eikesi官网';

/**
 * Webpack 基本配置
 */
module.exports = {
    // target: 'web',  告知 webpack 为目标(target)指定一个环境，默认是 'web'，可省略
    // mode: 'production',
    entry: {    //  入口
        // vendor: [
        //     'lodash'
        // ],
        lodash: 'lodash',
        jquery: 'jquery',   //  通过HtmlWebpackPlugin.chunks导入jquery
        index: path.join(dirSrc, 'index'),
    },
	// output: {
	// 	path:path.resolve(__dirname, 'dist'),
	// 	// 打包多出口文件
	// 	// 生成 index.bundle.js  jquery.bundle.js
	// 	filename: './js/[name].bundle-[hash].js'
	// },
    resolve: {
        alias: {    //  导入JS插件
            jquery: path.resolve(__dirname, "src/vendor/jquery-1.9.1.min.js"),
        },
        modules: [
            dirNode,
            dirSrc,
            dirAssets
        ]
    },
    plugins: [  //  用来处理各种各样的任务,包括打包优化和压缩、重新定义环境中的变量
        new webpack.DefinePlugin({
            IS_DEV: IS_DEV
        }),
        // 消除冗余的css代码
		new purifyCssWebpack({
			// glob为扫描模块，使用其同步方法（请谨慎使用异步方法）
			paths: glob.sync(path.join(__dirname, "src/*.html"))
		}),
		// 全局暴露统一入口
		// new webpack.ProvidePlugin({
        //     $: 'jquery',
        //     jQuery: 'jquery',
        //     'window.jQuery': 'jquery',
		// }),
        new HtmlWebpackPlugin({     //  依据一个简单的html模板，生成一个自动引用你打包后的JS文件的新index.html
			chunks: ["jquery","index"],  // 按需引入对应名字的js文件
            template: path.join(__dirname, 'src/index.ejs'),
            title: appHtmlTitle,
            minify: {
                removeAttributeQuotes: true // 移除属性的引号
            }
        })
    ],
    module: {   //  使用对应loader进行转换某个或某些文件
        rules: [
            {
              test: /\.ts?$/,
              use: 'ts-loader',
              exclude: /node_modules/
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
                            // includePaths: [dirAssets]
                        }
                    }
                ]
            },
			{
				test: /\.(html|htm|ejs)$/,
				// html中的img标签
				use: ["html-withimg-loader"]
			},
            // IMAGES
            {
                test: /\.(jpe?g|png|gif|svg|woff2?|ttf|ttc|eot)$/,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]'
                }
            }
        ]
    }
};

