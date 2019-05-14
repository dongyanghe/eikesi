import { FormControlBase, FieldBaseOptions } from './FormControlBase';
import { HttpService } from '../../../service/HttpService';
import { Observable, Observer } from 'rxjs';
/**
 * 数据字典配置类
 */
import { DICT } from '../../../../data/DICT';
import { FormItemColSize } from './FormItemColSize';
import { Class } from '../../ngx-select-class/select-class.component';

export class SelectClass extends FormControlBase<Array<any>> {
    observable: Observable<any>;
    private observer: Observer<any>;
    /**
     * 每一层级的信息
     */
    classList: Array<Class>;
    /**
     * 待选数据列表
     */
    treeDataList: Array<any>;
    /**
     * 总的选择数据
     */
    requestDataList: (data: any, index: number) => Observable<any>;
    idKey: string;
    nameKey: string;
    asyncGrade: boolean;
    /**
     * 选择模式
     * treeRadio:树形结构最后一级单选
     * treeMulti:树形结构最后一级多选
     * levelRadio:平级结构单选
     * levelMulti:平级结构多选
     */
    mode: string;
    constructor(
        label: string,
        placeholder: string = '--请选择--',
        key: string,
        value: Array<any>,
        required: boolean = false,
        readonly: boolean = false,
        disabled: boolean = false,
        validation: string = '',
        title?: string,
        order?: number,
        classList: Array<any> = [],
        treeDataList: Array<any> = null,
        requestDataList: (data: any, index: number) => Observable<any> = null,
        asyncGrade: boolean = false,
        mode: string = 'TreeRadio',
        idKey: string = 'id',
        nameKey: string = 'name',
        formItemColSize?: FormItemColSize
    ) {
        super(
            'select-class',
            label,
            placeholder,
            key,
            value,
            undefined,
            required,
            readonly,
            disabled,
            validation,
            undefined,
            undefined,
            title,
            order,
            formItemColSize
        );
        const self = this;
        this.mode = mode;
        this.idKey = idKey;
        this.nameKey = nameKey;
        this.asyncGrade = asyncGrade;
        this.classList = classList;
        this.treeDataList = treeDataList;
        this.requestDataList = requestDataList;
        /* this.observable = Observable.create(observer => {
      this.observer = observer;
    });*/
    }
    onOpen(result) {
        let self = this;
        window.console.info('SelectClass onOpen', result);
        /*self.observer.next({
      type: 'onOpen',
      key: self.key,
      value: self.value
    });*/
    }
    onClosed(result) {
        let self = this;
        window.console.info('SelectClass onClosed', result);
        /*self.observer.next({
      type: 'onClosed',
      key: self.key,
      value: self.value
    });*/
    }
    onValueChange(value) {
        let self = this;
        window.console.info('SelectClass onValueChange', value);
    }
}
