
import path from 'path';

const config = {
    server: {
        port: process.env.PORT || 3000,
        host: '127.0.0.1'
    },
    /*
   'deBug'：本地服，'serviceDev'：开发服，'serviceTest'：测试服务，'service'：生产模式，

   */
    serviceType: 'deBug',
    //  本地服
    deBug: {
        requestUrl: 'http://127.0.0.1:9000/',
    },
    //  开发服
    serviceDev: {
        requestUrl: 'http://127.0.0.1:8001/', //
    },
    //  测试服
    serviceTest: {
        requestUrl: 'http://127.0.0.1:8001/', //
    },
    //  生产服（一般有多个备用）
    service1: {
        requestUrl: 'http://127.0.0.1:8001/', //
        backups: []
    },
    client: path.resolve(__dirname, '../src'),
    assets: path.resolve(__dirname, '../src/assets'),
    dist: path.resolve(__dirname, '../dist'),
};

export default config;
