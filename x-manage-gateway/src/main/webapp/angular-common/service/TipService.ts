import { Injectable } from '@angular/core';
import { CONFIG } from '../../data/CONFIG';
import { enableProdMode } from '@angular/core';
enableProdMode();
/**
 * 消息提示代理类
 *
 */
@Injectable()
export class TipService {
    public _nzTip: string = '请稍后...';
    public _isSpinning: boolean = false;
    public _nzSize: string = 'large';
    private _timerOpen: any;
    private _timerClose: any;
    private _count: number = 0;
    constructor() {}
    /**
     * 打开loading
     */

    set count(value: number) {
        this._count = value;
        if (!value) {
            setTimeout(
                function() {
                    this._isSpinning = false;
                    this._nzSize = 'large';
                    this._nzTip = '请稍后...';
                }.bind(this),
                500
            );
        } else {
            this._isSpinning = true;
        }
    }
    get count(): number {
        return this._count;
    }
    public showLoading(option = {}) {
        this.count++;
        this._nzTip = option['_nzTip'] ? option['_nzTip'] : this._nzTip;
        this._nzSize = option['_nzSize'] ? option['_nzSize'] : this._nzSize;
        return this._isSpinning;
    }
    /**
     * 关闭loading
     */
    public hideLoading() {
        this.count--;
    }
}
