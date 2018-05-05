import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { Entry } from './entry.model';
import { EntryService } from './entry.provider';
import { Blog, BlogService } from '../blog';

@IonicPage()
@Component({
    selector: 'page-entry-dialog',
    templateUrl: 'entry-dialog.html'
})
export class EntryDialogPage {

    entry: Entry;
    blogs: Blog[];
    date: string;
    isReadyToSave: boolean;

    form: FormGroup;

    constructor(public navCtrl: NavController, public viewCtrl: ViewController, public toastCtrl: ToastController,
                formBuilder: FormBuilder, params: NavParams,
                private blogService: BlogService,
                private entryService: EntryService) {
        this.entry = params.get('item');
        if (this.entry && this.entry.id) {
            this.entryService.find(this.entry.id).subscribe(data => {
                this.entry = data;
            });
        } else {
            this.entry = new Entry();
        }

        this.form = formBuilder.group({
            id: [params.get('item') ? this.entry.id : null],
            title: [params.get('item') ? this.entry.title : '',  Validators.required],
            content: [params.get('item') ? this.entry.content : '',  Validators.required],
            date: [params.get('item') ? this.entry.date : '', ],
            blog: [params.get('item') ? this.entry.blog : '',],
        });

        // Watch the form for changes, and
        this.form.valueChanges.subscribe((v) => {
            this.isReadyToSave = this.form.valid;
        });

    }

    ionViewDidLoad() {
        this.blogService.query()
            .subscribe(data => { this.blogs = data; }, (error) => this.onError(error));
    }

    /**
     * The user cancelled, dismiss without sending data back.
     */
    cancel() {
        this.viewCtrl.dismiss();
    }

    /**
     * The user is done and wants to create the entry, so return it
     * back to the presenter.
     */
    done() {
        if (!this.form.valid) { return; }
        this.viewCtrl.dismiss(this.form.value);
    }

    onError(error) {
        console.error(error);
        let toast = this.toastCtrl.create({message: 'Failed to load data', duration: 2000, position: 'middle'});
        toast.present();
    }

    compareBlog(first: Blog, second: Blog): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackBlogById(index: number, item: Blog) {
        return item.id;
    }
}
