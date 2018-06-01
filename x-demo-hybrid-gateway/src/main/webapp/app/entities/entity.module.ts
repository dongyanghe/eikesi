import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { DemoHybridGatewayBlogModule } from './blog/blog.module';
import { DemoHybridGatewayEntryModule } from './entry/entry.module';
import { DemoHybridGatewayTagModule } from './tag/tag.module';
import { DemoHybridGatewayUserRelationModule } from './user-relation/user-relation.module';
import { DemoHybridGatewayUserFlockModule } from './user-flock/user-flock.module';
import { DemoHybridGatewayDemoAModule } from './demo-a/demo-a.module';
import { DemoHybridGatewayDemoBModule } from './demo-b/demo-b.module';
import { DemoHybridGatewayDemoCModule } from './demo-c/demo-c.module';
import { DemoHybridGatewayDemoDModule } from './demo-d/demo-d.module';
import { DemoHybridGatewayDemoEModule } from './demo-e/demo-e.module';
import { DemoHybridGatewayCustomerRelationModule } from './customer-relation/customer-relation.module';
import { DemoHybridGatewayFlockRelationModule } from './flock-relation/flock-relation.module';
import { DemoHybridGatewayCustomerFlockModule } from './customer-flock/customer-flock.module';
import { DemoHybridGatewayCustomerModule } from './customer/customer.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        DemoHybridGatewayBlogModule,
        DemoHybridGatewayEntryModule,
        DemoHybridGatewayTagModule,
        DemoHybridGatewayUserRelationModule,
        DemoHybridGatewayUserFlockModule,
        DemoHybridGatewayDemoAModule,
        DemoHybridGatewayDemoBModule,
        DemoHybridGatewayDemoCModule,
        DemoHybridGatewayDemoDModule,
        DemoHybridGatewayDemoEModule,
        DemoHybridGatewayCustomerRelationModule,
        DemoHybridGatewayFlockRelationModule,
        DemoHybridGatewayCustomerFlockModule,
        DemoHybridGatewayCustomerModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DemoHybridGatewayEntityModule {}
