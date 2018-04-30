import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { BlogPage } from './blog';
import { BlogService } from './blog.provider';

@NgModule({
    declarations: [
        BlogPage
    ],
    imports: [
        IonicPageModule.forChild(BlogPage),
        TranslateModule.forChild()
    ],
    exports: [
        BlogPage
    ],
    providers: [BlogService]
})
export class BlogPageModule {
}
