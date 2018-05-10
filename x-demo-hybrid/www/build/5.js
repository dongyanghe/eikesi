webpackJsonp([5],{

/***/ 753:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BlogPageModule", function() { return BlogPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__blog__ = __webpack_require__(770);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__blog_provider__ = __webpack_require__(765);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var BlogPageModule = /** @class */ (function () {
    function BlogPageModule() {
    }
    BlogPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["J" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__blog__["a" /* BlogPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_3__blog__["a" /* BlogPage */]),
                __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["c" /* TranslateModule */].forChild()
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_3__blog__["a" /* BlogPage */]
            ],
            providers: [__WEBPACK_IMPORTED_MODULE_4__blog_provider__["a" /* BlogService */]]
        })
    ], BlogPageModule);
    return BlogPageModule;
}());

//# sourceMappingURL=blog.module.js.map

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

/***/ })

});
//# sourceMappingURL=5.js.map