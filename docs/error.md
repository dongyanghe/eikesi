###文件路径:
 - [主目录](  ../README.md)
 - [项目主目录](  ../../README.md)

# 前端错误
## npm i 的时候报npm ERR! node-sass:
### windows平台缺少编译环境， 导致node-sass错误：
1. 先运行： npm install -g node-gyp 
2. 然后运行：运行 npm install –global –production windows-build-tools 可以自动安装跨平台的编译器：gym
### 数据源访问不了：
1. 使用淘宝的cnpm代替npm：npm install -g cnpm
2. package.json同目录创建.npmrc：
phantomjs_cdnurl=http://cnpmjs.org/downloads
sass_binary_site=https://npm.taobao.org/mirrors/node-sass/
registry=https://registry.npm.taobao.org
###其他
运行npm rebuild node-sass，再重新npm update

# git错误
## soucetree无法提交本地仓库——pre-commit hook failed (add --no-verify to bypass)：
打开git命令行，运行【git commit -m “更新代码” -n】手动提交。