import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ManageGatewaySharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';

@NgModule({
  imports: [ManageGatewaySharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [JhiLoginModalComponent],
  exports: [ManageGatewaySharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ManageGatewaySharedModule {
  static forRoot() {
    return {
      ngModule: ManageGatewaySharedModule
    };
  }
}
