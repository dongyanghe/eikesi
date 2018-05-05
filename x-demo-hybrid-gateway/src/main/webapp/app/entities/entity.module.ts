import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { DemoHybridGatewayBlogModule } from './blog/blog.module';
import { DemoHybridGatewayEntryModule } from './entry/entry.module';
import { DemoHybridGatewayTagModule } from './tag/tag.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        DemoHybridGatewayBlogModule,
        DemoHybridGatewayEntryModule,
        DemoHybridGatewayTagModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DemoHybridGatewayEntityModule {}
