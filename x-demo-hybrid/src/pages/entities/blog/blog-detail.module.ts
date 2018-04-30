import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { BlogDetailPage } from './blog-detail';
import { BlogService } from './blog.provider';

@NgModule({
    declarations: [
        BlogDetailPage
    ],
    imports: [
        IonicPageModule.forChild(BlogDetailPage),
        TranslateModule.forChild()
    ],
    exports: [
        BlogDetailPage
    ],
    providers: [BlogService]
})
export class BlogDetailPageModule {
}
