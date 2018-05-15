import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DemoHybridGatewaySharedModule } from '../../shared';
import {
    DemoEService,
    DemoEPopupService,
    DemoEComponent,
    DemoEDetailComponent,
    DemoEDialogComponent,
    DemoEPopupComponent,
    DemoEDeletePopupComponent,
    DemoEDeleteDialogComponent,
    demoERoute,
    demoEPopupRoute,
} from './';

const ENTITY_STATES = [
    ...demoERoute,
    ...demoEPopupRoute,
];

@NgModule({
    imports: [
        DemoHybridGatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DemoEComponent,
        DemoEDetailComponent,
        DemoEDialogComponent,
        DemoEDeleteDialogComponent,
        DemoEPopupComponent,
        DemoEDeletePopupComponent,
    ],
    entryComponents: [
        DemoEComponent,
        DemoEDialogComponent,
        DemoEPopupComponent,
        DemoEDeleteDialogComponent,
        DemoEDeletePopupComponent,
    ],
    providers: [
        DemoEService,
        DemoEPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DemoHybridGatewayDemoEModule {}
