import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ImGatewayCustomerRelationModule } from './customer-relation/customer-relation.module';
import { ImGatewayFlockRelationModule } from './flock-relation/flock-relation.module';
import { ImGatewayCustomerFlockModule } from './customer-flock/customer-flock.module';
import { ImGatewayCustomerModule } from './customer/customer.module';
import { ImGatewayHistoryMessageModule } from './history-message/history-message.module';
import { ImGatewayCurrentMessageModule } from './current-message/current-message.module';
import { ImGatewayDialogueModule } from './dialogue/dialogue.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        ImGatewayCustomerRelationModule,
        ImGatewayFlockRelationModule,
        ImGatewayCustomerFlockModule,
        ImGatewayCustomerModule,
        ImGatewayHistoryMessageModule,
        ImGatewayCurrentMessageModule,
        ImGatewayDialogueModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ImGatewayEntityModule {}
