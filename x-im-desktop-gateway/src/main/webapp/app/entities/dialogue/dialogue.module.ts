import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ImGatewaySharedModule } from 'app/shared';
import {
    DialogueComponent,
    DialogueDetailComponent,
    DialogueUpdateComponent,
    DialogueDeletePopupComponent,
    DialogueDeleteDialogComponent,
    dialogueRoute,
    dialoguePopupRoute
} from './';

const ENTITY_STATES = [...dialogueRoute, ...dialoguePopupRoute];

@NgModule({
    imports: [ImGatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        DialogueComponent,
        DialogueDetailComponent,
        DialogueUpdateComponent,
        DialogueDeleteDialogComponent,
        DialogueDeletePopupComponent
    ],
    entryComponents: [DialogueComponent, DialogueUpdateComponent, DialogueDeleteDialogComponent, DialogueDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ImGatewayDialogueModule {}
