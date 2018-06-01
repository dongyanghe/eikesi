import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DemoHybridGatewaySharedModule } from '../../shared';
import {
    DemoDService,
    DemoDPopupService,
    DemoDComponent,
    DemoDDetailComponent,
    DemoDDialogComponent,
    DemoDPopupComponent,
    DemoDDeletePopupComponent,
    DemoDDeleteDialogComponent,
    demoDRoute,
    demoDPopupRoute,
} from './';

const ENTITY_STATES = [
    ...demoDRoute,
    ...demoDPopupRoute,
];

@NgModule({
    imports: [
        DemoHybridGatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DemoDComponent,
        DemoDDetailComponent,
        DemoDDialogComponent,
        DemoDDeleteDialogComponent,
        DemoDPopupComponent,
        DemoDDeletePopupComponent,
    ],
    entryComponents: [
        DemoDComponent,
        DemoDDialogComponent,
        DemoDPopupComponent,
        DemoDDeleteDialogComponent,
        DemoDDeletePopupComponent,
    ],
    providers: [
        DemoDService,
        DemoDPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DemoHybridGatewayDemoDModule {}
