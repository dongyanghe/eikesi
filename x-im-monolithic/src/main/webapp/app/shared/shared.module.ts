import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ImMonolithicSharedCommonModule, HasAnyAuthorityDirective } from './';

@NgModule({
  imports: [ImMonolithicSharedCommonModule],
  declarations: [HasAnyAuthorityDirective],
  exports: [ImMonolithicSharedCommonModule, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ImMonolithicSharedModule {
  static forRoot() {
    return {
      ngModule: ImMonolithicSharedModule
    };
  }
}
