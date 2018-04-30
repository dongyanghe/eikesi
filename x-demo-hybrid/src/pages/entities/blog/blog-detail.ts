import { Component } from '@angular/core';
import { IonicPage, ModalController, NavParams, ToastController } from 'ionic-angular';
import { Blog } from './blog.model';
import { BlogService } from './blog.provider';

@IonicPage({
    segment: 'blog-detail/:id',
    defaultHistory: ['EntityPage', 'blogPage']
})
@Component({
    selector: 'page-blog-detail',
    templateUrl: 'blog-detail.html'
})
export class BlogDetailPage {
    blog: Blog;

    constructor(private modalCtrl: ModalController, params: NavParams,
                private blogService: BlogService, private toastCtrl: ToastController) {
        this.blog = new Blog();
        this.blog.id = params.get('id');
    }

    ionViewDidLoad() {
        this.blogService.find(this.blog.id).subscribe(data => this.blog = data);
    }

    open(item: Blog) {
        let modal = this.modalCtrl.create('BlogDialogPage', {item: item});
        modal.onDidDismiss(blog => {
            if (blog) {
                this.blogService.update(blog).subscribe(data => {
                    this.blog = data;
                    let toast = this.toastCtrl.create(
                        {message: 'Blog updated successfully.', duration: 3000, position: 'middle'});
                    toast.present();
                }, (error) => console.error(error));
            }
        });
        modal.present();
    }

}
