import {Injectable} from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {
  Http, Response, Headers, RequestOptions, URLSearchParams, RequestOptionsArgs, RequestMethod
} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Observable} from 'rxjs';
import {DateService} from './DateService';

import {MsgService} from './MsgService';
import {UserService} from './UserService';
// import {ToasterService} from 'angular2-toaster';
/**
 * 全局变量
 */
import {CONFIG} from '../../data/CONFIG';
import {URL} from '../../data/URL';
import {CODE} from '../../data/CODE';
//  import { GLOBAL } from '../../data/DICT';
/**
 * void 废
 */
@Injectable()
export class UrlService {
  get permissionUrl(): any {
    return this._permissionUrl;
  }

  set permissionUrl(value: any) {
    this._permissionUrl = value;
  }

  private _permissionUrl: any = URL.permissionUrl;
  constructor(public http: Http,
              public msgService: MsgService,
              public userService: UserService,
              public activatedRoute: ActivatedRoute) {
    // this.msgService = new MsgService(new ToasterService());
    // this.msgService = msgService;
    console.log('/************************init HttpIntercept************************/');
    // msgService
  }


}
