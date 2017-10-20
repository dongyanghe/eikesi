import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    SnapshotPendingService,
    SnapshotPendingPopupService,
    SnapshotPendingComponent,
    SnapshotPendingDetailComponent,
    SnapshotPendingDialogComponent,
    SnapshotPendingPopupComponent,
    SnapshotPendingDeletePopupComponent,
    SnapshotPendingDeleteDialogComponent,
    snapshotPendingRoute,
    snapshotPendingPopupRoute,
} from './';

const ENTITY_STATES = [
    ...snapshotPendingRoute,
    ...snapshotPendingPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        SnapshotPendingComponent,
        SnapshotPendingDetailComponent,
        SnapshotPendingDialogComponent,
        SnapshotPendingDeleteDialogComponent,
        SnapshotPendingPopupComponent,
        SnapshotPendingDeletePopupComponent,
    ],
    entryComponents: [
        SnapshotPendingComponent,
        SnapshotPendingDialogComponent,
        SnapshotPendingPopupComponent,
        SnapshotPendingDeleteDialogComponent,
        SnapshotPendingDeletePopupComponent,
    ],
    providers: [
        SnapshotPendingService,
        SnapshotPendingPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewaySnapshotPendingModule {}
