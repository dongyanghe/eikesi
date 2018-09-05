###文件路径:
 - [主目录](  ../README.md)
 - [项目主目录](  ../../README.md)

#前端错误
##npm ERR! node-sass:
###windows平台缺少编译环境， 导致node-sass错误：
1、先运行： npm install -g node-gyp 
2、然后运行：运行 npm install –global –production windows-build-tools 可以自动安装跨平台的编译器：gym
###数据源访问不了：
package.json同目录创建.npmrc
phantomjs_cdnurl=http://cnpmjs.org/downloads
sass_binary_site=https://npm.taobao.org/mirrors/node-sass/
registry=https://registry.npm.taobao.org
###其他
运行npm rebuild node-sass