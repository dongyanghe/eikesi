import {Component, OnInit, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';

import {Column} from './entity';

@Component({
  selector: 'table-control',
  templateUrl: 'table-control.component.html',
  styleUrls: ['table-control.component.scss']
})
/**
 * 表格模版
 * 还未开发
 */
export class TableControlComponent implements OnInit {
  @Input() field: Column;
  selectedColumn: any;

  constructor() {
  }

  ngOnInit() {

  }
}
