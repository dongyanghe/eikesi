import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DemoGatewaySharedModule } from 'app/shared';
import {
    FlockRelationComponent,
    FlockRelationDetailComponent,
    FlockRelationUpdateComponent,
    FlockRelationDeletePopupComponent,
    FlockRelationDeleteDialogComponent,
    flockRelationRoute,
    flockRelationPopupRoute
} from './';

const ENTITY_STATES = [...flockRelationRoute, ...flockRelationPopupRoute];

@NgModule({
    imports: [DemoGatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        FlockRelationComponent,
        FlockRelationDetailComponent,
        FlockRelationUpdateComponent,
        FlockRelationDeleteDialogComponent,
        FlockRelationDeletePopupComponent
    ],
    entryComponents: [
        FlockRelationComponent,
        FlockRelationUpdateComponent,
        FlockRelationDeleteDialogComponent,
        FlockRelationDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DemoGatewayFlockRelationModule {}
