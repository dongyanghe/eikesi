import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { NzMessageService } from 'ng-zorro-antd';
import { CONFIG } from '../../data/CONFIG';
import { CODE } from '../../data/CODE';
/**
 * 消息提示代理类
 *
 */
@Injectable()
export class MsgService {
    constructor(private toasterService: NzMessageService) {}

    /**
     * 打开toaster提示
     * 只有通过校验的提示才会展示
     * @param toastOption
     * @returns boolean 是否执行了消息弹出功能
     */
    public pop(toast: any, type = 'info'): boolean {
        if (!toast || !toast.body) {
            toast.body = CODE['500'];
        }
        if (this.checkPopRepeat(toast)) {
            this.toasterService.create(type, toast || toast.body);
            return true;
        }
        return false;
    }

    /**
     * 检查toaster提示是否重复
     * @param postId
     * @returns boolean 是否通过校验
     */
    public checkPopRepeat(toast: any): boolean {
        return true;
    }
}
