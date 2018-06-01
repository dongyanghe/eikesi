###文件路径：
 - [主目录](  ../README.md)
 - [项目主目录](  ../../README.md)

- [x] 即时通讯系统

#一期进度
目标：
    整个项目的初始化，提供基本的增删改查示例、数据存储示例、im示例、RPC负载均衡示例、后台系统前端表单示例。
#####字段释义：
* 功能：一般跟页面或模块名一致
* 详细解释：对需求的释义
* 负责人：用“/”划分第一第二负责人，用“，”划分职责（“，”前为接口负责人，之后为界面负责人，无为单人负责）
* 接口时间：后台准备进行接口调试的时间，时间在当前时间之前为已完成，当前时间之后为预估时间，空为不定时
* 页面时间：前端完成页面视图逻辑和样式的时间，时间在当前时间之前为已完成，当前时间之后为预估时间，空为已完结
* 情况：60%为前端完成、70%为前端完成并调试完接口、80%为代码审查和需求验收通过、90%为测试中、100%为完成开发但可能进入迭代

备注：
* 制定计划要用[5W2H分析法](http://wiki.mbalib.com/zh-tw/5W2H%E5%88%86%E6%9E%90%E6%B3%95)
* 开发过程中发现的不能马上处理的问题（通过1、2、3列举,小括号里面是负责人和处理情况）
* 任务划分粒度尽量控制在一两人工作量内
* 已完成任务拉到表格后面
* 并不是所有功能都会有界面或后台代码
####1 公共功能：
##### hedongyang:
- [ ] 基础【hedongyang】
<table>
  <tr>
    <th >功能</th>
    <th>详细解释</th>
    <th>负责人</th>
    <th>后台时间</th>
    <th>界面时间</th>
    <th>情况</th>
    <th>备注</th>
  </tr>
  <tr>
      <td>文档编写</td>
      <td>完善README.md</td>
      <td>hedongyang</td>
      <td></td>
      <td></td>
      <td>10%</td>
      <td></td>
  </tr>
  <tr>
      <td>服务系统负载均衡机制</td>
      <td></td>
      <td>hedongyang</td>
      <td></td>
      <td></td>
      <td>/td>
      <td></td>
  </tr>
  <tr>
      <td>RPC分布式事务机制</td>
      <td></td>
      <td>hedongyang</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
  </tr>
  <tr>
      <td>分布式事存储设计</td>
      <td></td>
      <td>hedongyang</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
  </tr>
  <tr>
      <td>日志系统</td>
      <td></td>
      <td>hedongyang</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
  </tr>
  <tr>
      <td>创建混合应用</td>
      <td></td>
      <td>hedongyang</td>
      <td></td>
      <td></td>
      <td>100%</td>
      <td></td>
    </tr>
</table>
- [ ] im桌面端【hedongyang】:
<table>
  <tr>
    <th >功能</th>
    <th>详细解释</th>
    <th>负责人</th>
    <th>后台时间</th>
    <th>界面时间</th>
    <th>情况</th>
    <th>备注</th>
  </tr>
  <tr>
      <td>技术选项</td>
      <td>
        1.前端框架确定
        2.开源项目确定
      </td>
      <td>hedongyang</td>
      <td></td>
      <td>2018年5月10日</td>
      <td>100%</td>
      <td></td>
    </tr>
  <tr>
      <td>梳理所有请求接口</td>
      <td>
        得出请求路径、参数、返回，方便建网关和数据表
      </td>
      <td>hedongyang</td>
      <td></td>
      <td>2018年5月12日</td>
      <td>0%</td>
      <td></td>
    </tr>
  <tr>
      <td>微信客户端通讯框架和JPush通讯框架调研 </td>
      <td>
      </td>
      <td>hedongyang</td>
      <td></td>
      <td>2018年5月12日</td>
      <td>0%</td>
      <td></td>
    </tr>
</table>
- [ ] im网关【hedongyang】:
<table>
  <tr>
    <th >功能</th>
    <th>详细解释</th>
    <th>负责人</th>
    <th>后台时间</th>
    <th>界面时间</th>
    <th>情况</th>
    <th>备注</th>
  </tr>
  <tr>
      <td>基本通讯功能的数据表设计</td>
      <td>
        1.支持cqrs设计
        2.一个服务单独控制一个库
      </td>
      <td>hedongyang</td>
      <td>2018年5月10日</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
</table>
- [ ] im服务【hedongyang】:
<table>
  <tr>
    <th >功能</th>
    <th>详细解释</th>
    <th>负责人</th>
    <th>后台时间</th>
    <th>界面时间</th>
    <th>情况</th>
    <th>备注</th>
  </tr>
  <tr>
      <td>mpns服务改为spring-boot项目</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
</table>
- [ ] 后台管理系统基础【hedongyang】
<table>
  <tr>
    <th >功能</th>
    <th>详细解释</th>
    <th>负责人</th>
    <th>后台时间</th>
    <th>界面时间</th>
    <th>情况</th>
    <th>备注</th>
  </tr>
  <tr>
      <td>用户管理</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
  </tr>
</table>
- [ ] 后台管理系统web端【hedongyang】
<table>
  <tr>
    <th >功能</th>
    <th>详细解释</th>
    <th>负责人</th>
    <th>后台时间</th>
    <th>界面时间</th>
    <th>情况</th>
    <th>备注</th>
  </tr>
  <tr>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
</table>
- [ ] Demo系统混合应用端【hedongyang】
<table>
  <tr>
    <th >功能</th>
    <th>详细解释</th>
    <th>负责人</th>
    <th>后台时间</th>
    <th>界面时间</th>
    <th>情况</th>
    <th>备注</th>
  </tr>
  <tr>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
</table>
total：0天 + 0天

####2 业务功能：

