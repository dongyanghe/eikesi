import { OnChanges } from '@angular/core';
import { MsgService } from '../service/MsgService';
import { FormService } from '../service/FormService';
import { UtilityService } from '../service/UtilityService';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import { HttpService } from '../service/HttpService';
import { NzModalService } from 'ng-zorro-antd';
import { FormControl, FormGroup } from '@angular/forms';
import {MenuItem} from 'primeng/primeng';
import { DynamicFormTemplate, FormControlBase } from '../module/dynamic-form/entity';
/**
 * 实体类
 */
import { Result } from '../../angular-common/entity/Result';
/**
 * 配置类
 */
import { CONFIG } from '../../data/CONFIG';
import { URL } from '../../data/URL';
import { CODE } from '../../data/CODE';
import { debug } from 'util';
import { UserService } from '../service/UserService';

/**
 * @Title 列表公共控制器
 * @Description 列表页基本功能的封装
 * @author hedongyang
 * @date 
 * @version V1.0
 */
export abstract class ListBaseComponent {
  get menuItem(): MenuItem[] {
    return this._menuItem;
  }

  set menuItem(value: MenuItem[]) {
    this._menuItem = value;
  }
  get params(): any {
    return this._params;
  }

  set params(value: any) {
    this._params = value;
  }
  get componentNameStr(): string {
    return this._componentNameStr;
  }

  set componentNameStr(value: string) {
    this._componentNameStr = value;
  }
  get formControlList(): Array<FormControlBase<any>> {
    return this._formControlList;
  }

  set formControlList(value: Array<FormControlBase<any>>) {
    this._formControlList = value;
  }

  get fields(): FormControlBase<any>[] {
    return this._fields;
  }

  set fields(value: FormControlBase<any>[]) {
    this._fields = value;
  }

  get isCollapsed(): boolean {
    return this._isCollapsed;
  }

  set isCollapsed(value: boolean) {
    this._isCollapsed = value;
  }

  get nzModalService(): NzModalService {
    return this._nzModalService;
  }

  set nzModalService(value: NzModalService) {
    this._nzModalService = value;
  }
  get URL(): any {
    return this._URL;
  }

  set URL(value: any) {
    this._URL = value;
  }
  get op(): OP {
    return this._op;
  }

  set op(value: OP) {
    this._op = value;
  }
  get moduleName(): string {
    return this._moduleName;
  }

  set moduleName(value: string) {
    this._moduleName = value;
  }
  /**
   * 页面载入后获取路径参数
   * ngOnInit触发后才有值
   * @type {{}}
   * @private
   */
  private _params: any = {};
  private _menuItem: MenuItem[] = [];
  protected _requestUrl: string = URL[CONFIG.serviceType].requestUrl;
  private _CONFIG: any = CONFIG;
  private _URL: any = URL;
  currentPage: any = 1;
  pageSize: any = 15;
  //  是否需要分页
  paginatorFlag: any = true;
  _moduleName: string;
  _op?: OP = new OP();
  _backStateName?: ''; //  返回路径
  _templateName?: 'list';
  _formGroup: FormGroup; //  由一堆FormControl组成
  _componentNameStr: string = ''; //  模块名称
  //  有需要行选中功能时，这个参数必填
  _formDataIdKeyStr: string = 'id';
  _formDataNameKeyStr: string = 'name';
  private _fields: FormControlBase<any>[] = [];
  private _formControlList: Array<FormControlBase<any>>;
  //  排序
  _orderParamsList: any[];
  private _isCollapsed: boolean = false;
  _filterParam: any = {}; //  显示在界面的查询条件——void：直接读取formGroup.value
  _originFilterParam: any = {};  //  原初始查询条件
  _nowFilterParam: any = {}; //  当前查询条件
  _resultList: any[];   //  表格数据
  _totalInt: any =  {};    //  对应查询条件下的数据总数
  _totalServerInt: number = 0;    //  数据库总条数
  //  初始化页面时查询
  _queryInitBol: boolean = true;
  private _msgService: MsgService;
  private _http: HttpService;
  private _router: Router;
  private _nzModalService?: NzModalService;
  userService: UserService;
  activatedRoute: ActivatedRoute;
  /**
   * 初始化列表模块
   * @param options
   * @param queryAfterInit：是否载入页面便查询数据，默认true
   * @param filter
   */
  constructor(
    activatedRoute: ActivatedRoute,
    router: Router,
    http: HttpService,
    msgService: MsgService,
    userService: UserService,
    nzModalService?: NzModalService) {
    // UtilityService.extendDeep(this, options);
    let self = this;
    self._router = router;
    self._http = http;
    self._msgService = msgService;
    self.userService = userService;
    // self.url = {
    //   select: this.userService.getUrl(self.op.select),
    //   selectCount: this.userService.getUrl(self.op.selectCount),
    //   update: this.userService.getUrl(self.op.update),
    //   delete: this.userService.getUrl(self.op.delete),
    // };
  }
  /**
   * 生命周期
   * 1.获取params参数
   * 2.发起列表查询
   * 3.判断是否是新增页
   * 4.初始化formGroup表单
   */
  ngOnInit() {
    let self = this;
    const pathname = window.location.pathname;
    this.activatedRoute.params.subscribe(
      params => {
        console.dir('FormBaseComponent ngOnInit activatedRoute', params);
        self.params = params || {};
        // this.activatedRoute.params.subscribe(
        //   params => {
        //     console.log('ListBaseComponent', params);
        //   });
        console.log('父类ngOnInit');
        if (self.onBeforeOnInit()) {
          return;
        }
        if (self._formControlList) {
          self.formGroup = FormService.toFormGroup(self._formControlList);
        }
        self.query();
        self.onAfterOnInit();
      });
    //  路由改变后触发getPagedDataAsync查询（第一次进页面只触发query查询）
    this.router.events.filter(e => e instanceof NavigationEnd).subscribe(e => {
      const nowPathname = self.router.url.split(/^[\;\?]$/)[0];
      if (nowPathname == pathname) {
        self.getPagedDataAsync();
        // if (this.paginatorFlag) {
        //   self.getPageDataCount();
        // }
      }
    });

  }
  /**
   * Callback
   */
  onBeforeOnInit() {

  };

  /**
   * Callback
   */
  onAfterOnInit() {
  };
  /**
   * Callback
   */
  onBeforeQuery() {

  };

  /**
   * Callback
   */
  onAfterQuery() {
  };

  /**
   * Callback
   */
  onBeforeDataQueried(data) {

  };

  /**
   * Callback
   */
  onAfterDataQueried(data) {
  };

  // 删除
  onBeforeDelete(formData: any = {}, rowIndex: number) {
  };

  onAfterDelete(result: Result, rowIndex: number) {
  };

  // 重置
  onBeforeReset() {
  };

  onAfterReset() {
  };
  /**
   * 保存前置切入
   * return: true 中断保存
   */
  onBeforeUpdate( formData: any = {}, rowIndex: number) {
  };

  /**
   * 保存后置切入
   * return: true 中断成功操作
   */
  onAfterUpdate(result: Result, rowIndex: number) {
  };
  //  查询总数之前
  onBeforePageDataCount() { }

  /**
   * 返回
   * 有返回页backStateName时就返回该页，没有则返回上一页
   */
  back() {
    let self = this;
    if (self._backStateName) {
      this._router.navigateByUrl(self.backStateName);
    } else {
      history.back();
    }
  }

  /**
   * 查询按钮的调用方法：
   */
  query() {
    let self = this;
    // UtilityService.extendDeep(self.filterParam, self.formGroup.value);
    //  获取查询表单的值
    // self.filterParam = self.formGroup.value;
    if (self.formGroup) {
      self.nowFilterParam = UtilityService.deleteEmptyAttr(self.formGroup.getRawValue());
    }
    if (self.onBeforeQuery()) {
      return;
    }
    self.getPagedDataAsync();
    if (this.paginatorFlag) {
      self.getPageDataCount();
    }
    self.onAfterQuery();
  };

  /**
   * 获取对应查询条件下的数据库总条数
   */
  getPageDataCount() {
    let self = this;
    self.onBeforePageDataCount();

    let url = this.userService.getUrl(self.op.selectCount, self.moduleName);

    let parameter = {
      body: self.nowFilterParam
    };
    let reqData = {
      data: parameter,
      op: self.op.selectCount
    };
    /**
     * 请求成功处理
     * 请求成功且errcode为通过
     * @param response
     * @param result
     */
    let success = function (response: any, result?: Result) {
      if (result.data) {
        self.totalInt = result.data;
      } else {
        self.totalInt = 0;
      }

    };
    /**
     * 异常处理
     * 带exception为请求异常或代码异常，其中请求异常拦截器会有所处理
     * @param response
     * @param exception
     */
    let error = function (response: any, exception?: any) {
      self.totalInt = 0;
      if (exception) {
        console.error(exception);
      }
    };
    self.http.post(url, reqData)
      .subscribe(
      response => {
        try {

          let result: Result = new Result(response.json());
          /*如果返回正常*/
          if (result.code === CONFIG.ok) {
            success(response, result);
          } else {
            error(response);
          }
        } catch (exception) {
          error(response, exception);
        }
        // line = data;
      },
      response => {
        error(response);
      });
  };

  /**
   * 获取对应查询条件下的列表数据
   */
  getPagedDataAsync() {
    let self = this;
    let url = this.userService.getUrl(self.op.select, self.moduleName);
    self.nowFilterParam = self.nowFilterParam || {};
    let parameter = {
      body: self.nowFilterParam
    };
    if (this.paginatorFlag) {
      parameter['currentPage'] = self.currentPage;
      parameter['pageSize'] = self.pageSize;
    }
    let reqData = {
      data: parameter,
      op: self.op.select
    };
    /**
     * 请求成功处理
     * 请求成功且errcode为通过
     * @param response
     * @param result
     */
    let success = function (response: any, result?: Result) {
      if (!result.data) {
        self.msgService.pop({ type: 'error', body: CODE.dataError });
        return;
      }
      if ((!result.data.body
        || !result.data.body.length) && self.paginatorFlag) {
        // self.msgService.pop({ type: 'info', body: CODE.noData });
        result.data.body = [];
      } else if ((!result.data  //  不分页的数据格式
        || !result.data.length) && !self.paginatorFlag) {
        // self.msgService.pop({ type: 'info', body: CODE.noData });
        result.data.body = [];
      }
      self.resultList = self.paginatorFlag ? result.data.body : result.data;
    };
    /**
     * 异常处理
     * 带exception为请求异常或代码异常，其中请求异常拦截器会有所处理
     * @param response
     * @param exception
     */
    let error = function (response: any, exception?: any) {
      self.resultList = [];
      if (exception) {
        console.error(exception);
      }
    };
    self.http.post(url, reqData)
      .subscribe(
      response => {
        try {

          let result: Result = new Result(response.json());
          /*如果返回正常*/
          if (result.code === CONFIG.ok) {
            success(response, result);
          } else {
            /*后台返回异常*/
            self.msgService.pop({ type: 'error', body: result.msg });
            error(response);
          }
        } catch (exception) {
          error(response, exception);
        }
        // line = data;
      },
      response => {
        error(response);
      });
  };

  /**
   * 修改方法
   */
  update(orginalData: any = {}, rowIndex: number) {
    let self = this;
    let formData =  Object.assign({}, orginalData);
    //  self.formData =  UtilityService.extendDeep({}, self.orginalData, self.formGroup.value);
    if (self.onBeforeUpdate(formData, rowIndex)) {
      return;
    }
    let url = this.userService.getUrl(self.op.update, self.moduleName);
    let reqData = {
      data: UtilityService.deleteEmptyAttr(formData),
      op: self.op.update
      //  token:'MjAxNzEyMjAxMjA0MTk2MTc6YWRtaW46QEIjMzImKkFCYWI6REVTS1RPUC1FVEkyREhUOjA\\u003d\\'
    };
    /**
     * 请求成功处理
     * 请求成功且errcode为通过
     * @param response
     * @param result
     */
    let success = function (response: any, result?: Result) {
      self.msgService.pop({type: 'success', body: CODE.updateSuccess});
      //  赋值修改后的数据
      self.resultList[rowIndex] = Object.assign( {}, self.resultList[rowIndex], formData);
      Object.assign(  orginalData, formData);
      // self.back();
    };
    /**
     * 异常处理
     * 带exception为请求异常或代码异常，其中请求异常拦截器会有所处理
     * @param response
     * @param exception
     */
    let error = function (response: any, exception?: any) {
      if (exception) {
        console.error(exception);
      }
    };
    self.http.post(url, reqData)
      .subscribe(
        response => {
          try {
            let result: Result = new Result(response.json());
            /*如果返回正常*/
            if (result.code === CONFIG.ok) {
              if (self.onAfterUpdate(result, rowIndex)) {
                return;
              }
              success(response, result);
            } else {
              /*后台返回异常*/
              self.msgService.pop({type: 'error', body: result.msg});
              error(response);
            }
          } catch (exception) {
            error(response, exception);
          }
          // line = data;
        },
        response => {
          error(response);
        });
  };

  /**
   * 删除按钮的调用方法：
   */
  delete(orginalData: any = {}, rowIndex) {
    let self = this;
    let formData =  Object.assign({}, orginalData);
    if (self.onBeforeDelete(formData, rowIndex)) {
      return;
    }
    console.log('确定');
    let url = this.userService.getUrl(self.op.delete, self.moduleName);
    let reqData = {
      data: formData,
      op: self.op.delete
    };
    // reqData.data[self.formDataIdKeyStr] = formData[self.formDataIdKeyStr];
    /**
     * 请求成功处理
     * 请求成功且errcode为通过
     *
     * @param response
     * @param result
     */
    let success = function (response: any, result?: Result) {
      self.msgService.pop({ type: 'success', body: CODE.deleteSuccess });
      self.getPagedDataAsync();
    };
    /**
     * 异常处理
     * 带exception为请求异常或代码异常，其中请求异常拦截器会有所处理
     * @param response
     * @param exception
     */
    let error = function (response: any, exception?: any) {
      if (exception) {
        console.error(exception);
      }
    };
    self.http.post(url, reqData)
      .subscribe(
      response => {
        try {
          let result: Result = new Result(response.json());
          /*如果返回正常*/
          if (result.code === CONFIG.ok) {
            if (self.onAfterDelete(result, rowIndex)) {
              return;
            }
            success(response, result);
          } else {
            /*后台返回异常*/
            self.msgService.pop({ type: 'error', body: result.msg });
            error(response);
          }
        } catch (exception) {
          error(response, exception);
        }
        // line = data;
      },
      response => {
        error(response);
      });
  };

  /**
   * 删除按钮的调用方法：
   */
  batchDelete(entity) {
  };

  /**
   * 重置按钮的调用方法：
   */
  reset() {
    let self = this;
    self.onBeforeReset();
    self.formGroup.reset(self.originFilterParam || {});
    // self.filterParam.name = 'reset reset';
    //  将数据模型的部分值赋给表单模式用以展示
    // self.formGroup.patchValue(self.originFilterParam);
    // self.filterParam = Object.create(self.originFilterParam);
    self.query();
    self.onAfterReset();
  };
  /**
   * 自定义分页方法，（记得在p-dataTable标签里面加上属性lazy= true (onPage)='userPaginator($event)'）
   * @param event
   */
  userPaginator(event) {
    // debugger;
    this.pageSize = event.rows;
    this.currentPage = parseInt(((event.first + 1) / this.pageSize) + '') + 1;
    this.getPagedDataAsync();
    this.afterUserPaginator();
  }
  afterUserPaginator() {

  }

  get templateName() {
    return this._templateName;
  }

  set templateName(value) {
    this._templateName = value;
  }
  get formGroup(): FormGroup {
    return this._formGroup;
  }

  set formGroup(value: FormGroup) {
    this._formGroup = value;
  }
  get CONFIG(): any {
    return this._CONFIG;
  }

  set CONFIG(value: any) {
    this._CONFIG = value;
  }

  get msgService(): MsgService {
    return this._msgService;
  }

  set msgService(value: MsgService) {
    this._msgService = value;
  }

  get http(): HttpService {
    return this._http;
  }

  set http(value: HttpService) {
    this._http = value;
  }

  get router(): Router {
    return this._router;
  }

  set router(value: Router) {
    this._router = value;
  }



  get requestUrl(): string {
    return this._requestUrl;
  }

  set requestUrl(value: string) {
    this._requestUrl = value;
  }



  get backStateName() {
    return this._backStateName;
  }

  set backStateName(value) {
    this._backStateName = value;
  }

  get formDataIdKeyStr() {
    return this._formDataIdKeyStr;
  }

  set formDataIdKeyStr(value) {
    this._formDataIdKeyStr = value;
  }

  get formDataNameKeyStr() {
    return this._formDataNameKeyStr;
  }

  set formDataNameKeyStr(value) {
    this._formDataNameKeyStr = value;
  }

  get orderParamsList(): any[] {
    return this._orderParamsList;
  }

  set orderParamsList(value: any[]) {
    this._orderParamsList = value;
  }

  get filterParam(): any {
    return this._filterParam;
  }

  set filterParam(value: any) {
    this._filterParam = value;
  }

  get originFilterParam(): any {
    return this._originFilterParam;
  }

  set originFilterParam(value: any) {
    this._originFilterParam = value;
  }

  get nowFilterParam(): any {
    return this._nowFilterParam;
  }

  set nowFilterParam(value: any) {
    this._nowFilterParam = value;
  }

  get resultList(): any[] {
    return this._resultList || [];
  }

  set resultList(value: any[]) {
    this._resultList = value || [];
  }

  get totalInt(): {} {
    return this._totalInt;
  }

  set totalInt(value: {}) {
    this._totalInt = value;
  }

  get totalServerInt(): any {
    return this._totalServerInt;
  }

  set totalServerInt(value: any) {
    this._totalServerInt = value;
  }

  get queryInitBol(): boolean {
    return this._queryInitBol;
  }

  set queryInitBol(value: boolean) {
    this._queryInitBol = value;
  }
}
export class OP {
  select?: string = URL.op.select;
  selectCount?: string = URL.op.count;
  update?: string = URL.op.update;
  delete?: string = URL.op.delete;

}
