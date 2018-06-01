import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DemoHybridGatewaySharedModule } from '../../shared';
import {
    UserFlockService,
    UserFlockPopupService,
    UserFlockComponent,
    UserFlockDetailComponent,
    UserFlockDialogComponent,
    UserFlockPopupComponent,
    UserFlockDeletePopupComponent,
    UserFlockDeleteDialogComponent,
    userFlockRoute,
    userFlockPopupRoute,
} from './';

const ENTITY_STATES = [
    ...userFlockRoute,
    ...userFlockPopupRoute,
];

@NgModule({
    imports: [
        DemoHybridGatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        UserFlockComponent,
        UserFlockDetailComponent,
        UserFlockDialogComponent,
        UserFlockDeleteDialogComponent,
        UserFlockPopupComponent,
        UserFlockDeletePopupComponent,
    ],
    entryComponents: [
        UserFlockComponent,
        UserFlockDialogComponent,
        UserFlockPopupComponent,
        UserFlockDeleteDialogComponent,
        UserFlockDeletePopupComponent,
    ],
    providers: [
        UserFlockService,
        UserFlockPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DemoHybridGatewayUserFlockModule {}
