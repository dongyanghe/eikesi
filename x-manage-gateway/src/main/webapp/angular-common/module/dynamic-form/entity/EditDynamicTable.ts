import { FormControlBase, FieldBaseOptions } from './FormControlBase';
import { FormItemColSize } from './FormItemColSize';
import { FormControl, FormGroup, FormArray, AbstractControl, Validators } from '@angular/forms';
import { UtilityService } from '../../../service/UtilityService';
import { HttpService } from '../../../service/HttpService';
/**
 * 数据字典配置类
 */
import { DICT } from '../../../../data/DICT';
import { Textbox } from './index';
import { FormService } from '../../../service/FormService';

/**4178569610*\
 * ?., mnbvc
 *01  n.k l.,
 * 动态选择时间段
 * 可自定义新增
 */
export class EditDynamicTable extends FormControlBase<Array<any>> {
    get value(): Array<any> {
        return this._value;
    }

    set value(value: Array<any>) {
        let self = this;
        this._value = value || [];
        //  将值转换为表单视图
        for (const obj of self._value) {
            /*//    defect:该拷贝将不包括函数
      let editDynamicTableColListAssign = JSON.parse(JSON.stringify(self.editDynamicTableColList)); // UtilityService.extend([],self.editDynamicTableColList);
      for (const index in editDynamicTableColListAssign) {
        if (editDynamicTableColListAssign.hasOwnProperty(index)) {
          // console.log(index, editDynamicTableColListAssign[index].formControl.key, obj[editDynamicTableColListAssign[index].formControl.key]);
          editDynamicTableColListAssign[index].formControl.value = obj[editDynamicTableColListAssign[index].formControl.key];
        }
      }
      if (self.editDynamicTableRowList) {
        self.editDynamicTableRowList.push(new EditDynamicTableRow(editDynamicTableColListAssign));
      } else {
        self.editDynamicTableRowList = new Array(new EditDynamicTableRow(editDynamicTableColListAssign));
      }*/
        }
    }
    private _value: Array<any> = []; //  数据列表
    theadColList: Array<TheadCol> = []; //  顶部表格头的列列表
    editRowKey: number = null; //  当前处于编辑状态的行的下标
    // editDynamicTableRowList: Array<EditDynamicTableRow> = [];  //  报告内容的行列表
    editDynamicTableColList: Array<EditDynamicTableCol> = []; //  报告内容的列列表
    constructor(
        label: string,
        placeholder,
        keys: string | Array<string>,
        value: Array<any>,
        theadColList: Array<TheadCol>,
        editDynamicTableColList: Array<EditDynamicTableCol>,
        required: boolean = false,
        readonly: boolean = false,
        disabled: boolean = false,
        minlength?: number,
        maxlength?: number,
        title?: string,
        order?: number,
        formItemColSize?: FormItemColSize
    ) {
        super(
            'editDynamicTable',
            label,
            placeholder,
            keys,
            value,
            null,
            required,
            readonly,
            disabled,
            undefined,
            minlength,
            maxlength,
            title,
            order,
            formItemColSize
        );
        const self = this;
        self.value = value;
        self.theadColList = theadColList;
        self.editDynamicTableColList = editDynamicTableColList;
    }

    getFormArray(): FormArray {
        let editDynamicTableFormArray: Array<any> = [];
        if (this.value && this.value.length) {
            for (let obj of this.value) {
                let editDynamicTableGroup: any = {};
                for (let editDynamicTableCol of this.editDynamicTableColList) {
                    let validatorOrOpts = new Array(
                        Validators.min(editDynamicTableCol.formControl.minlength),
                        Validators.max(editDynamicTableCol.formControl.maxlength)
                    );
                    if (editDynamicTableCol.formControl.required) {
                        validatorOrOpts.push(Validators.required);
                    }
                    if (editDynamicTableCol.formControl.validation) {
                        validatorOrOpts.push(FormService.validationValidator(editDynamicTableCol.formControl.validation));
                    }
                    editDynamicTableGroup[editDynamicTableCol.formControl.key] = new FormControl(
                        obj[editDynamicTableCol.formControl.key],
                        validatorOrOpts
                    );
                }
                editDynamicTableFormArray.push(new FormGroup(editDynamicTableGroup));
            }
        }
        return new FormArray(editDynamicTableFormArray);
    }
    /**
     * _isEditRowBol为true显示修改表单
     * orginalValue备份修改前的值用于取消
     * @param {FormGroup} formGroup
     * @param {EditDynamicTableRow} editDynamicTableRow
     * @param {number} i
     */
    editRow(formGroup: FormGroup, control: AbstractControl, i: number) {
        const self = this;
        // let formArray = FormService.getControl(formGroup, self.keyList) as FormArray;
        self.editRowKey = i;
    }
    addRow(formGroup: FormGroup) {
        const self = this;
        let formArray: FormArray;
        // if (self.parentKey) {
        //   let abstractControl: FormGroup = formGroup.controls[self.parentKey] as FormGroup;
        //   formArray = abstractControl.controls[self.key] as FormArray;
        // }else {
        //   formArray = formGroup.controls[self.key] as FormArray;
        // }
        formArray = formGroup.get(self.keyList) as FormArray; //  FormService.getControl(formGroup, self.keyList) as FormArray;
        let editDynamicTableGroup: any = {};
        for (let editDynamicTableCol of self.editDynamicTableColList) {
            let validatorOrOpts = new Array(
                Validators.min(editDynamicTableCol.formControl.minlength),
                Validators.max(editDynamicTableCol.formControl.maxlength)
            );
            if (editDynamicTableCol.formControl.required) {
                validatorOrOpts.push(Validators.required);
            }
            editDynamicTableGroup[editDynamicTableCol.formControl.key] = new FormControl(
                editDynamicTableCol.formControl.value,
                validatorOrOpts
            );
        }
        formArray.push(new FormGroup(editDynamicTableGroup));
        //  设为编辑状态
        self.editRowKey = formArray.controls.length - 1;
        // formGroup.setControl(self.key, formArray);
        // self.editDynamicTableRowList.push(new EditDynamicTableRow(self.editDynamicTableColList));
    }
    deleteRow(formGroup: FormGroup, i: number) {
        const self = this;
        let formArray = formGroup.get(self.keyList) as FormArray; //  FormService.getControl(formGroup, self.keyList) as FormArray;
        // self.editDynamicTableRowList.splice(i, 1);
        formArray.removeAt(i);
        // formGroup.controls[self.key] = formArray;
    }
    saveRow(formGroup: FormGroup, control: AbstractControl, i: number) {
        const self = this;
        let formArray = formGroup.controls[self.key] as FormArray;
    }
    resetRow(formGroup: FormGroup, control: AbstractControl, i: number) {
        const self = this;
        let formArray = formGroup.get(self.keyList) as FormArray; //  FormService.getControl(formGroup, self.keyList) as FormArray;
        self.editRowKey = null;
        control.reset();
        // formArray.at(i).reset();
        // formGroup.controls[self.key] = formArray;
    }
}
export class TheadCol {
    label: string;
    title: string;
    width: string;
    constructor(label: string, title?: string, width?: string) {
        this.label = label;
        this.title = title;
        this.width = width;
    }
}
export class EditDynamicTableRow {
    _isEditRowBol: boolean;
    orginalValue: any;
    public editDynamicTableColList: Array<EditDynamicTableCol>; //  列列表
    constructor(editDynamicTableColList: Array<EditDynamicTableCol>) {
        this.editDynamicTableColList = editDynamicTableColList;
    }
}
export class EditDynamicTableCol {
    // name: string;
    // key: string;
    formControl: FormControlBase<any>;
    title?: string;
    width?: string;
    constructor(formControl: FormControlBase<any>, title?: string, width?: string) {
        this.formControl = formControl;
        this.title = title;
        this.width = width;
    }
}
