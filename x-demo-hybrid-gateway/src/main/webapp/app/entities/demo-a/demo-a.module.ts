import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DemoHybridGatewaySharedModule } from '../../shared';
import {
    DemoAService,
    DemoAPopupService,
    DemoAComponent,
    DemoADetailComponent,
    DemoADialogComponent,
    DemoAPopupComponent,
    DemoADeletePopupComponent,
    DemoADeleteDialogComponent,
    demoARoute,
    demoAPopupRoute,
} from './';

const ENTITY_STATES = [
    ...demoARoute,
    ...demoAPopupRoute,
];

@NgModule({
    imports: [
        DemoHybridGatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DemoAComponent,
        DemoADetailComponent,
        DemoADialogComponent,
        DemoADeleteDialogComponent,
        DemoAPopupComponent,
        DemoADeletePopupComponent,
    ],
    entryComponents: [
        DemoAComponent,
        DemoADialogComponent,
        DemoAPopupComponent,
        DemoADeleteDialogComponent,
        DemoADeletePopupComponent,
    ],
    providers: [
        DemoAService,
        DemoAPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DemoHybridGatewayDemoAModule {}
