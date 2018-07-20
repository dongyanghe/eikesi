import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DemoGatewaySharedModule } from 'app/shared';
import {
    CurrentMessageComponent,
    CurrentMessageDetailComponent,
    CurrentMessageUpdateComponent,
    CurrentMessageDeletePopupComponent,
    CurrentMessageDeleteDialogComponent,
    currentMessageRoute,
    currentMessagePopupRoute
} from './';

const ENTITY_STATES = [...currentMessageRoute, ...currentMessagePopupRoute];

@NgModule({
    imports: [DemoGatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        CurrentMessageComponent,
        CurrentMessageDetailComponent,
        CurrentMessageUpdateComponent,
        CurrentMessageDeleteDialogComponent,
        CurrentMessageDeletePopupComponent
    ],
    entryComponents: [
        CurrentMessageComponent,
        CurrentMessageUpdateComponent,
        CurrentMessageDeleteDialogComponent,
        CurrentMessageDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DemoGatewayCurrentMessageModule {}
