webpackJsonp([3],{

/***/ 751:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BlogDetailPageModule", function() { return BlogDetailPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__blog_detail__ = __webpack_require__(768);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__blog_provider__ = __webpack_require__(765);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var BlogDetailPageModule = /** @class */ (function () {
    function BlogDetailPageModule() {
    }
    BlogDetailPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["J" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__blog_detail__["a" /* BlogDetailPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_3__blog_detail__["a" /* BlogDetailPage */]),
                __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["c" /* TranslateModule */].forChild()
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_3__blog_detail__["a" /* BlogDetailPage */]
            ],
            providers: [__WEBPACK_IMPORTED_MODULE_4__blog_provider__["a" /* BlogService */]]
        })
    ], BlogDetailPageModule);
    return BlogDetailPageModule;
}());

//# sourceMappingURL=blog-detail.module.js.map

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

/***/ })

});
//# sourceMappingURL=3.js.map