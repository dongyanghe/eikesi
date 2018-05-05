import { Component } from '@angular/core';
import { IonicPage, ModalController, NavParams, ToastController } from 'ionic-angular';
import { Entry } from './entry.model';
import { EntryService } from './entry.provider';

@IonicPage({
    segment: 'entry-detail/:id',
    defaultHistory: ['EntityPage', 'entryPage']
})
@Component({
    selector: 'page-entry-detail',
    templateUrl: 'entry-detail.html'
})
export class EntryDetailPage {
    entry: Entry;

    constructor(private modalCtrl: ModalController, params: NavParams,
                private entryService: EntryService, private toastCtrl: ToastController) {
        this.entry = new Entry();
        this.entry.id = params.get('id');
    }

    ionViewDidLoad() {
        this.entryService.find(this.entry.id).subscribe(data => this.entry = data);
    }

    open(item: Entry) {
        let modal = this.modalCtrl.create('EntryDialogPage', {item: item});
        modal.onDidDismiss(entry => {
            if (entry) {
                this.entryService.update(entry).subscribe(data => {
                    this.entry = data;
                    let toast = this.toastCtrl.create(
                        {message: 'Entry updated successfully.', duration: 3000, position: 'middle'});
                    toast.present();
                }, (error) => console.error(error));
            }
        });
        modal.present();
    }

}
