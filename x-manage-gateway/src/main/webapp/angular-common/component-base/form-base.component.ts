import {OnInit} from '@angular/core';
import {MsgService} from '../service/MsgService';
import {UtilityService} from '../service/UtilityService';
import {FormService} from '../service/FormService';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {NzModalSubject} from 'ng-zorro-antd';
import {MenuItem} from 'primeng/primeng';
import {HttpService} from '../service/HttpService';

import {FormControl, FormGroup} from '@angular/forms';
import {DynamicFormTemplate, FormControlBase, DynamicFormGroup} from '../module/dynamic-form/entity';
/**
 * 实体类
 */
import {Result} from '../../angular-common/entity/Result';
/**
 * 配置类
 */
import {CONFIG} from '../../data/CONFIG';
import {URL} from '../../data/URL';
import {CODE} from '../../data/CODE';
import {UserService} from '../service/UserService';

/**implements OnInit
 * @Title 表单页公共控制器，本模版跟业务强绑定
 * @Description 表单页基本功能的封装
 * @author hedongyang
 * @date 
 * @version V1.0
 */
export abstract class FormBaseComponent implements OnInit {
  get menuItem(): MenuItem[] {
    return this._menuItem;
  }

  set menuItem(value: MenuItem[]) {
    this._menuItem = value;
  }

  /**
   * 页面载入后获取路径参数
   * ngOnInit触发后才有值
   * @type {{}}
   * @private
   */
  _params: any = {};
  imagesList: any;
  protected _requestUrl: string = URL[CONFIG.serviceType].requestUrl;
  _CONFIG: any = CONFIG;
  _CODE: any = CODE;
  private _URL: any = URL;
  // _url: {
  //   //  查询请求路径
  //   select?: string,
  //   //  新增和修改的请求路径
  //   save?: string,
  //   //  修改的请求路径
  //   update?: string,
  //   //  删除请求路径
  //   delete?: string,
  // };
  private _op?: OP = new OP();
  _backUrl: string; //  返回按钮跳转的页面
  private _templateName: 'form';
  _ifModal: boolean = false; // 默认不是弹窗
  private _isFormAddBol: boolean = null; // 是否是新增页面，默认根据formDataIdKeyStr是否有值来判断
  private _isFormModifyBol: boolean = false; // 表单是否被修改过，默认否
  _formControlLists: Array<Array<FormControlBase<any> | DynamicFormGroup>>;
  private _menuItem: MenuItem[] = [];
  /**
   * 必须理解数据模型是如何映射到表单模型中的属性的。
   * 用户修改时的数据流是从DOM元素流向表单模型（_form）的，而不是数据模型（_formData）。表单控件永远不会修改数据模型。
   */
  _formGroup: FormGroup; //  由一堆FormControl组成
  _formData: any = {}; //  当前显示在界面的表单数据——void：模板驱动的表单使用改对象，如果是响应式表单则直接读取formGroup.value
  _orginalData: any = {}; //  原始传入或后台返回的表单数据，用于重置时恢复原数据，在数据源（eg:后台数据库）更新后需手动同步
  _moduleName: string = undefined;
  _componentNameStr: string = ''; //  模块名称
  //  有需要行选中功能或表单修改功能时这个参数必填
  _formDataIdKeyStr: string = 'id';
  _formDataNameKeyStr: string = 'name';
  _msgService: MsgService;
  userService: UserService;
  _activatedRoute: ActivatedRoute;
  _http: HttpService;
  private _nzModalSubject?: NzModalSubject;
  _router: Router;

  /**
   * 初始化列表模块
   * @param activatedRoute
   * @param router
   * @param http
   * @param confirmationService
   * @param msgService
   */
  constructor(activatedRoute: ActivatedRoute,
              router: Router,
              http: HttpService,
              msgService: MsgService,
              userService: UserService,
              nzModalSubject?: NzModalSubject) {
    // UtilityService.extendDeep(this, options);
    let self = this;
    self._activatedRoute = activatedRoute;
    self.router = router;
    self.http = http;
    self.msgService = msgService;
    self.userService = userService;
    self._nzModalSubject = nzModalSubject;
    /**
     * 用于监听modal对象各个阶段的事件
     */
    self._nzModalSubject && self.nzModalSubject.on('onDestory', () => {
      console.log('FormBaseComponent onDestory');
    });
  }

  /**
   * 生命周期
   * 在第一轮 ngOnChanges 完成之后调用。
   * ( 译注：也就是说当每个输入属性的值都被触发了一次 ngOnChanges 之后才会调用 ngOnInit ，
   * 此时所有输入属性都已经有了正确的初始绑定值 )
   * 1.获取params参数
   * 2.发起fetch查询
   * 3.判断是否是新增页
   * 4.初始化formGroup表单
   */
  ngOnInit() {
    let self = this;
    // const pathname = window.location.pathname;
    //  路由改变后触发查询
    // this.router.events.filter(e => e instanceof NavigationEnd).subscribe(e => {
    //   const nowPathname = self.router.url.split(/^[\;\?]$/)[0];
    //   if (nowPathname == pathname) {
    //     self.fetch();
    //     // if (this.paginatorFlag) {
    //     //   self.getPageDataCount();
    //     // }
    //   }
    // });
    this.activatedRoute.params.subscribe(
      params => {
        console.dir('FormBaseComponent ngOnInit activatedRoute', params);
        self.params = params || {};
        //  如果orginalData没有id则从页面路径带的参数获取
        self.orginalData[self.formDataIdKeyStr] = self.orginalData[self.formDataIdKeyStr] || self.params[self.formDataIdKeyStr];
        //  如果未配置isFormAddBol则依据formDataId值来判断是否是新增页面
        if (self.isFormAddBol === null && !self.orginalData[self.formDataIdKeyStr]) {
          self.isFormAddBol = true;
        } else {
          self.isFormAddBol = false;
        }
        if (self.onBeforeOnInit()) {
          return;
        }
        self.formGroup = FormService.toFormGroup(...self.formControlLists);
        //  careful:formGroup改变时必须同步orginalData以保证formGroup初始数据与orginalData一致
        //  如果orginalData有值就覆盖formControlList默认的值
        self.formGroup.patchValue(self.orginalData || {});
        //  将formControlList和orginalData合并后的表单值赋给orginalData,orginalData保留原始数据（eg:id,type...）
        Object.assign( self.orginalData, self.formGroup.getRawValue());
        if (!self.onAfterOnInit(params) && self.orginalData[self.formDataIdKeyStr]) {
          // debugger;
          self.fetch();
        }
      }
    );
    // self.orginalData = self.formGroup.value;

  }

  /**
   * Callback
   */
  onBeforeOnInit() {

  };

  /**
   * Callback
   */
  onAfterOnInit(params: any) {
    return false;
  };

  /**
   * Callback
   */
  onBeforeQuery() {

  };

  /**
   * 查询前置切入
   * eg:
   * 1.后台格式转为视图格式
   * 2.单位转换
   */
  onAfterQuery(response, result: Result) {

  };

  /**
   * 保存前置切入
   * eg:
   * 1.视图格式转为后台格式
   * 2.单位转换
   * 3.表单校验
   * return: true 中断保存
   */
  onBeforeSave() {
  };

  /**
   * 保存后置切入
   * return: true 中断成功操作
   */
  onAfterSave(result) {
  };
  /**
   * 保存前置切入
   * return: true 中断保存
   */
  onBeforeUpdate() {
  };

  /**
   * 保存后置切入
   * return: true 中断成功操作
   */
  onAfterUpdate(result) {
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
  onBeforeDelete() {
  };

  onAfterDelete(result) {
  };

  // 重置
  onBeforeReset() {
  };

  onAfterReset() {
  };

  /**
   * 返回
   * 有返回页backStateName时就返回该页，没有则返回上一页
   * bug:弹窗模式下，数据有修改或新增时对应表格应刷新
   */
  back(type: string = 'onOk', param: any = {}) {
    let self = this;
    if (self._ifModal) {
      self._nzModalSubject.destroy(type);
    } else if (self.backUrl) {
      this.router.navigateByUrl(self.backUrl, param);
    } else {
      history.back();
    }
  }

  /**
   * 查询表单调用方法：
   */
  fetch() {
    let self = this;
    if (self.onBeforeQuery()) {
      return;
    }
    let url = this.userService.getUrl(self.op.detail, self.moduleName);
    let reqData = {
      data: self.orginalData,
      op: self.op.detail
    }
    /**
     * 请求成功处理
     * 请求成功且errcode为通过
     * @param response
     * @param result
     */
    let success = function (response: any, result?: Result) {
      if (!result.data) {
        self.msgService.pop({type: 'error', body: CODE.dataError});
        return;
      }
      self.orginalData = result.data;
      //  将数据模型的部分值赋给表单模式用以展示
      self.formGroup.reset(self.orginalData);
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
              if (self.onAfterQuery(response, result)) {
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
   * 新增
   */
  save() {
    let self = this;
    // 把视图上的数据赋给模型formData
    // self.formData = self.formGroup.value;
    let formData = self.formGroup.getRawValue();
    self.formData = Object.assign( {}, self.orginalData, self.formGroup.getRawValue());
    // self.formData =  UtilityService.extendDeep( self.orginalData, self.formGroup.value);
    if (self.onBeforeSave()) {
      return;
    }
    if (self.formGroup.status !== 'VALID') {
      self.msgService.pop({type: 'info', body: CODE.formError});
      return;
    }
    let url = this.userService.getUrl(self.op.save, self.moduleName);
    let reqData = {
      data: UtilityService.deleteEmptyAttr(self.formData),
      op: self.op.save
    };
    /**
     * 请求成功处理
     * 请求成功且errcode为通过
     * @param response
     * @param result
     */
    let success = function (response: any, result?: Result) {
      self.msgService.pop({type: 'success', body: CODE.saveSuccess});
      self.reset();
      self.back();
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
              if (self.onAfterSave(result)) {
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
   * 修改方法
   * 部分save接口方法也能修改
   */
  update() {

    let self = this;
    // 把视图上的数据赋给模型formData
     self.formData = Object.assign( {}, self.orginalData, self.formGroup.getRawValue());
     // let a =  UtilityService.extendDeep({}, self.orginalData, self.formGroup.value);
    //  self.formData =  UtilityService.extendDeep({}, self.orginalData, self.formGroup.value);

    if (self.onBeforeUpdate()) {
      return;
    }
    if (self.formGroup.status !== 'VALID') {
      self.msgService.pop({type: 'info', body: CODE.formError});
      return;
    }
    let url = this.userService.getUrl(self.op.update, self.moduleName);
    let reqData = {
      data: UtilityService.deleteEmptyAttr(self.formData),
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
      self.orginalData = Object.assign( {}, self.orginalData, self.formGroup.getRawValue());
      // self.orginalData = JSON.parse(JSON.stringify(self.formGroup.value));
      self.back();
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
              if (self.onAfterUpdate(result)) {
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
   * 删除
   */
  delete() {
    let self = this;
    if (self.onBeforeDelete()) {
      return;
    }
    let url = this.userService.getUrl(self.op.delete, self.moduleName);
    let reqData = {
      data: UtilityService.deleteEmptyAttr(self.formGroup.getRawValue()),
      op: self.op.delete
    };
    /**
     * 请求成功处理
     * 请求成功且errcode为通过
     * @param response
     * @param result
     */
    let success = function (response: any, result?: Result) {
      self.msgService.pop({type: 'success', body: CODE.saveSuccess});
      self.back();
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
              if (self.onAfterDelete(result)) {
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
  }

  /**
   * 重置按钮的调用方法：
   */
  reset() {
    let self = this;
    self.onBeforeReset();
    this.formGroup.reset({});
    self.formGroup.reset(self.orginalData || {});
    self.onAfterReset();
  };

  get ifModal(): boolean {
    return this._ifModal;
  }

  set ifModal(value: boolean) {
    this._ifModal = value;
  }

  get formData(): any {
    return this._formData;
  }

  set formData(value: any) {
    this._formData = value;
  }

  get orginalData(): any {
    return this._orginalData;
  }

  set orginalData(value: any) {
    this._orginalData = value;
  }

  get requestUrl(): string {
    return this._requestUrl;
  }

  set requestUrl(value: string) {
    this._requestUrl = value;
  }

  get backUrl() {
    return this._backUrl;
  }

  set backUrl(value) {
    this._backUrl = value;
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


  get activatedRoute(): ActivatedRoute {
    return this._activatedRoute;
  }

  set activatedRoute(value: ActivatedRoute) {
    this._activatedRoute = value;
  }

  get params(): any {
    return this._params;
  }

  set params(value: any) {
    this._params = value;
  }

  get CODE(): any {
    return this._CODE;
  }

  set CODE(value: any) {
    this._CODE = value;
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

  get formControlLists(): Array<Array<FormControlBase<any> | DynamicFormGroup>> {
    return this._formControlLists;
  }

  set formControlLists(value: Array<Array<FormControlBase<any> | DynamicFormGroup>>) {
    this._formControlLists = value;
  }

  get moduleName(): string {
    return this._moduleName;
  }

  set moduleName(value: string) {
    this._moduleName = value;
  }
  get componentNameStr(): string {
    return this._componentNameStr;
  }

  set componentNameStr(value: string) {
    this._componentNameStr = value;
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

  get isFormAddBol(): boolean {
    return this._isFormAddBol;
  }

  set isFormAddBol(value: boolean) {
    this._isFormAddBol = value;
  }

  get isFormModifyBol(): boolean {
    return this._isFormModifyBol;
  }

  set isFormModifyBol(value: boolean) {
    this._isFormModifyBol = value;
  }

  get nzModalSubject(): NzModalSubject {
    return this._nzModalSubject;
  }

  set nzModalSubject(value: NzModalSubject) {
    this._nzModalSubject = value;
  }
}


class OP {
  detail?: string = URL.op.detail;
  save?: string = URL.op.save;
  update?: string = URL.op.update;
  delete?: string = URL.op.delete
}
