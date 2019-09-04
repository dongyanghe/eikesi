import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ManageMonolithicSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';

@NgModule({
  imports: [ManageMonolithicSharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [JhiLoginModalComponent],
  exports: [ManageMonolithicSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ManageMonolithicSharedModule {
  static forRoot() {
    return {
      ngModule: ManageMonolithicSharedModule
    };
  }
}
