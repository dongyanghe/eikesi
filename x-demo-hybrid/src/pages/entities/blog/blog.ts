import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, ToastController } from 'ionic-angular';
import { Blog } from './blog.model';
import { BlogService } from './blog.provider';

@IonicPage({
    defaultHistory: ['EntityPage']
})
@Component({
    selector: 'page-blog',
    templateUrl: 'blog.html'
})
export class BlogPage {
    blogs: Blog[];

    // todo: add pagination

    constructor(private navCtrl: NavController, private blogService: BlogService,
                private modalCtrl: ModalController, private toastCtrl: ToastController) {
        this.blogs = [];
    }

    ionViewDidLoad() {
        this.loadAll();
    }

    loadAll(refresher?) {
        this.blogService.query().subscribe(
            (response) => {
                this.blogs = response;
                if (typeof(refresher) !== 'undefined') {
                    refresher.complete();
                }
            },
            (error) => {
                console.error(error);
                let toast = this.toastCtrl.create({message: 'Failed to load data', duration: 2000, position: 'middle'});
                toast.present();
            });
    }

    trackId(index: number, item: Blog) {
        return item.id;
    }

    open(slidingItem: any, item: Blog) {
        let modal = this.modalCtrl.create('BlogDialogPage', {item: item});
        modal.onDidDismiss(blog => {
            if (blog) {
                if (blog.id) {
                    this.blogService.update(blog).subscribe(data => {
                        this.loadAll();
                        let toast = this.toastCtrl.create(
                            {message: 'Blog updated successfully.', duration: 3000, position: 'middle'});
                        toast.present();
                        slidingItem.close();
                    }, (error) => console.error(error));
                } else {
                    this.blogService.create(blog).subscribe(data => {
                        this.blogs.push(data);
                        let toast = this.toastCtrl.create(
                            {message: 'Blog added successfully.', duration: 3000, position: 'middle'});
                        toast.present();
                    }, (error) => console.error(error));
                }
            }
        });
        modal.present();
    }

    delete(blog) {
        this.blogService.delete(blog.id).subscribe(() => {
            let toast = this.toastCtrl.create(
                {message: 'Blog deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    detail(blog: Blog) {
        this.navCtrl.push('BlogDetailPage', {id: blog.id});
    }
}
