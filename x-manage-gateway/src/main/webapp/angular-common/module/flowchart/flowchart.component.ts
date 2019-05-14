import { Component, OnInit, Input } from '@angular/core';
import { ToasterConfig } from 'angular2-toaster';
import { MsgService } from '../../service/MsgService';

@Component({
    selector: 'flowchart',
    templateUrl: './flowchart.component.html',
    providers: [MsgService],
    styleUrls: ['./flowchart.component.scss']
})
export class FlowchartComponent implements OnInit {
    @Input() fieldDataList: Array<any>;
    private dataList: Array<any>;
    constructor() {}
    ngOnInit() {
        // let i =2;
        console.log('ddddd:' + this.dataList);
        this.dataList = this.fieldDataList;
    }
}
