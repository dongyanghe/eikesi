export const CONFIG = {
    /*
     * 'deBug'：本地开发，'service'：生产服务，'serviceTest'：测试服务，'serviceDev'：集成服务
     */
    serviceType: 'deBug',
    projectName: 'manager',
    loginTime: 60 * 60 * 1000 /* //  登录信息保存时长*/,
    durationDuration: 60 /*  //  验证码时长*/,
    ok: 1,
    unLogin: [304] /*不能登录的错误码*/,
    sessionDue: -25 /* 会话信息过期  */,
    maxHeadTab: 8,
    uploadTime: 1000 * 60 * 1 /*//  文件上传提示的关闭延时*/,
    timeout: 8000 /*//  请求超时时间*/,
    //  无需展示加载框的请求
    unLoading: []
};
