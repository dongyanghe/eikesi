import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ImGatewaySharedModule } from 'app/shared';
import {
    HistoryMessageComponent,
    HistoryMessageDetailComponent,
    HistoryMessageUpdateComponent,
    HistoryMessageDeletePopupComponent,
    HistoryMessageDeleteDialogComponent,
    historyMessageRoute,
    historyMessagePopupRoute
} from './';

const ENTITY_STATES = [...historyMessageRoute, ...historyMessagePopupRoute];

@NgModule({
    imports: [ImGatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        HistoryMessageComponent,
        HistoryMessageDetailComponent,
        HistoryMessageUpdateComponent,
        HistoryMessageDeleteDialogComponent,
        HistoryMessageDeletePopupComponent
    ],
    entryComponents: [
        HistoryMessageComponent,
        HistoryMessageUpdateComponent,
        HistoryMessageDeleteDialogComponent,
        HistoryMessageDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ImGatewayHistoryMessageModule {}
