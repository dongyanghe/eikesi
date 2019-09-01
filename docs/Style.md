###文件路径:
 - [主目录](  ../README.md)
 - [项目主目录](  ../../../README.md)
#规范

代码规范
---
####1. 版本注释
        每个类和函数会写作者、开始时间、功能、参数说明，修改者。
```
    /**
     * @Title  
     * @Description 
     * @author ***
     * @date 2017-11-5 14:31
     * 
     * @Description ***********
     * @author ***
     * @date 2017-11-5 19:35
     *
     * @Description ************
     * @author ****
     * @date 2017-11-6 20:20
     */
```
####2. 问题记录:
    
```
  bug:缺少参数
  defect:需求未确认
```
开发流程规范
---
####1 代码提交流程
    1.1 提交说明要列个表，eg:1.新增。。。  2.修改。。。 3.修复。。。 4.删除。。。
    1.2 先拉取再提交
    1.3 每天结束前必须提交代码，且代码不能有错
数据库流程规范
---
    1.每个表都要有创建时间
前端流程规范
---
#####面包屑：
面包屑每个页面都要写，并都写成
![](img/图片1.png)

改成

![](img/图片2.png)

#### 列表页和表单页：
##### 这两个变量要配置对：
```typescript
formDataIdKey = 'id';  //  表单唯一标识
formDataNameKey = 'name';  //  表单名称
```

##### 父类函数尽量不用重写：
    一般可以用onBefore和onAfter切人，实在要重写记得务必实现父类已有功能。

##### 列表页表格刷新：
    表单页如果是弹窗，那对应的列表页在弹窗修改或保存数据关闭弹窗后必须刷新。
```typescript
onOk() {
        console.log('a Click onOk');
        self.getPagedDataAsync();
      }
```
##### 列表页和表单页获取页面参数：
       在onBeforeOnInit或其后面的代码可使用父类的params直接读取，不用再次订阅this.activatedRoute.params.subscribe。
       父类实现代码：
   ```typescript
    ngOnInit() {
       let self = this;
       this.activatedRoute.params.subscribe(
         params => {
           console.dir('FormBaseComponent ngOnInit activatedRoute', params);
           self.params = params || {};
           ...
   ```
#### 消息提示：
* 小操作的确定取消等询问框用nz-popconfirm；
* 大操作的确定取消等询问框用nzModalService的modal-xs弹窗；
* toaster提示的MsgService有多种type对应不同场景要合理分开；
#### 表单校验：
* 正则表达式、最大最小、必填、禁用一定都要一一按照产品的要求，限制尽量宽松而不是严谨。；
* 不能自动校验的字段（图片、时间范围）这些要在onBeforeQuery、onBeforeSave、onBeforeUpdate等前置插入处手动校验；
* 列表页查询表单只校验是否必填；

#### 请求路径：
* 公共请求路径要放在URL.permissionUrl.common里面，一般也要放在CONFIG.unLoading里面来屏蔽遮罩层

#### 后端设计：
* 迭代推进，不嫌弃麻烦
* 最小服务划分
* 网关：
  * 网关只做请求转发和用户登录
> 登录和鉴权问题？
> 同一服务不同网关不同用户访问？

#### 数据结构设计：
* 在同一个服务内才做表关联
* 一个服务对应一个数据库
其他
---
    1 css：
        a.页面级样式类都必须包涵在对应的页面类里面；
    2.js：
        a.ts和html文件都必须含且仅含尾椎list和form；
        b.提交到git的代码不能有debugger；
        c.代码结尾要有“;”号，“: )”后面要有空格
    3.html：
        a.button标签和a标签内部除了i、img等标签外，不要嵌套其他东西，如div
    4.other：
        a.html和对应的ts文件名需一致，小写非驼峰命名
