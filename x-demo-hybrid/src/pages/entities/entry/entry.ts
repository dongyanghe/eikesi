import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, ToastController } from 'ionic-angular';
import { Entry } from './entry.model';
import { EntryService } from './entry.provider';

@IonicPage({
    defaultHistory: ['EntityPage']
})
@Component({
    selector: 'page-entry',
    templateUrl: 'entry.html'
})
export class EntryPage {
    entries: Entry[];

    // todo: add pagination

    constructor(private navCtrl: NavController, private entryService: EntryService,
                private modalCtrl: ModalController, private toastCtrl: ToastController) {
        this.entries = [];
    }

    ionViewDidLoad() {
        this.loadAll();
    }

    loadAll(refresher?) {
        this.entryService.query().subscribe(
            (response) => {
                this.entries = response;
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

    trackId(index: number, item: Entry) {
        return item.id;
    }

    open(slidingItem: any, item: Entry) {
        let modal = this.modalCtrl.create('EntryDialogPage', {item: item});
        modal.onDidDismiss(entry => {
            if (entry) {
                if (entry.id) {
                    this.entryService.update(entry).subscribe(data => {
                        this.loadAll();
                        let toast = this.toastCtrl.create(
                            {message: 'Entry updated successfully.', duration: 3000, position: 'middle'});
                        toast.present();
                        slidingItem.close();
                    }, (error) => console.error(error));
                } else {
                    this.entryService.create(entry).subscribe(data => {
                        this.entries.push(data);
                        let toast = this.toastCtrl.create(
                            {message: 'Entry added successfully.', duration: 3000, position: 'middle'});
                        toast.present();
                    }, (error) => console.error(error));
                }
            }
        });
        modal.present();
    }

    delete(entry) {
        this.entryService.delete(entry.id).subscribe(() => {
            let toast = this.toastCtrl.create(
                {message: 'Entry deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    detail(entry: Entry) {
        this.navCtrl.push('EntryDetailPage', {id: entry.id});
    }
}
