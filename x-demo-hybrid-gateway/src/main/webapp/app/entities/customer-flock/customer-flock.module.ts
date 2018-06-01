import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DemoHybridGatewaySharedModule } from '../../shared';
import {
    CustomerFlockService,
    CustomerFlockPopupService,
    CustomerFlockComponent,
    CustomerFlockDetailComponent,
    CustomerFlockDialogComponent,
    CustomerFlockPopupComponent,
    CustomerFlockDeletePopupComponent,
    CustomerFlockDeleteDialogComponent,
    customerFlockRoute,
    customerFlockPopupRoute,
    CustomerFlockResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...customerFlockRoute,
    ...customerFlockPopupRoute,
];

@NgModule({
    imports: [
        DemoHybridGatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CustomerFlockComponent,
        CustomerFlockDetailComponent,
        CustomerFlockDialogComponent,
        CustomerFlockDeleteDialogComponent,
        CustomerFlockPopupComponent,
        CustomerFlockDeletePopupComponent,
    ],
    entryComponents: [
        CustomerFlockComponent,
        CustomerFlockDialogComponent,
        CustomerFlockPopupComponent,
        CustomerFlockDeleteDialogComponent,
        CustomerFlockDeletePopupComponent,
    ],
    providers: [
        CustomerFlockService,
        CustomerFlockPopupService,
        CustomerFlockResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DemoHybridGatewayCustomerFlockModule {}
