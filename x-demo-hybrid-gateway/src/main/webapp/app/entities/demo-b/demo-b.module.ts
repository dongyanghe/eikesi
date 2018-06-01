import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DemoHybridGatewaySharedModule } from '../../shared';
import {
    DemoBService,
    DemoBPopupService,
    DemoBComponent,
    DemoBDetailComponent,
    DemoBDialogComponent,
    DemoBPopupComponent,
    DemoBDeletePopupComponent,
    DemoBDeleteDialogComponent,
    demoBRoute,
    demoBPopupRoute,
} from './';

const ENTITY_STATES = [
    ...demoBRoute,
    ...demoBPopupRoute,
];

@NgModule({
    imports: [
        DemoHybridGatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DemoBComponent,
        DemoBDetailComponent,
        DemoBDialogComponent,
        DemoBDeleteDialogComponent,
        DemoBPopupComponent,
        DemoBDeletePopupComponent,
    ],
    entryComponents: [
        DemoBComponent,
        DemoBDialogComponent,
        DemoBPopupComponent,
        DemoBDeleteDialogComponent,
        DemoBDeletePopupComponent,
    ],
    providers: [
        DemoBService,
        DemoBPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DemoHybridGatewayDemoBModule {}
