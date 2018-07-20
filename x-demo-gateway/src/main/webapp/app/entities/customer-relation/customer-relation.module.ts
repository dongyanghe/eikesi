import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DemoGatewaySharedModule } from 'app/shared';
import {
    CustomerRelationComponent,
    CustomerRelationDetailComponent,
    CustomerRelationUpdateComponent,
    CustomerRelationDeletePopupComponent,
    CustomerRelationDeleteDialogComponent,
    customerRelationRoute,
    customerRelationPopupRoute
} from './';

const ENTITY_STATES = [...customerRelationRoute, ...customerRelationPopupRoute];

@NgModule({
    imports: [DemoGatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        CustomerRelationComponent,
        CustomerRelationDetailComponent,
        CustomerRelationUpdateComponent,
        CustomerRelationDeleteDialogComponent,
        CustomerRelationDeletePopupComponent
    ],
    entryComponents: [
        CustomerRelationComponent,
        CustomerRelationUpdateComponent,
        CustomerRelationDeleteDialogComponent,
        CustomerRelationDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DemoGatewayCustomerRelationModule {}
