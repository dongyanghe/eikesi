import { BlogService } from '../blog';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { EntryDialogPage } from './entry-dialog';
import { EntryService } from './entry.provider';

@NgModule({
    declarations: [
        EntryDialogPage
    ],
    imports: [
        IonicPageModule.forChild(EntryDialogPage),
        TranslateModule.forChild()
    ],
    exports: [
        EntryDialogPage
    ],
    providers: [
        EntryService,
        BlogService,
    ]
})
export class EntryDialogPageModule {
}
