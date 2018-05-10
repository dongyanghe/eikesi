webpackJsonp([1],{

/***/ 754:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EntryDetailPageModule", function() { return EntryDetailPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__entry_detail__ = __webpack_require__(773);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__entry_provider__ = __webpack_require__(766);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var EntryDetailPageModule = /** @class */ (function () {
    function EntryDetailPageModule() {
    }
    EntryDetailPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["J" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__entry_detail__["a" /* EntryDetailPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_3__entry_detail__["a" /* EntryDetailPage */]),
                __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["c" /* TranslateModule */].forChild()
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_3__entry_detail__["a" /* EntryDetailPage */]
            ],
            providers: [__WEBPACK_IMPORTED_MODULE_4__entry_provider__["a" /* EntryService */]]
        })
    ], EntryDetailPageModule);
    return EntryDetailPageModule;
}());

//# sourceMappingURL=entry-detail.module.js.map

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

/***/ 771:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Entry; });
var Entry = /** @class */ (function () {
    function Entry(id, title, content, date, blog) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.date = date;
        this.blog = blog;
    }
    return Entry;
}());

//# sourceMappingURL=entry.model.js.map

/***/ }),

/***/ 773:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EntryDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__entry_model__ = __webpack_require__(771);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__entry_provider__ = __webpack_require__(766);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var EntryDetailPage = /** @class */ (function () {
    function EntryDetailPage(modalCtrl, params, entryService, toastCtrl) {
        this.modalCtrl = modalCtrl;
        this.entryService = entryService;
        this.toastCtrl = toastCtrl;
        this.entry = new __WEBPACK_IMPORTED_MODULE_2__entry_model__["a" /* Entry */]();
        this.entry.id = params.get('id');
    }
    EntryDetailPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.entryService.find(this.entry.id).subscribe(function (data) { return _this.entry = data; });
    };
    EntryDetailPage.prototype.open = function (item) {
        var _this = this;
        var modal = this.modalCtrl.create('EntryDialogPage', { item: item });
        modal.onDidDismiss(function (entry) {
            if (entry) {
                _this.entryService.update(entry).subscribe(function (data) {
                    _this.entry = data;
                    var toast = _this.toastCtrl.create({ message: 'Entry updated successfully.', duration: 3000, position: 'middle' });
                    toast.present();
                }, function (error) { return console.error(error); });
            }
        });
        modal.present();
    };
    EntryDetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-entry-detail',template:/*ion-inline-start:"F:\XWorkpase\eikesi\x-demo-hybrid\src\pages\entities\entry\entry-detail.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>Entry</ion-title>\n    </ion-navbar>\n</ion-header>\n<ion-content padding>\n    <ion-list>\n        <ion-item>\n            <ion-label fixed>Title</ion-label>\n            <div item-content>\n                <span>{{entry.title}}</span>\n            </div>\n        </ion-item>\n        <ion-item>\n            <ion-label fixed>Content</ion-label>\n            <div item-content>\n                <span>{{entry.content}}</span>\n            </div>\n        </ion-item>\n        <ion-item>\n            <ion-label fixed>Date</ion-label>\n            <div item-content>\n                <span>{{entry.date | date:\'medium\'}}</span>\n            </div>\n        </ion-item>\n        <ion-item>\n            <ion-label>Blog</ion-label>\n            <div item-content *ngIf="entry.blog">\n                <a>{{entry.blog?.id}}</a>\n            </div>\n        </ion-item>\n    </ion-list>\n\n    <button ion-button block (click)="open(entry)">{{ \'EDIT_BUTTON\' | translate }}</button>\n</ion-content>\n'/*ion-inline-end:"F:\XWorkpase\eikesi\x-demo-hybrid\src\pages\entities\entry\entry-detail.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__entry_provider__["a" /* EntryService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ToastController */]])
    ], EntryDetailPage);
    return EntryDetailPage;
}());

//# sourceMappingURL=entry-detail.js.map

/***/ })

});
//# sourceMappingURL=1.js.map