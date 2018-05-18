
# eikesi
[安装教程（翻墙）：](http://www.jhipster.tech/)
#### 创建
使用jhipster创建，修改.yo-rc.json后使用jhipster --force修改创建
使用jhipster import-jdl ../docs/jdl/jhipster-jdl.jh --force 覆盖性生成代码

#### 配置：
gateway和snapshot都会自动注册到jhipster-registry里面，这样gateway就可以调用snapshot里面的接口了
- 使用dev配置文件将运行JHipster注册表dev和native配置文件。该native配置文件将从文件系统加载Spring Cloud配置，
查找central-config与运行目录相关的目录。
- 使用prod配置文件将运行JHipster注册表prod和git配置文件。该git配置文件将从Git存储库加载Spring Cloud配置，
该配置默认为https://github.com/jhipster/jhipster-registry-sample-config。在现实世界的用法中，
应通过在src/main/resources/config/bootstrap-prod.yml文件中重新配置该存储库或通过重新配置spring.cloud.config.server.git.uriSpring
属性来更改此存储库。

JHipster注册表运行后，您可以在Configuration > Cloud Config菜单中检查其配置。请注意，如果您无法登录，可能是因为JWT签名密钥未正确设置，
这表示您的配置不好。
#### 运行：
后台服务器启动（请按顺序）：
1. 进入项目根目录使用./mvnw（window使用mvn命令），启动jhipster-registry服务用以实现基于eureka的服务注册中心
1. 进入zookeeper的bin目录使用zkServer start(window使用zkServer)命令启动zookeeper，用以实现基于zookeeper的服务注册中心。
项目端口2181如果不一样请修改对应配置
1. 进入Redis根目录使用bin/redis-server conf/redis.conf(window使用redis-server.exe redis.windows.conf)命令启动Redis,
用以实现数据存储和消息队列。
1. 进入mpushRelease（根据mpush源码使用mvn clean package -Pzip,pub命令构建后解压得出,也可直接取本项目跟目录的target,需先修改配置）
的bin目录使用java -Dmp.conf=mpush绝对路径\conf\mpush.conf -jar bootstrap.jar命令启动mpush服务，用以实现消息通讯服务。
1. 同mpush操作一样，启动alloc服务,用以实现多mpush服务的分布式管理，按需启动。
1. 自行启动你所需的其他消息通讯服务，比如APNS、JPush、MIPush。
1. 进入各项目根目录使用./mvnw（window使用mvn命令），先启动网关在启动服务，按需启动。
前端服务启动：
    angular项目使用：
        npm run start -- --p 4200、yarn start、、ng serve
    ionic项目使用：
        ionic serve
#### 测试：

###文件路径:
 - [项目主目录](  ../../README.md)
 - [安装、运行和发布](docs/Setup.md)
 - [开发规范](docs/Style.md)
 - [相关资源](docs/Resource.md)
 - [一期进度](docs/Schedule1.md)
 

后台管理系统项目级公共模块
======
[TOC]
##系统模块设计

###系统划分
#### 配置中心：

#### 消息中心：

#### 监控中心：

#### 后台管理系统网关：

#### gateway（总网关）：

#### snapshot(爬虫服务)：

#### jhipster-registry（提供微服务注册）：

###原则：
    服务模型的划分及其迭代从数据模型开始
    迭代推进，快速实现分阶段改造；
    性能由缓存解决，应用可靠性由服务器集群化解决，数据存储由数据库集群化解决；
    
##数据库设计：
###原则：
    每项微服务都应该拥有并控制自己的数据库，且任意两项服务不应共享同一套数据库；
    对数据进行定义，在需求人和需求背景的角度提问——明白这类数据是什么、会有什么；