
# eikesi
[Jhipster安装教程（翻墙）](http://www.jhipster.tech/)

#### 环境配置和安装：
    以下各工具的版本请参见项目里面的**\src\main\docker\**.yml配置文件，或者根据pom.xml配置自行选择兼容版本

1. [redis的安装的教程](http://www.runoob.com/redis/redis-install.html)

1. [Elasticsearch的安装的教程](https://blog.csdn.net/weidong22/article/details/79062851)
：config/jvm.options 文件里把“-Dfile.encoding=UTF-8”改为“-Dfile.encoding=GBK”控制台就不会有乱码

1. [zookeeper和mpush的安装教程](https://github.com/mywiki/mpush-doc/blob/master/3%E5%AE%89%E8%A3%85zookeeper.md)
：window系统下zookeeper是要把zoo_sample.cfg改为zoo.cfg,不然启动会一闪而过

1. [kafka和zookeeper、Java JDK的安装教程](https://blog.csdn.net/tianmanchn/article/details/78943147)

1. [Jhipster注册中心](https://github.com/jhipster/jhipster-registry)：本项目已自带，如果你需要下载新版请注意版本发布说明里面的兼容问题。
1. [Nodejs](http://nodejs.cn/)：请下载LTS版本，nodejs自带npm，建议运行npm i cnpm -g安装淘宝的镜像来代替npm，或者使用yarn。
1. [python](https://www.python.org/downloads/)：请下载2.7版，记得设置环境变量。
> 安装路径不要有空格
> window系统请使用管理员权限运行cmd或者powershell
> window系统环境变量修改后要重新打开cmd
> cnpm也报错的话，可以运行npm i rimraf -g用rimraf删除node_modules改为使用yarn安装
##### 注册配置
gateway和service都会自动注册到jhipster-registry里面，这样gateway就可以路由到service里面的接口了。
- 使用dev配置文件将运行JHipster注册表dev和native配置文件。该native配置文件将从文件系统加载Spring Cloud配置，
查找central-config与运行目录相关的目录。
- 使用prod配置文件将运行JHipster注册表prod和git配置文件。该git配置文件将从Git存储库加载Spring Cloud配置，
该配置默认为https://github.com/jhipster/jhipster-registry-sample-config。您可以通过在src/main/resources/config/bootstrap-prod.yml文件中重新配置该存储库或通过重新配置spring.cloud.config.server.git.uriSpring属性来更改此存储库。
JHipster注册表运行后，您可以在前端页面的Configuration > Cloud Config菜单中检查其配置。请注意，如果您无法登录(网关无法访问其他服务 )，可能是因为JWT签名密钥未正确设置。
- 注意修改数据库连接账号名和密码、库名
#### 运行：
##### 后端各服务启动（如果您不了解系统的运作，请务必按顺序全部以管理员身份运行cmd逐一启动）：
1. 进入项目根目录使用./mvnw（window使用mvnw命令），启动jhipster-registry服务，这是启动基于eureka的服务注册中心。
1. 进入zookeeper的bin目录使用zkServer start(window使用zkServer)命令启动zookeeper，这是启动基于zookeeper的服务注册中心。
1. 进入kafka根目录使bin/kafka-server-start.sh config/server.properties（window使用bin\windows\kafka-server-start.bat .\config\server.properties）启动kafka。这是启动分布式发布订阅消息服务。
1. 进入Redis根目录使用bin/redis-server conf/redis.conf(window使用redis-server.exe redis.windows.conf)命令启动Redis,
这是启动数据存储和消息队列服务。
1. 进入elasticsearch根目录使用./bin/elasticsearch (window使用./bin/elasticsearch.bat )命令启动elasticsearch,
这是启动分布式数据检索服务。
1. 进入mpushRelease（根据mpush源码使用mvn clean package -Pzip,pub命令构建后解压得出,也可直接取本项目跟目录的target,需先修改配置）
的bin目录使用java -Dmp.conf=mpush绝对路径\conf\mpush.conf -jar bootstrap.jar命令启动mpush服务，这是启动消息通讯服务。
1. 同mpush操作一样，启动alloc服务，按需启动,这是启动多mpush服务的分布式管理服务。
1. 自行启动您所需的其他消息通讯服务，比如APNS、JPush、MIPush。
1. 进入各项目根目录使用./mvnw（window使用mvn命令），先启动网关再按需启动业务服务。
##### 前端服务启动：
1. angularX项目使用：
###### 安装：
```cmd
	npm cache clean # 可选，安装时报错用于清理缓存
	npm i -g cnpm # 改成淘宝镜像无需科学上网
	cnpm i -g @angular/cli
	cnpm install # 安装失败的话运行cnpm i -g rimraf 后再运行rimraf node_module 删除安装包，然后使用yarn install试一试
```
* 如果改了package.json，且package.json和lock文件不同，那么执行`npm i`时npm会根据package中的版本号以及语义含义去下载最新的包，并更新至lock。
* 如果之前装过旧版@angular/cli需要先卸载：npm uninstall -g @angular/cli

###### 运行：
```cmd
        npm run start # npm run start -- --p 4200  可以指定端口
        yarn start
        ng serve
```
* 打开你的浏览器，访问http://localhost:4200/
###### 更新
```cmd
	git pull
	cnpm update
	ng serve
```
* 如果pull代码之后发现启动报包错误，请用rimraf把项目下的node_modules全部删掉，然后重新cnpm install。

###### 发布：
```cmd
        npm run build
```
* 提示内存不足请修改package.json里面的--max_old_space_size，或者删除不必要的检查代码量
* 如果需要把项目发布到其它类型的Server上，例如Tomcat，需要对Server进行一些简单的配置才能支持HTML5下的PushState路由模式。
* angular-cli会在项目根目录下生成一个dist目录，里面就是编译、压缩好的文件,将其上传到服务器即可。

>   各服务端口如果不一样请修改对应配置
>
>   以上服务启动后对应的cmd或powershell窗口留着啊，关了就是关了。。。
#### 测试：

### 文件路径:
 - [项目主目录](  ../../README.md)
 - [安装、运行和发布](docs/Setup.md)
 - [开发规范](docs/Style.md)
 - [相关资源](docs/Resource.md)
 - [一期进度](docs/Schedule1.md)
 

## 系统模块设计
### 后端系统划分
#### jhipster-registry（微服务注册服务、配置服务）：
    服务端口：8761
注册中心
#### x-gateway（系统网关）：
    服务端口：8000
#### x-demoA-server(A示例服务)：
    服务端口：6000
#### x-demoO-server(O示例服务)：
    服务端口：6010

### 前端系统划分
#### x-manage-web（后台管理系统页面）：
    页面端口：4000
#### x-home-web（官网页面）：
    页面端口：4000

技术栈
======
> [Spring Cloud Netflix（rest、feign、euraka）](https://springcloud.cc/spring-cloud-netflix.html#spring-cloud-feign)
>
> [JHipster简介](https://www.jdon.com/dl/best/jhipster.html)
