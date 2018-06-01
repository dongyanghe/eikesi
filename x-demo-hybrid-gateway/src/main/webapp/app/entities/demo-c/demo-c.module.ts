import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DemoHybridGatewaySharedModule } from '../../shared';
import {
    DemoCService,
    DemoCPopupService,
    DemoCComponent,
    DemoCDetailComponent,
    DemoCDialogComponent,
    DemoCPopupComponent,
    DemoCDeletePopupComponent,
    DemoCDeleteDialogComponent,
    demoCRoute,
    demoCPopupRoute,
} from './';

const ENTITY_STATES = [
    ...demoCRoute,
    ...demoCPopupRoute,
];

@NgModule({
    imports: [
        DemoHybridGatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DemoCComponent,
        DemoCDetailComponent,
        DemoCDialogComponent,
        DemoCDeleteDialogComponent,
        DemoCPopupComponent,
        DemoCDeletePopupComponent,
    ],
    entryComponents: [
        DemoCComponent,
        DemoCDialogComponent,
        DemoCPopupComponent,
        DemoCDeleteDialogComponent,
        DemoCDeletePopupComponent,
    ],
    providers: [
        DemoCService,
        DemoCPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DemoHybridGatewayDemoCModule {}
