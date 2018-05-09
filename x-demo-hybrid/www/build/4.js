webpackJsonp([4],{

/***/ 755:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EntryPageModule", function() { return EntryPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__entry__ = __webpack_require__(774);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__entry_provider__ = __webpack_require__(766);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var EntryPageModule = /** @class */ (function () {
    function EntryPageModule() {
    }
    EntryPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["J" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__entry__["a" /* EntryPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_3__entry__["a" /* EntryPage */]),
                __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["c" /* TranslateModule */].forChild()
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_3__entry__["a" /* EntryPage */]
            ],
            providers: [__WEBPACK_IMPORTED_MODULE_4__entry_provider__["a" /* EntryService */]]
        })
    ], EntryPageModule);
    return EntryPageModule;
}());

//# sourceMappingURL=entry.module.js.map

/***/ }),

/***/ 766:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EntryService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_api_api__ = __webpack_require__(68);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var EntryService = /** @class */ (function () {
    function EntryService(http) {
        this.http = http;
        this.resourceUrl = __WEBPACK_IMPORTED_MODULE_2__providers_api_api__["a" /* Api */].API_URL + '/entries';
    }
    EntryService.prototype.create = function (entry) {
        return this.http.post(this.resourceUrl, entry);
    };
    EntryService.prototype.update = function (entry) {
        return this.http.put(this.resourceUrl, entry);
    };
    EntryService.prototype.find = function (id) {
        return this.http.get(this.resourceUrl + "/" + id);
    };
    EntryService.prototype.query = function (req) {
        return this.http.get(this.resourceUrl);
    };
    EntryService.prototype.delete = function (id) {
        return this.http.delete(this.resourceUrl + "/" + id, { observe: 'response', responseType: 'text' });
    };
    EntryService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["b" /* HttpClient */]])
    ], EntryService);
    return EntryService;
}());

//# sourceMappingURL=entry.provider.js.map

/***/ }),

/***/ 774:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EntryPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__entry_provider__ = __webpack_require__(766);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var EntryPage = /** @class */ (function () {
    // todo: add pagination
    function EntryPage(navCtrl, entryService, modalCtrl, toastCtrl) {
        this.navCtrl = navCtrl;
        this.entryService = entryService;
        this.modalCtrl = modalCtrl;
        this.toastCtrl = toastCtrl;
        this.entries = [];
    }
    EntryPage.prototype.ionViewDidLoad = function () {
        this.loadAll();
    };
    EntryPage.prototype.loadAll = function (refresher) {
        var _this = this;
        this.entryService.query().subscribe(function (response) {
            _this.entries = response;
            if (typeof (refresher) !== 'undefined') {
                refresher.complete();
            }
        }, function (error) {
            console.error(error);
            var toast = _this.toastCtrl.create({ message: 'Failed to load data', duration: 2000, position: 'middle' });
            toast.present();
        });
    };
    EntryPage.prototype.trackId = function (index, item) {
        return item.id;
    };
    EntryPage.prototype.open = function (slidingItem, item) {
        var _this = this;
        var modal = this.modalCtrl.create('EntryDialogPage', { item: item });
        modal.onDidDismiss(function (entry) {
            if (entry) {
                if (entry.id) {
                    _this.entryService.update(entry).subscribe(function (data) {
                        _this.loadAll();
                        var toast = _this.toastCtrl.create({ message: 'Entry updated successfully.', duration: 3000, position: 'middle' });
                        toast.present();
                        slidingItem.close();
                    }, function (error) { return console.error(error); });
                }
                else {
                    _this.entryService.create(entry).subscribe(function (data) {
                        _this.entries.push(data);
                        var toast = _this.toastCtrl.create({ message: 'Entry added successfully.', duration: 3000, position: 'middle' });
                        toast.present();
                    }, function (error) { return console.error(error); });
                }
            }
        });
        modal.present();
    };
    EntryPage.prototype.delete = function (entry) {
        var _this = this;
        this.entryService.delete(entry.id).subscribe(function () {
            var toast = _this.toastCtrl.create({ message: 'Entry deleted successfully.', duration: 3000, position: 'middle' });
            toast.present();
            _this.loadAll();
        }, function (error) { return console.error(error); });
    };
    EntryPage.prototype.detail = function (entry) {
        this.navCtrl.push('EntryDetailPage', { id: entry.id });
    };
    EntryPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-entry',template:/*ion-inline-start:"F:\XWorkpase\eikesi\x-demo-hybrid\src\pages\entities\entry\entry.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>Entries</ion-title>\n        <ion-buttons end>\n            <button ion-button icon-only (click)="open()">\n                <ion-icon name="add"></ion-icon>\n            </button>\n        </ion-buttons>\n    </ion-navbar>\n</ion-header>\n<!-- todo: add elasticsearch support -->\n<ion-content padding>\n    <ion-refresher (ionRefresh)="loadAll($event)">\n        <ion-refresher-content></ion-refresher-content>\n    </ion-refresher>\n\n    <ion-list>\n        <ion-item-sliding *ngFor="let entry of entries; trackBy: trackId" #slidingItem>\n            <button ion-item (click)="detail(entry)">\n                <h2>{{entry.title}}</h2>\n                <p>{{entry.content}}</p>\n                <p>{{entry.date | date:\'medium\'}}</p>\n            </button>\n            <ion-item-options>\n                <button ion-button color="primary" (click)="open(slidingItem, entry)">\n                    {{ \'EDIT_BUTTON\' | translate }}\n                </button>\n                <button ion-button color="danger" (click)="delete(entry)">\n                    {{ \'DELETE_BUTTON\' | translate }}\n                </button>\n            </ion-item-options>\n        </ion-item-sliding>\n    </ion-list>\n    <ion-item *ngIf="!entries?.length">\n        No Entries found.\n    </ion-item>\n</ion-content>\n'/*ion-inline-end:"F:\XWorkpase\eikesi\x-demo-hybrid\src\pages\entities\entry\entry.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__entry_provider__["a" /* EntryService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ToastController */]])
    ], EntryPage);
    return EntryPage;
}());

//# sourceMappingURL=entry.js.map

/***/ })

});
//# sourceMappingURL=4.js.map