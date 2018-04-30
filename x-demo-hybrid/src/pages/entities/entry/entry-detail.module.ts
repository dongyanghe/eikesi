import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { EntryDetailPage } from './entry-detail';
import { EntryService } from './entry.provider';

@NgModule({
    declarations: [
        EntryDetailPage
    ],
    imports: [
        IonicPageModule.forChild(EntryDetailPage),
        TranslateModule.forChild()
    ],
    exports: [
        EntryDetailPage
    ],
    providers: [EntryService]
})
export class EntryDetailPageModule {
}
