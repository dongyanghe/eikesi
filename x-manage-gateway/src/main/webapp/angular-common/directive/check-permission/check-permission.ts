import { Directive, Input, TemplateRef, ViewContainerRef, ElementRef} from '@angular/core';

/**
 * @Title  check-permission -层级选择器（地址选择、组织结构选择等树形数据）
 * @Description 校验是否有权限并处理
 *  checkPermission格式为：资源:权限
 * @eg：check-permission='user:list@hide,user2:list2@hide' (如果没有查看用户列表的权限，则对元素进行隐藏)
 * @author hedongyang
 * @version V1.0
 * @date 
 */
@Directive({ selector: '[ngxCheckPermission]' })
export class NGXCheckPermissionDirective {
  constructor(
    // private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private elementRef: ElementRef) {
    // elementRef.nativeElement.style.backgroundColor = 'yellow';
  }
  @Input('ngxCheckPermission')
  set ngxCheckPermission(value: string) {
    console.log('permission', value);
    //  checkPermission格式为：资源:权限@操作，如：
    let permissionList = value.split(/[,@]/);
    let isCheck = true; //  是否满足其中一种权限
    if (permissionList.length < 2) {
      return ;
    }
    for (let i: number = 0; i <= permissionList.length; i++) {
      //  当是最后一个时执行操作
      if (i == (permissionList.length - 1) && !isCheck) {
        switch (permissionList[permissionList.length - 1]) {
          case 'delete' :
            this.elementRef.nativeElement.remove();
            break;
          case 'hide' :
            this.elementRef.nativeElement.addClass('hidden');
            break;
          default : //  'disabled'
            this.elementRef.nativeElement.setAttribute('disabled', 'disabled');
            this.elementRef.nativeElement.setAttribute('title', '没有权限');
        }
        break;
      }
      const permission = permissionList[i];
      let checkArray = permission.split(/[:]/);
      if (checkArray.length < 2) {
        return ;
      }
      // if (!permissionUrl[checkArray[0]]
      //   || !permissionUrl[checkArray[0]][checkArray[1]]) {
      //   isCheck = false;
      // }
    }
  }
}
