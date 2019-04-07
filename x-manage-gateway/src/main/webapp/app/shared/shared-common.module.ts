import { NgModule } from '@angular/core';

import { ManageGatewaySharedLibsModule, FindLanguageFromKeyPipe, JhiAlertComponent, JhiAlertErrorComponent } from './';
import {BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
    imports: [ManageGatewaySharedLibsModule, BrowserAnimationsModule],
    declarations: [FindLanguageFromKeyPipe, JhiAlertComponent, JhiAlertErrorComponent],
    exports: [ManageGatewaySharedLibsModule, FindLanguageFromKeyPipe, JhiAlertComponent, JhiAlertErrorComponent, BrowserAnimationsModule]
})
export class ManageGatewaySharedCommonModule {}
