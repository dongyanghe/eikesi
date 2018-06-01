import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DemoHybridGatewaySharedModule } from '../../shared';
import {
    CustomerRelationService,
    CustomerRelationPopupService,
    CustomerRelationComponent,
    CustomerRelationDetailComponent,
    CustomerRelationDialogComponent,
    CustomerRelationPopupComponent,
    CustomerRelationDeletePopupComponent,
    CustomerRelationDeleteDialogComponent,
    customerRelationRoute,
    customerRelationPopupRoute,
} from './';

const ENTITY_STATES = [
    ...customerRelationRoute,
    ...customerRelationPopupRoute,
];

@NgModule({
    imports: [
        DemoHybridGatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CustomerRelationComponent,
        CustomerRelationDetailComponent,
        CustomerRelationDialogComponent,
        CustomerRelationDeleteDialogComponent,
        CustomerRelationPopupComponent,
        CustomerRelationDeletePopupComponent,
    ],
    entryComponents: [
        CustomerRelationComponent,
        CustomerRelationDialogComponent,
        CustomerRelationPopupComponent,
        CustomerRelationDeleteDialogComponent,
        CustomerRelationDeletePopupComponent,
    ],
    providers: [
        CustomerRelationService,
        CustomerRelationPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DemoHybridGatewayCustomerRelationModule {}
