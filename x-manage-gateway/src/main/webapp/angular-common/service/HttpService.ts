import {Injectable} from '@angular/core';
import {
  HttpClient, Response, Headers, RequestOptions, URLSearchParams, RequestOptionsArgs, RequestMethod
} from '@angular/common/http ';
import 'rxjs/add/operator/toPromise';
import {Observable} from 'rxjs';
import {DateService} from './DateService';

import {MsgService} from './MsgService';
import {TipService} from './TipService';
import {UtilityService} from './UtilityService';
import {UserService} from './UserService';
// import {ToasterService} from 'angular2-toaster';
/**
 * 实体类
 */
import {Result} from '../../angular-common/entity/Result';
/**
 * 全局变量
 */
import {CONFIG} from '../../data/CONFIG';
import {CODE} from '../../data/CODE';
import { ActivatedRoute, Router } from '@angular/router';
import {URL as Url}  from '../../data/URL';
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
  private _isUNLoginPop: boolean = false;

  constructor(public httpClient: HttpClient,
    public msgService: MsgService,
    public tipService: TipService,
    public userService: UserService,

    private router: Router) {
    // this.msgService = new MsgService(new ToasterService());
    // this.msgService = msgService;,
    // public UtilityService: UtilityService
    console.log('/************************init HttpIntercept************************/');
    // msgService
  }

  /**
   * 前置处理
   * @param type
   * @param url
   * @param options
   */
  requestBefore(url, options) {
    // console.log('msgService requestBefore');
    // this.msgService.pop({type: 'success', body: type + ' request before：' + url});
    // let self = this;
    if (!options) {
      return;
    }
    let isUnLoading = false;
    let len = CONFIG.unLoading.length;
    let token = this.userService.user && this.userService.user.token ? this.userService.user.token : null;

    let balance = this.userService.user ? this.userService.user.balance : null;
    /*******************请求头设置***********************/
    let headers: Headers = new Headers();
    // if (token) {
    //   // {'Content-Type': 'application/json'}
    //   headers.append('token', 'Bearer ' + token);
    // }
    // if (type === 'post') {
    //   headers.append('Content-Type', 'application/x-www-form-urlencoded');
    // }
    /*******************URL设置***********************/
    let indexInt = url.indexOf('?');
    let timeNum = new Date().getTime();
    if (indexInt < 0) {
      url = url + '?vt=' + timeNum;
    } else {
      if (indexInt === (url.length - 1)) {
        url = url + 'vt=' + timeNum;
      } else {
        url = url + '&vt=' + timeNum;
      }
    }
    if (balance) {
      url = url + '&balance=' + balance;
    }


    options.body = options.body || {data: {}};
    options.body.data = options.body.data || {};
    if (typeof options.body.data !== 'string') {
      options.body.data = JSON.stringify(options.body.data);
    }
    options.body.token = options.body.token || token;
    options.body.op = options.body.op || null;
    // multipart/form-data
    // 排除不能显示load的请求
    for (let i = 0; i < len; i++) {
      let unLoadingUrl = CONFIG.unLoading[i];
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
      url: url,
      options: options
    };
  }

  requestSuccess(url, options, response: Response) {
    // let self = this;
    // nativeService.hideLoading();
    console.log('%c 请求成功 %c', 'color:green', '', 'url', url, 'options', options, 'res', response);
    if (response) {
      let result = response.json();
      if (result.code == CONFIG.sessionDue) {
        this.router.navigate(['/login', {errorCode:  CONFIG.sessionDue}]);
        // self.msgService.pop({type: 'error', body: CODE.againLogin});
        return true;
      }
    }
    return false;
  }

  requestError(url, options, error) {
    let self = this;
    // nativeService.hideLoading();
    console.error('%c 请求失败 %c', 'color:red', '', 'url', url, 'options', options, 'error', error);
    let status = error.status;
    if (!status || status === -1) {
      self.msgService.pop({type: 'error', body: CODE.reqSystemError});
    } else if (status === 401) {
      let result =  error.json();
      self.toasterUNLogin(result.submsg);
    } else if (CODE[status]) {  //  如果有对应错误码提示
      self.msgService.pop({type: 'error', body: CODE[status]});
    } else {
      self.msgService.pop({type: 'error', body: CODE.reqHttpError + status});
    }
  }

  public request(url: string, options: RequestOptionsArgs): Observable<Response> {
    let self = this;
    return Observable.create((observer) => {
      if (self.isCanLaoding(url)) {
        self.tipService.showLoading();
      }
      const checkData = this.requestBefore(url, options);
      console.log('%c 请求前 %c', 'color:blue', '', 'url', checkData.url, 'options', checkData.options);
      this.httpClient.request(checkData.url, checkData.options).subscribe((res: Response) => {
        if (self.isCanLaoding(url)) {
          self.tipService.hideLoading();
        }
        if (!this.requestSuccess(url, options, res)) {
          console.log('%c 请求成功 %c', 'color:green', '', 'url', url, 'options', options, 'res', res);
          observer.next(res);
        } else {
          console.log('%c 请求异常 %c', 'color:yellow', '', 'url', url, 'options', options, 'res', res);
        }
      }, (res: Result) => {
        if (self.isCanLaoding(url)) {
          self.tipService.hideLoading();
        }
        console.log('%c 请求失败 %c', 'color:red', '', 'url', url, 'options', options, 'res', res);
        this.requestError(url, options, res);
        observer.error(res);
      });
    });
  }

  public get(url: string, paramMap: any = null): Observable<Response> {
    if (CONFIG.serviceType === 'mock') {
      // '/login?a=1'
      // '/login.json?a=1'
      // '/login'
      url = 'mock' + url;
      if (url.indexOf('?') > 0) {
        url = UtilityService.insertFlg(url, '.json', url.indexOf('?'))
      }else {
        url += '.json';
      }
    }
    return this.request(url, new RequestOptions({
      method: RequestMethod.Get,
      search: this.buildURLSearchParams(paramMap)
    }));
  }

  public post(url: string, body: any = null): Observable<Response> {
    if (CONFIG.serviceType === 'mock') {
      return this.get(url, body);
    }
    return this.request(url, new RequestOptions({
      method: RequestMethod.Post,
      body: body,
      headers: new Headers({
        'Content-Type': 'application/json; charset=UTF-8'
      })
    }));
  }

  public postFormData(url: string, paramMap: any = null): Observable<Response> {
    return this.request(url, new RequestOptions({
      method: RequestMethod.Post,
      search: this.buildURLSearchParams(paramMap).toString(),
      headers: new Headers({
        'Content-Type': 'multipart/form-data; charset=UTF-8'
      })
    }));
  }

  public put(url: string, body: any = null): Observable<Response> {
    return this.request(url, new RequestOptions({
      method: RequestMethod.Put,
      body: body
    }));
  }

  public delete(url: string, paramMap: any = null): Observable<Response> {
    return this.request(url, new RequestOptions({
      method: RequestMethod.Delete,
      search: this.buildURLSearchParams(paramMap).toString()
    }));
  }

  public patch(url: string, body: any = null): Observable<Response> {
    return this.request(url, new RequestOptions({
      method: RequestMethod.Patch,
      body: body
    }));
  }

  public head(url: string, paramMap: any = null): Observable<Response> {
    return this.request(url, new RequestOptions({
      method: RequestMethod.Head,
      search: this.buildURLSearchParams(paramMap).toString()
    }));
  }

  public options(url: string, paramMap: any = null): Observable<Response> {
    return this.request(url, new RequestOptions({
      method: RequestMethod.Options,
      search: this.buildURLSearchParams(paramMap).toString()
    }));
  }

  /**
   * 将对象转为查询参数
   * @param paramMap
   * @returns {URLSearchParams}
   */
   buildURLSearchParams(paramMap): URLSearchParams {
    let params = new URLSearchParams();
    if (!paramMap) {
      return params;
    }
    for (let key in paramMap) {
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
  let self = this;
  if (!self._isUNLoginPop) {
    self._isUNLoginPop = true;
    self.msgService.pop(
      {
        type: 'info',
        timeout: 2000,
        body: msg || '',
        onHideCallback: function () {
          // 跳到登录页
          let goUrl = window.location.origin + CONFIG[CONFIG.serviceType].baseUrl + CONFIG.stateProvider.login.url;
          window.location.href = goUrl;
          self._isUNLoginPop = false;
        }
      }
    );
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
    // if (this.userService.user && this.userService.user.id) {
    //   url = url.replace(this.userService.user.url, '');
    // }
    let u = new URL(url);
    console.log(url, CONFIG.unLoading.indexOf(u.pathname));
    return  CONFIG.unLoading.indexOf(u.pathname.replace('/', '')) < 0
  }
}
