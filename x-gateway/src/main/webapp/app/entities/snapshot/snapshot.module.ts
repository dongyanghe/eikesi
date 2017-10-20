import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    SnapshotService,
    SnapshotPopupService,
    SnapshotComponent,
    SnapshotDetailComponent,
    SnapshotDialogComponent,
    SnapshotPopupComponent,
    SnapshotDeletePopupComponent,
    SnapshotDeleteDialogComponent,
    snapshotRoute,
    snapshotPopupRoute,
} from './';

const ENTITY_STATES = [
    ...snapshotRoute,
    ...snapshotPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        SnapshotComponent,
        SnapshotDetailComponent,
        SnapshotDialogComponent,
        SnapshotDeleteDialogComponent,
        SnapshotPopupComponent,
        SnapshotDeletePopupComponent,
    ],
    entryComponents: [
        SnapshotComponent,
        SnapshotDialogComponent,
        SnapshotPopupComponent,
        SnapshotDeleteDialogComponent,
        SnapshotDeletePopupComponent,
    ],
    providers: [
        SnapshotService,
        SnapshotPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewaySnapshotModule {}
