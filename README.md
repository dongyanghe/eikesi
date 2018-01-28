# eikesi
安装教程（翻墙）：[http://www.jhipster.tech/](http://)
### gateway（后台管理系统）：

### snapshot(爬虫服务)：

### jhipster-registry（提供微服务注册）：
#### 运行：
./mvnw（用于Java服务器）和yarn start（用于管理前端）
#### 配置：
gateway和snapshot都会自动注册到jhipster-registry里面，这样gateway就可以调用snapshot里面的接口了
- 使用dev配置文件将运行JHipster注册表dev和native配置文件。该native配置文件将从文件系统加载Spring Cloud配置，查找central-config与运行目录相关的目录。
- 使用prod配置文件将运行JHipster注册表prod和git配置文件。该git配置文件将从Git存储库加载Spring Cloud配置，该配置默认为https://github.com/jhipster/jhipster-registry-sample-config。在现实世界的用法中，应通过在src/main/resources/config/bootstrap-prod.yml文件中重新配置该存储库或通过重新配置spring.cloud.config.server.git.uriSpring属性来更改此存储库。

JHipster注册表运行后，您可以在Configuration > Cloud Config菜单中检查其配置。请注意，如果您无法登录，可能是因为JWT签名密钥未正确设置，这表示您的配置不好。