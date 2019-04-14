import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpRequest, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs';
import { DateService } from './DateService';

import { MsgService } from './MsgService';
import { TipService } from './TipService';
import { UtilityService } from './UtilityService';
import { AccountService } from '../../app/core/auth/account.service';
/**
 * 全局变量
 */
import { CONFIG } from '../../data/CONFIG';
import { CODE } from '../../data/CODE';
import { ActivatedRoute, Router } from '@angular/router';
// import {URL as Url} from '../../data/URL';
//  import { GLOBAL } from '../../data/DICT';
/**
 * http请求代理类
 */
@Injectable()
export class HttpService {
    get isUNLoginPop(): boolean {
        return this._isUNLoginPop;
    }

    set isUNLoginPop(value: boolean) {
        this._isUNLoginPop = value;
    }
    // private msgService: MsgService;
    private _isUNLoginPop = false;

    constructor(
        public httpClient: HttpClient,
        public msgService: MsgService,
        public tipService: TipService,
        public accountService: AccountService,
        private router: Router
    ) {
        console.log('/************************init HttpIntercept************************/');
    }

    /**
     * 前置处理
     * @param type
     * @param url
     * @param options
     */
    requestBefore(url, options) {
        if (!options) {
            return;
        }
        let isUnLoading = false;
        const len = CONFIG.unLoading.length;
        /*******************请求头设置***********************/
        // let headers: HttpHeaders = new HttpHeaders();
        /*******************URL设置***********************/
        const indexInt = url.indexOf('?');
        const timeNum = new Date().getTime();
        if (indexInt < 0) {
            url = url + '?t=' + timeNum;
        } else {
            if (indexInt === url.length - 1) {
                url = url + 't=' + timeNum;
            } else {
                url = url + '&t=' + timeNum;
            }
        }
        options.body = options.body || { data: {} };
        options.body.data = options.body.data || {};
        if (typeof options.body.data !== 'string') {
            options.body.data = JSON.stringify(options.body.data);
        }
        // multipart/form-data
        // 排除不能显示load的请求
        for (let i = 0; i < len; i++) {
            const unLoadingUrl = CONFIG.unLoading[i];
            if (url === unLoadingUrl) {
                isUnLoading = true;
                continue;
            }
        }
        if (!isUnLoading) {
            // nativeService.showLoading();
        }
        //  options.headers = headers;
        return {
            url,
            options
        };
    }

    requestSuccess(url, options, response: HttpResponse<any>) {
        // nativeService.hideLoading();
        console.log('%c 请求成功 %c', 'color:green', '', 'url', url, 'options', options, 'res', response);
        if (response) {
            const result = response.json();
            if (result.code == CONFIG.sessionDue) {
                this.router.navigate(['/login', { errorCode: CONFIG.sessionDue }]);
                return true;
            }
        }
        return false;
    }

    requestError(url, options, error) {
        // nativeService.hideLoading();
        console.error('%c 请求失败 %c', 'color:red', '', 'url', url, 'options', options, 'error', error);
        const status = error.status;
        if (!status || status === -1) {
            this.msgService.pop({ type: 'error', body: CODE[500] });
        } else if (status === 401) {
            const result = error.json();
            this.toasterUNLogin(result.submsg);
        } else if (CODE[status]) {
            //  如果有对应错误码提示
            this.msgService.pop({ type: 'error', body: CODE[status] });
        } else {
            this.msgService.pop({ type: 'error', body: CODE[416] + status });
        }
    }

    public request(url: string, options: any): Observable<HttpResponse<any>> {
        return Observable.create((observer: any) => {
            if (this.isCanLaoding(url)) {
                this.tipService.showLoading();
            }
            const checkData = this.requestBefore(url, options);
            console.log('%c 请求前 %c', 'color:blue', '', 'url', checkData.url, 'options', checkData.options);
            this.httpClient.request(checkData.url, checkData.options).subscribe(
                (res: HttpResponse<any>) => {
                    if (this.isCanLaoding(url)) {
                        this.tipService.hideLoading();
                    }
                    if (!this.requestSuccess(url, options, res)) {
                        console.log('%c 请求成功 %c', 'color:green', '', 'url', url, 'options', options, 'res', res);
                        observer.next(res);
                    } else {
                        console.log('%c 请求异常 %c', 'color:yellow', '', 'url', url, 'options', options, 'res', res);
                    }
                },
                (res: any) => {
                    if (this.isCanLaoding(url)) {
                        this.tipService.hideLoading();
                    }
                    console.log('%c 请求失败 %c', 'color:red', '', 'url', url, 'options', options, 'res', res);
                    this.requestError(url, options, res);
                    observer.error(res);
                }
            );
        });
    }

    public get(url: string, paramMap: any = null): Observable<HttpResponse<any>> {
        if (CONFIG.serviceType === 'mock') {
            // '/login?a=1'
            // '/login.json?a=1'
            // '/login'
            url = 'mock' + url;
            if (url.indexOf('?') > 0) {
                url = UtilityService.insertFlg(url, '.json', url.indexOf('?'));
            } else {
                url += '.json';
            }
        }
        return this.request(url, {
            method: 'GET',
            params: this.buildURLSearchParams(paramMap)
        });
    }

    public post(url: string, body: any = null): Observable<HttpResponse<any>> {
        if (CONFIG.serviceType === 'mock') {
            return this.get(url, body);
        }
        return this.request(url, {
            method: 'Post',
            body,
            headers: new HttpHeaders({
                'Content-Type': 'application/json; charset=UTF-8'
            })
        });
    }

    public postFormData(url: string, paramMap: any = null): Observable<HttpResponse<any>> {
        return this.request(url, {
            method: 'Post',
            params: this.buildURLSearchParams(paramMap).toString(),
            headers: new HttpHeaders({
                'Content-Type': 'multipart/form-data; charset=UTF-8'
            })
        });
    }

    public put(url: string, body: any = null): Observable<HttpResponse<any>> {
        return this.request(url, {
            method: 'Put',
            body
        });
    }

    public delete(url: string, paramMap: any = null): Observable<HttpResponse<any>> {
        return this.request(url, {
            method: 'Delete',
            params: this.buildURLSearchParams(paramMap).toString()
        });
    }

    public patch(url: string, body: any = null): Observable<HttpResponse<any>> {
        return this.request(url, {
            method: 'Patch',
            body
        });
    }

    public head(url: string, paramMap: any = null): Observable<HttpResponse<any>> {
        return this.request(url, {
            method: 'Head',
            params: this.buildURLSearchParams(paramMap).toString()
        });
    }

    public options(url: string, paramMap: any = null): Observable<HttpResponse<any>> {
        return this.request(url, {
            method: 'Options',
            params: this.buildURLSearchParams(paramMap).toString()
        });
    }

    /**
     * 将对象转为查询参数
     * @param paramMap
     * @returns {HttpParams}
     */
    buildURLSearchParams(paramMap): HttpParams {
        const params = new HttpParams();
        if (!paramMap) {
            return params;
        }
        for (const key in paramMap) {
            if (paramMap.hasOwnProperty(key)) {
                let val = paramMap[key];
                if (val instanceof Date) {
                    val = DateService.dateFormat(val, 'yyyy-MM-dd hh:mm:ss');
                }
                params.set(key, val);
            }
        }
        return params;
    }

    /**
     * url中如果有双斜杠替换为单斜杠
     * 如:http://baidu.com//api//v1.替换后http://baidu.com/api/v1
     * @param url
     * @returns {string}
     */
    replaceUrl(url) {
        return url.substring(7).replace(/\/\//g, '/');
    }
    /**
     * 登录信息异常处理
     * @param msg
     */
    toasterUNLogin(msg) {
        if (!this._isUNLoginPop) {
            this._isUNLoginPop = true;
            this.msgService.pop({
                type: 'info',
                timeout: 2000,
                body: msg || '',
                onHideCallback: () => {
                    // 跳到登录页
                    const goUrl = window.location.origin + CONFIG[CONFIG.serviceType].baseUrl;
                    window.location.href = goUrl;
                    this._isUNLoginPop = false;
                }
            });
        }
    }
    /**
     * 当前请求url是否可以打开loading
     * @param url
     */
    private isCanLaoding(url) {
        if (!url) {
            return false;
        }
        // if (this.accountService.userIdentity && this.accountService.userIdentity.id) {
        //   url = url.replace(this.accountService.userIdentity.url, '');
        // }
        const laodingUrl = new URL(url);
        console.log(url, CONFIG.unLoading.indexOf(laodingUrl.pathname));
        return CONFIG.unLoading.indexOf(laodingUrl.pathname.replace('/', '')) < 0;
    }
}
