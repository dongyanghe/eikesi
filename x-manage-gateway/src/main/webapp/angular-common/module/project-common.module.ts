import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { DataTableModule, DialogModule, ConfirmDialogModule, DropdownModule, CheckboxModule, RadioButtonModule, TreeTableModule, TreeModule, TreeNode, ContextMenuModule} from 'primeng/primeng';
import { DynamicFormComponent } from '../../angular-common/module/dynamic-form/dynamic-form.component';
import { Datepicker } from '../../angular-common/module/date/datepicker.component';
import { FlowchartComponent } from '../../angular-common/module/flowchart/flowchart.component';
import { NgZorroAntdModule, NzRadioGroupComponent} from 'ng-zorro-antd';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { SelectClassModule } from './ngx-select-class/select-class.module';
import {SharedModule} from '../../app/shared/shared.module';
import {ValueToLabelPipe, ValueToLabelImpurePipe} from '../../angular-common/pipe/DictPipe';

// import {DpDatePickerModule} from 'ng2-date-picker';
@NgModule({
  imports: [
    CheckboxModule,
    RadioButtonModule,
    TreeModule,
    TreeTableModule,
    ContextMenuModule,
    SelectClassModule,
    SharedModule
  ],
  declarations: [
    DynamicFormComponent,
    FlowchartComponent,
    Datepicker
  ],
  exports: [
    DynamicFormComponent,
    FlowchartComponent,
    Datepicker,
    TreeTableModule,
    ContextMenuModule
  ],
  providers: [],
  // schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ProjectCommonModule {
}
