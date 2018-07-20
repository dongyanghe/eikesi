import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DemoGatewaySharedModule } from 'app/shared';
import {
    CustomerFlockComponent,
    CustomerFlockDetailComponent,
    CustomerFlockUpdateComponent,
    CustomerFlockDeletePopupComponent,
    CustomerFlockDeleteDialogComponent,
    customerFlockRoute,
    customerFlockPopupRoute
} from './';

const ENTITY_STATES = [...customerFlockRoute, ...customerFlockPopupRoute];

@NgModule({
    imports: [DemoGatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        CustomerFlockComponent,
        CustomerFlockDetailComponent,
        CustomerFlockUpdateComponent,
        CustomerFlockDeleteDialogComponent,
        CustomerFlockDeletePopupComponent
    ],
    entryComponents: [
        CustomerFlockComponent,
        CustomerFlockUpdateComponent,
        CustomerFlockDeleteDialogComponent,
        CustomerFlockDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DemoGatewayCustomerFlockModule {}
