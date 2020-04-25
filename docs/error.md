###文件路径:
 - [主目录](  ../README.md)
 - [项目主目录](  ../../README.md)

# 前端错误
## npm i 的时候报npm ERR! node-sass:
```cmd
Uncaught TypeError: Cannot read property 'NODE_ENV' of undefined
    at register (chat.ts:352)
    at Module.<anonymous> (chat.ts:352)
```

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

# 后端错误
## 启动项目报：[ERROR] Failed to execute goal org.springframework.boot:spring-boot-maven-plugin:2.0.8.RELEASE:run (default-cli) on project XXX: Could not exec java: Cannot run program "C:\Java\jdk1.8\jre\bin\java.exe": CreateProcess error=206, 文件名或扩展名太长。
反编译之后的路径太长，window系统的命令工具不支持长路径
1.將maven仓库的路径改短，直接放在磁盘跟目录上（我改短后就可以运行了）
2.idea中的workspace.xml添加配置：（未必有效）
## kafka启动报错：找不到或无法加载主类 Files\java\jdk-9.0.1\lib;C:\Program
在kafka安装目录中找到bin\windows目录中的kafka-run-class.bat为%CLASSPATH%加上双引号(可用Matlab打开，并进行搜索)

   修改前：setCOMMAND=%JAVA%%KAFKA_HEAP_OPTS% %KAFKA_JVM_PERFORMANCE_OPTS% %KAFKA_JMX_OPTS%%KAFKA_LOG4J_OPTS% -cp%CLASSPATH% %KAFKA_OPTS% %*   
   修改后：SetCOMMAND=%JAVA%%KAFKA_HEAP_OPTS% %KAFKA_JVM_PERFORMANCE_OPTS% %KAFKA_JMX_OPTS%%KAFKA_LOG4J_OPTS% -cp"%CLASSPATH%"%KAFKA_OPTS% %*
```xml
  <component name="PropertiesComponent">
<!--  此处添加-->
    <property name="dynamic.classpath" value="true" />
  </component>
```
## mvnw命令报zip（windows系统）
Exception in thread "main" java.util.zip.ZipException: zip END header not found
建议把maven改为本地的而非idea的，仓库不放在C盘
[Spring Cloud Netflix（rest、feign、euraka）](https://www.cnblogs.com/xyyou/p/11704055.html)
### 
# git错误
## soucetree无法提交本地仓库——pre-commit hook failed (add --no-verify to bypass)：
打开git命令行，运行【git commit -m “更新代码” -n】手动提交。