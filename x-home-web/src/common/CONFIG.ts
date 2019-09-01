
export default const CONFIG = {
    version: '0.0.1',   //  每次发版修改版本号
  /**
   * 修改本字段对应下面的requestHost即可改变请求地址
   * 'deBug'：本地开发，'service'：在线服，'servicePre'：预发服，'serviceTest'：测试服  'serviceDev'：集成服
   */
  serviceType: 'deBug',
  projectName: 'Eikesi Home',
  loginTime: 60 * 60 * 1000, //  登录信息保存时长
  durationDuration: 60, //  验证码时长
  ok: 1,    //  正常的返回码
  unLogin: [], //  会话信息过期的错误码
  'timeout': 8000, //  请求超时时间
  //  路由名称
  stateProvider: {
    index: {
      name: '/',
      url: 'index.html'
    }
  },
  requestHost: {
    //  本地服务的路径配置
    deBug: '/',
    service: 'home.booturl.com/',   //  生产
    serviceTest: 'home.test.booturl.com/',  //  测试
  },
  //  所有模块的请求路径
  requestUrl: {
    axjs: {
      login: '/login'
    }
  }
};
