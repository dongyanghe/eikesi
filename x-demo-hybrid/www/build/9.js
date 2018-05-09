webpackJsonp([9],{

/***/ 761:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SignupPageModule", function() { return SignupPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__signup__ = __webpack_require__(780);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var SignupPageModule = /** @class */ (function () {
    function SignupPageModule() {
    }
    SignupPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["J" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__signup__["a" /* SignupPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_3__signup__["a" /* SignupPage */]),
                __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["c" /* TranslateModule */].forChild()
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_3__signup__["a" /* SignupPage */]
            ]
        })
    ], SignupPageModule);
    return SignupPageModule;
}());

//# sourceMappingURL=signup.module.js.map

/***/ }),

/***/ 780:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_providers__ = __webpack_require__(171);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages__ = __webpack_require__(393);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var SignupPage = /** @class */ (function () {
    function SignupPage(navCtrl, user, toastCtrl, translateService) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.user = user;
        this.toastCtrl = toastCtrl;
        this.translateService = translateService;
        // The account fields for the signup form
        this.account = {
            login: '',
            email: '',
            firstName: '',
            lastName: '',
            password: '',
            langKey: 'en'
        };
        this.translateService.get(['SIGNUP_ERROR', 'SIGNUP_SUCCESS',
            'EXISTING_USER_ERROR', 'INVALID_PASSWORD_ERROR']).subscribe(function (values) {
            _this.signupErrorString = values.SIGNUP_ERROR;
            _this.signupSuccessString = values.SIGNUP_SUCCESS;
            _this.existingUserError = values.EXISTING_USER_ERROR;
            _this.invalidPasswordError = values.INVALID_PASSWORD_ERROR;
        });
    }
    SignupPage.prototype.doSignup = function () {
        var _this = this;
        // set login to same as email
        this.account.login = this.account.email;
        // Attempt to login in through our User service
        this.user.signup(this.account).subscribe(function () {
            var toast = _this.toastCtrl.create({
                message: _this.signupSuccessString,
                duration: 3000,
                position: 'top'
            });
            toast.present();
            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__pages__["b" /* MainPage */]);
        }, function (response) {
            // Unable to sign up
            var error = JSON.parse(response.error);
            var displayError = _this.signupErrorString;
            if (response.status === 400 && error.type.includes('already-used')) {
                displayError = _this.existingUserError;
            }
            else if (response.status === 400 && error.message === 'error.validation'
                && error.fieldErrors[0].field === 'password' && error.fieldErrors[0].message === 'Size') {
                displayError = _this.invalidPasswordError;
            }
            var toast = _this.toastCtrl.create({
                message: displayError,
                duration: 3000,
                position: 'middle'
            });
            toast.present();
        });
    };
    SignupPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-signup',template:/*ion-inline-start:"F:\XWorkpase\eikesi\x-demo-hybrid\src\pages\signup\signup.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>{{ \'SIGNUP_TITLE\' | translate }}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <form (submit)="doSignup()">\n    <ion-list>\n\n      <ion-item>\n        <ion-label floating>{{ \'FIRST_NAME\' | translate }}</ion-label>\n        <ion-input type="text" [(ngModel)]="account.firstName" name="firstName"></ion-input>\n      </ion-item>\n\n      <ion-item>\n        <ion-label floating>{{ \'LAST_NAME\' | translate }}</ion-label>\n        <ion-input type="text" [(ngModel)]="account.lastName" name="firstName"></ion-input>\n      </ion-item>\n\n      <ion-item>\n        <ion-label floating>{{ \'EMAIL\' | translate }}</ion-label>\n        <ion-input type="email" [(ngModel)]="account.email" name="email"></ion-input>\n      </ion-item>\n\n      <ion-item>\n        <ion-label floating>{{ \'PASSWORD\' | translate }}</ion-label>\n        <ion-input type="password" [(ngModel)]="account.password" name="password"></ion-input>\n      </ion-item>\n\n      <div padding>\n        <button ion-button color="primary" block>{{ \'SIGNUP_BUTTON\' | translate }}</button>\n      </div>\n\n    </ion-list>\n  </form>\n</ion-content>'/*ion-inline-end:"F:\XWorkpase\eikesi\x-demo-hybrid\src\pages\signup\signup.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_providers__["c" /* User */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["m" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["d" /* TranslateService */]])
    ], SignupPage);
    return SignupPage;
}());

//# sourceMappingURL=signup.js.map

/***/ })

});
//# sourceMappingURL=9.js.map