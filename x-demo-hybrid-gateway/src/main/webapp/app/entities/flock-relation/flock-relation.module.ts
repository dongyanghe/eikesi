import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DemoHybridGatewaySharedModule } from '../../shared';
import {
    FlockRelationService,
    FlockRelationPopupService,
    FlockRelationComponent,
    FlockRelationDetailComponent,
    FlockRelationDialogComponent,
    FlockRelationPopupComponent,
    FlockRelationDeletePopupComponent,
    FlockRelationDeleteDialogComponent,
    flockRelationRoute,
    flockRelationPopupRoute,
} from './';

const ENTITY_STATES = [
    ...flockRelationRoute,
    ...flockRelationPopupRoute,
];

@NgModule({
    imports: [
        DemoHybridGatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        FlockRelationComponent,
        FlockRelationDetailComponent,
        FlockRelationDialogComponent,
        FlockRelationDeleteDialogComponent,
        FlockRelationPopupComponent,
        FlockRelationDeletePopupComponent,
    ],
    entryComponents: [
        FlockRelationComponent,
        FlockRelationDialogComponent,
        FlockRelationPopupComponent,
        FlockRelationDeleteDialogComponent,
        FlockRelationDeletePopupComponent,
    ],
    providers: [
        FlockRelationService,
        FlockRelationPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DemoHybridGatewayFlockRelationModule {}
