###文件路径:
 - [主目录](  ../README.md)
 - [项目主目录](  ../../README.md)

#项目搭建
  用git克隆本项目，从命令行进入进入项目根目录，依次执行以下命令：
```cmd
	npm i -g cnpm
	cnpm i -g @angular/cli
	cnpm install
	ng serve
```
  注：cnpm是使用淘宝服务免翻墙，如果不行可以试一试yarn
  
  如果之前装过angular-cli需要先卸载：npm uninstall -g angular-cli
  如果之前装过@angular/cli需要先卸载：npm uninstall -g @angular/cli
  如果你之前已经尝试安装过node模块，请把根目录下的node_moduels目录删掉
  然后依次执行以下命令：
```cmd
	npm cache clean
	npm i -g cnpm
	cnpm i -g @angular/cli
	cnpm install
	ng serve
```
  注：
  如果改了package.json，且package.json和lock文件不同，那么执行`npm i`时npm会根据package中的版本号以及语义含义去下载最新的包，并更新至lock。
  打开你的浏览器，访问http://localhost:4200/

运行
---
```cmd
	  ng serve --prod
```
   如果需要把项目发布到其它类型的Server上，例如Tomcat，需要对Server进行一些简单的配置才能支持HTML5下的PushState路由模式。

   【注意】如果ng serve起不来，或者起来有报错，请把根目录下的node_modules目录删掉，然后重新执行cnpm install，全局的@angular/cli也需要重装。

## 更新

打开命令行，进入根目录，依次执行以下命令：
```cmd
	git pull
	cnpm update
	ng serve
```
  如果pull代码之后发现启动报包错误，请把项目下的node_modules全部删掉，然后重新cnpm install。
  
发布
---
  开发状态打出来的bundle体积比较大，在发布到生产环境之前需要进行AOT操作，用法如下：
  
  打开命令行，进入根目录，执行以下命令：
```cmd
    ng build --prod
```
  加上--prod参数之后，angular-cli会自动启用TreeShaking把用不到的包全部剔除掉。
  
  angular-cli会在项目根目录下生成一个dist目录，里面就是编译、压缩好的文件,将其上传到服务器即可。
