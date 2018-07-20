import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { DemoGatewayHistoryMessageModule } from './history-message/history-message.module';
import { DemoGatewayCurrentMessageModule } from './current-message/current-message.module';
import { DemoGatewayDialogueModule } from './dialogue/dialogue.module';
import { DemoGatewayCustomerRelationModule } from './customer-relation/customer-relation.module';
import { DemoGatewayFlockRelationModule } from './flock-relation/flock-relation.module';
import { DemoGatewayCustomerFlockModule } from './customer-flock/customer-flock.module';
import { DemoGatewayCustomerModule } from './customer/customer.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        DemoGatewayHistoryMessageModule,
        DemoGatewayCurrentMessageModule,
        DemoGatewayDialogueModule,
        DemoGatewayCustomerRelationModule,
        DemoGatewayFlockRelationModule,
        DemoGatewayCustomerFlockModule,
        DemoGatewayCustomerModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DemoGatewayEntityModule {}
