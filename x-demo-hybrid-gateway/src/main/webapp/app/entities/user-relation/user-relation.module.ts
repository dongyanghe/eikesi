import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DemoHybridGatewaySharedModule } from '../../shared';
import {
    UserRelationService,
    UserRelationPopupService,
    UserRelationComponent,
    UserRelationDetailComponent,
    UserRelationDialogComponent,
    UserRelationPopupComponent,
    UserRelationDeletePopupComponent,
    UserRelationDeleteDialogComponent,
    userRelationRoute,
    userRelationPopupRoute,
} from './';

const ENTITY_STATES = [
    ...userRelationRoute,
    ...userRelationPopupRoute,
];

@NgModule({
    imports: [
        DemoHybridGatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        UserRelationComponent,
        UserRelationDetailComponent,
        UserRelationDialogComponent,
        UserRelationDeleteDialogComponent,
        UserRelationPopupComponent,
        UserRelationDeletePopupComponent,
    ],
    entryComponents: [
        UserRelationComponent,
        UserRelationDialogComponent,
        UserRelationPopupComponent,
        UserRelationDeleteDialogComponent,
        UserRelationDeletePopupComponent,
    ],
    providers: [
        UserRelationService,
        UserRelationPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DemoHybridGatewayUserRelationModule {}
