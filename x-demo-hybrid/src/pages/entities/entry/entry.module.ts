import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { EntryPage } from './entry';
import { EntryService } from './entry.provider';

@NgModule({
    declarations: [
        EntryPage
    ],
    imports: [
        IonicPageModule.forChild(EntryPage),
        TranslateModule.forChild()
    ],
    exports: [
        EntryPage
    ],
    providers: [EntryService]
})
export class EntryPageModule {
}
