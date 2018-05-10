webpackJsonp([0],{

/***/ 756:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EntryDialogPageModule", function() { return EntryDialogPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__blog__ = __webpack_require__(772);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__entry_dialog__ = __webpack_require__(775);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__entry_provider__ = __webpack_require__(766);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var EntryDialogPageModule = /** @class */ (function () {
    function EntryDialogPageModule() {
    }
    EntryDialogPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["J" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_4__entry_dialog__["a" /* EntryDialogPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_4__entry_dialog__["a" /* EntryDialogPage */]),
                __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["c" /* TranslateModule */].forChild()
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_4__entry_dialog__["a" /* EntryDialogPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_5__entry_provider__["a" /* EntryService */],
                __WEBPACK_IMPORTED_MODULE_0__blog__["a" /* BlogService */],
            ]
        })
    ], EntryDialogPageModule);
    return EntryDialogPageModule;
}());

//# sourceMappingURL=entry-dialog.module.js.map

/***/ }),

/***/ 765:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BlogService; });
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



var BlogService = /** @class */ (function () {
    function BlogService(http) {
        this.http = http;
        this.resourceUrl = __WEBPACK_IMPORTED_MODULE_2__providers_api_api__["a" /* Api */].API_URL + '/blogs';
    }
    BlogService.prototype.create = function (blog) {
        return this.http.post(this.resourceUrl, blog);
    };
    BlogService.prototype.update = function (blog) {
        return this.http.put(this.resourceUrl, blog);
    };
    BlogService.prototype.find = function (id) {
        return this.http.get(this.resourceUrl + "/" + id);
    };
    BlogService.prototype.query = function (req) {
        return this.http.get(this.resourceUrl);
    };
    BlogService.prototype.delete = function (id) {
        return this.http.delete(this.resourceUrl + "/" + id, { observe: 'response', responseType: 'text' });
    };
    BlogService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["b" /* HttpClient */]])
    ], BlogService);
    return BlogService;
}());

//# sourceMappingURL=blog.provider.js.map

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

/***/ 767:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Blog; });
var Blog = /** @class */ (function () {
    function Blog(id, name, handle) {
        this.id = id;
        this.name = name;
        this.handle = handle;
    }
    return Blog;
}());

//# sourceMappingURL=blog.model.js.map

/***/ }),

/***/ 768:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BlogDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__blog_model__ = __webpack_require__(767);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__blog_provider__ = __webpack_require__(765);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var BlogDetailPage = /** @class */ (function () {
    function BlogDetailPage(modalCtrl, params, blogService, toastCtrl) {
        this.modalCtrl = modalCtrl;
        this.blogService = blogService;
        this.toastCtrl = toastCtrl;
        this.blog = new __WEBPACK_IMPORTED_MODULE_2__blog_model__["a" /* Blog */]();
        this.blog.id = params.get('id');
    }
    BlogDetailPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.blogService.find(this.blog.id).subscribe(function (data) { return _this.blog = data; });
    };
    BlogDetailPage.prototype.open = function (item) {
        var _this = this;
        var modal = this.modalCtrl.create('BlogDialogPage', { item: item });
        modal.onDidDismiss(function (blog) {
            if (blog) {
                _this.blogService.update(blog).subscribe(function (data) {
                    _this.blog = data;
                    var toast = _this.toastCtrl.create({ message: 'Blog updated successfully.', duration: 3000, position: 'middle' });
                    toast.present();
                }, function (error) { return console.error(error); });
            }
        });
        modal.present();
    };
    BlogDetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-blog-detail',template:/*ion-inline-start:"F:\XWorkpase\eikesi\x-demo-hybrid\src\pages\entities\blog\blog-detail.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>Blog</ion-title>\n    </ion-navbar>\n</ion-header>\n<ion-content padding>\n    <ion-list>\n        <ion-item>\n            <ion-label fixed>Name</ion-label>\n            <div item-content>\n                <span>{{blog.name}}</span>\n            </div>\n        </ion-item>\n        <ion-item>\n            <ion-label fixed>Handle</ion-label>\n            <div item-content>\n                <span>{{blog.handle}}</span>\n            </div>\n        </ion-item>\n    </ion-list>\n\n    <button ion-button block (click)="open(blog)">{{ \'EDIT_BUTTON\' | translate }}</button>\n</ion-content>\n'/*ion-inline-end:"F:\XWorkpase\eikesi\x-demo-hybrid\src\pages\entities\blog\blog-detail.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__blog_provider__["a" /* BlogService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ToastController */]])
    ], BlogDetailPage);
    return BlogDetailPage;
}());

//# sourceMappingURL=blog-detail.js.map

/***/ }),

/***/ 769:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BlogDialogPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__blog_model__ = __webpack_require__(767);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__blog_provider__ = __webpack_require__(765);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var BlogDialogPage = /** @class */ (function () {
    function BlogDialogPage(navCtrl, viewCtrl, toastCtrl, formBuilder, params, blogService) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
        this.toastCtrl = toastCtrl;
        this.blogService = blogService;
        this.blog = params.get('item');
        if (this.blog && this.blog.id) {
            this.blogService.find(this.blog.id).subscribe(function (data) {
                _this.blog = data;
            });
        }
        else {
            this.blog = new __WEBPACK_IMPORTED_MODULE_3__blog_model__["a" /* Blog */]();
        }
        this.form = formBuilder.group({
            id: [params.get('item') ? this.blog.id : null],
            name: [params.get('item') ? this.blog.name : '', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["g" /* Validators */].required],
            handle: [params.get('item') ? this.blog.handle : '', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["g" /* Validators */].required],
        });
        // Watch the form for changes, and
        this.form.valueChanges.subscribe(function (v) {
            _this.isReadyToSave = _this.form.valid;
        });
    }
    BlogDialogPage.prototype.ionViewDidLoad = function () {
    };
    /**
     * The user cancelled, dismiss without sending data back.
     */
    BlogDialogPage.prototype.cancel = function () {
        this.viewCtrl.dismiss();
    };
    /**
     * The user is done and wants to create the blog, so return it
     * back to the presenter.
     */
    BlogDialogPage.prototype.done = function () {
        if (!this.form.valid) {
            return;
        }
        this.viewCtrl.dismiss(this.form.value);
    };
    BlogDialogPage.prototype.onError = function (error) {
        console.error(error);
        var toast = this.toastCtrl.create({ message: 'Failed to load data', duration: 2000, position: 'middle' });
        toast.present();
    };
    BlogDialogPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-blog-dialog',template:/*ion-inline-start:"F:\XWorkpase\eikesi\x-demo-hybrid\src\pages\entities\blog\blog-dialog.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>Blog</ion-title>\n        <ion-buttons start>\n            <button ion-button (click)="cancel()">\n                <span color="primary" showWhen="ios">\n                  {{ \'CANCEL_BUTTON\' | translate }}\n                </span>\n                <ion-icon name="md-close" showWhen="core,android,windows"></ion-icon>\n            </button>\n        </ion-buttons>\n        <ion-buttons end>\n            <button ion-button (click)="done()" [disabled]="!isReadyToSave" strong>\n                <span color="primary" showWhen="ios">\n                    {{ \'DONE_BUTTON\' | translate }}\n                </span>\n                <ion-icon name="md-checkmark" showWhen="core,android,windows"></ion-icon>\n            </button>\n        </ion-buttons>\n    </ion-navbar>\n</ion-header>\n<ion-content padding>\n    <form *ngIf="form" [formGroup]="form" (ngSubmit)="save()">\n        <ion-list>\n            <ion-item [hidden]="!form.id">\n                <ion-label>ID</ion-label>\n                <ion-input type="hidden" id="id" formControlName="id" readonly></ion-input>\n            </ion-item>\n            <ion-item>\n                <ion-input type="text" placeholder="Name" formControlName="name"></ion-input>\n            </ion-item>\n            <ion-item>\n                <ion-input type="text" placeholder="Handle" formControlName="handle"></ion-input>\n            </ion-item>\n        </ion-list>\n    </form>\n</ion-content>\n'/*ion-inline-end:"F:\XWorkpase\eikesi\x-demo-hybrid\src\pages\entities\blog\blog-dialog.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["n" /* ViewController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["m" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_4__blog_provider__["a" /* BlogService */]])
    ], BlogDialogPage);
    return BlogDialogPage;
}());

//# sourceMappingURL=blog-dialog.js.map

/***/ }),

/***/ 770:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BlogPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__blog_provider__ = __webpack_require__(765);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var BlogPage = /** @class */ (function () {
    // todo: add pagination
    function BlogPage(navCtrl, blogService, modalCtrl, toastCtrl) {
        this.navCtrl = navCtrl;
        this.blogService = blogService;
        this.modalCtrl = modalCtrl;
        this.toastCtrl = toastCtrl;
        this.blogs = [];
    }
    BlogPage.prototype.ionViewDidLoad = function () {
        this.loadAll();
    };
    BlogPage.prototype.loadAll = function (refresher) {
        var _this = this;
        this.blogService.query().subscribe(function (response) {
            _this.blogs = response;
            if (typeof (refresher) !== 'undefined') {
                refresher.complete();
            }
        }, function (error) {
            console.error(error);
            var toast = _this.toastCtrl.create({ message: 'Failed to load data', duration: 2000, position: 'middle' });
            toast.present();
        });
    };
    BlogPage.prototype.trackId = function (index, item) {
        return item.id;
    };
    BlogPage.prototype.open = function (slidingItem, item) {
        var _this = this;
        var modal = this.modalCtrl.create('BlogDialogPage', { item: item });
        modal.onDidDismiss(function (blog) {
            if (blog) {
                if (blog.id) {
                    _this.blogService.update(blog).subscribe(function (data) {
                        _this.loadAll();
                        var toast = _this.toastCtrl.create({ message: 'Blog updated successfully.', duration: 3000, position: 'middle' });
                        toast.present();
                        slidingItem.close();
                    }, function (error) { return console.error(error); });
                }
                else {
                    _this.blogService.create(blog).subscribe(function (data) {
                        _this.blogs.push(data);
                        var toast = _this.toastCtrl.create({ message: 'Blog added successfully.', duration: 3000, position: 'middle' });
                        toast.present();
                    }, function (error) { return console.error(error); });
                }
            }
        });
        modal.present();
    };
    BlogPage.prototype.delete = function (blog) {
        var _this = this;
        this.blogService.delete(blog.id).subscribe(function () {
            var toast = _this.toastCtrl.create({ message: 'Blog deleted successfully.', duration: 3000, position: 'middle' });
            toast.present();
            _this.loadAll();
        }, function (error) { return console.error(error); });
    };
    BlogPage.prototype.detail = function (blog) {
        this.navCtrl.push('BlogDetailPage', { id: blog.id });
    };
    BlogPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-blog',template:/*ion-inline-start:"F:\XWorkpase\eikesi\x-demo-hybrid\src\pages\entities\blog\blog.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>Blogs</ion-title>\n        <ion-buttons end>\n            <button ion-button icon-only (click)="open()">\n                <ion-icon name="add"></ion-icon>\n            </button>\n        </ion-buttons>\n    </ion-navbar>\n</ion-header>\n<!-- todo: add elasticsearch support -->\n<ion-content padding>\n    <ion-refresher (ionRefresh)="loadAll($event)">\n        <ion-refresher-content></ion-refresher-content>\n    </ion-refresher>\n\n    <ion-list>\n        <ion-item-sliding *ngFor="let blog of blogs; trackBy: trackId" #slidingItem>\n            <button ion-item (click)="detail(blog)">\n                <h2>{{blog.name}}</h2>\n                <p>{{blog.handle}}</p>\n            </button>\n            <ion-item-options>\n                <button ion-button color="primary" (click)="open(slidingItem, blog)">\n                    {{ \'EDIT_BUTTON\' | translate }}\n                </button>\n                <button ion-button color="danger" (click)="delete(blog)">\n                    {{ \'DELETE_BUTTON\' | translate }}\n                </button>\n            </ion-item-options>\n        </ion-item-sliding>\n    </ion-list>\n    <ion-item *ngIf="!blogs?.length">\n        No Blogs found.\n    </ion-item>\n</ion-content>\n'/*ion-inline-end:"F:\XWorkpase\eikesi\x-demo-hybrid\src\pages\entities\blog\blog.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__blog_provider__["a" /* BlogService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ToastController */]])
    ], BlogPage);
    return BlogPage;
}());

//# sourceMappingURL=blog.js.map

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

/***/ 772:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__blog_model__ = __webpack_require__(767);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__blog_provider__ = __webpack_require__(765);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__blog_provider__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__blog_dialog__ = __webpack_require__(769);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__blog_detail__ = __webpack_require__(768);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__blog__ = __webpack_require__(770);
/* unused harmony namespace reexport */





//# sourceMappingURL=index.js.map

/***/ }),

/***/ 775:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EntryDialogPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__entry_model__ = __webpack_require__(771);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__entry_provider__ = __webpack_require__(766);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__blog__ = __webpack_require__(772);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var EntryDialogPage = /** @class */ (function () {
    function EntryDialogPage(navCtrl, viewCtrl, toastCtrl, formBuilder, params, blogService, entryService) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
        this.toastCtrl = toastCtrl;
        this.blogService = blogService;
        this.entryService = entryService;
        this.entry = params.get('item');
        if (this.entry && this.entry.id) {
            this.entryService.find(this.entry.id).subscribe(function (data) {
                _this.entry = data;
            });
        }
        else {
            this.entry = new __WEBPACK_IMPORTED_MODULE_3__entry_model__["a" /* Entry */]();
        }
        this.form = formBuilder.group({
            id: [params.get('item') ? this.entry.id : null],
            title: [params.get('item') ? this.entry.title : '', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["g" /* Validators */].required],
            content: [params.get('item') ? this.entry.content : '', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["g" /* Validators */].required],
            date: [params.get('item') ? this.entry.date : '',],
            blog: [params.get('item') ? this.entry.blog : '',],
        });
        // Watch the form for changes, and
        this.form.valueChanges.subscribe(function (v) {
            _this.isReadyToSave = _this.form.valid;
        });
    }
    EntryDialogPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.blogService.query()
            .subscribe(function (data) { _this.blogs = data; }, function (error) { return _this.onError(error); });
    };
    /**
     * The user cancelled, dismiss without sending data back.
     */
    EntryDialogPage.prototype.cancel = function () {
        this.viewCtrl.dismiss();
    };
    /**
     * The user is done and wants to create the entry, so return it
     * back to the presenter.
     */
    EntryDialogPage.prototype.done = function () {
        if (!this.form.valid) {
            return;
        }
        this.viewCtrl.dismiss(this.form.value);
    };
    EntryDialogPage.prototype.onError = function (error) {
        console.error(error);
        var toast = this.toastCtrl.create({ message: 'Failed to load data', duration: 2000, position: 'middle' });
        toast.present();
    };
    EntryDialogPage.prototype.compareBlog = function (first, second) {
        return first && second ? first.id === second.id : first === second;
    };
    EntryDialogPage.prototype.trackBlogById = function (index, item) {
        return item.id;
    };
    EntryDialogPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-entry-dialog',template:/*ion-inline-start:"F:\XWorkpase\eikesi\x-demo-hybrid\src\pages\entities\entry\entry-dialog.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>Entry</ion-title>\n        <ion-buttons start>\n            <button ion-button (click)="cancel()">\n                <span color="primary" showWhen="ios">\n                  {{ \'CANCEL_BUTTON\' | translate }}\n                </span>\n                <ion-icon name="md-close" showWhen="core,android,windows"></ion-icon>\n            </button>\n        </ion-buttons>\n        <ion-buttons end>\n            <button ion-button (click)="done()" [disabled]="!isReadyToSave" strong>\n                <span color="primary" showWhen="ios">\n                    {{ \'DONE_BUTTON\' | translate }}\n                </span>\n                <ion-icon name="md-checkmark" showWhen="core,android,windows"></ion-icon>\n            </button>\n        </ion-buttons>\n    </ion-navbar>\n</ion-header>\n<ion-content padding>\n    <form *ngIf="form" [formGroup]="form" (ngSubmit)="save()">\n        <ion-list>\n            <ion-item [hidden]="!form.id">\n                <ion-label>ID</ion-label>\n                <ion-input type="hidden" id="id" formControlName="id" readonly></ion-input>\n            </ion-item>\n            <ion-item>\n                <ion-input type="text" placeholder="Title" formControlName="title"></ion-input>\n            </ion-item>\n            <ion-item>\n                <ion-input type="text" placeholder="Content" formControlName="content"></ion-input>\n            </ion-item>\n            <ion-item>\n                <ion-label>Date</ion-label>\n                <ion-datetime displayFormat="MM/DD/YYYY" formControlName="date" id="field_date"></ion-datetime>\n            </ion-item>\n            <ion-item>\n                <ion-label>Blog</ion-label>\n                <ion-select id="field_blog" formControlName="blog" [compareWith]="compareBlog">\n                    <ion-option [value]="null"></ion-option>\n                    <ion-option [value]="blogOption" *ngFor="let blogOption of blogs; trackBy: trackBlogById">{{blogOption.id}}</ion-option>\n                </ion-select>\n            </ion-item>\n        </ion-list>\n    </form>\n</ion-content>\n'/*ion-inline-end:"F:\XWorkpase\eikesi\x-demo-hybrid\src\pages\entities\entry\entry-dialog.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["n" /* ViewController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["m" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_5__blog__["a" /* BlogService */],
            __WEBPACK_IMPORTED_MODULE_4__entry_provider__["a" /* EntryService */]])
    ], EntryDialogPage);
    return EntryDialogPage;
}());

//# sourceMappingURL=entry-dialog.js.map

/***/ })

});
//# sourceMappingURL=0.js.map