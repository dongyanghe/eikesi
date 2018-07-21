import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ImGatewaySharedModule } from 'app/shared';
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
    imports: [ImGatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
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
export class ImGatewayCustomerRelationModule {}
