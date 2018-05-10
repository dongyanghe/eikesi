webpackJsonp([2],{

/***/ 752:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BlogDialogPageModule", function() { return BlogDialogPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__blog_dialog__ = __webpack_require__(769);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__blog_provider__ = __webpack_require__(765);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var BlogDialogPageModule = /** @class */ (function () {
    function BlogDialogPageModule() {
    }
    BlogDialogPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["J" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__blog_dialog__["a" /* BlogDialogPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_3__blog_dialog__["a" /* BlogDialogPage */]),
                __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["c" /* TranslateModule */].forChild()
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_3__blog_dialog__["a" /* BlogDialogPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__blog_provider__["a" /* BlogService */]
            ]
        })
    ], BlogDialogPageModule);
    return BlogDialogPageModule;
}());

//# sourceMappingURL=blog-dialog.module.js.map

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

/***/ })

});
//# sourceMappingURL=2.js.map