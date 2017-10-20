import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { GatewaySnapshotPendingModule } from './snapshot-pending/snapshot-pending.module';
import { GatewaySnapshotModule } from './snapshot/snapshot.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        GatewaySnapshotPendingModule,
        GatewaySnapshotModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayEntityModule {}
