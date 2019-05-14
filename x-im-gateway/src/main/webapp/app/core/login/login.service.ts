import { Injectable } from '@angular/core';

import { JhiLanguageService } from 'ng-jhipster';
import { SessionStorageService } from 'ngx-webstorage';
import { IUser } from 'app/core/user/user.model';
import { AccountService } from 'app/core/auth/account.service';
import { AuthServerProvider } from 'app/core/auth/auth-jwt.service';

@Injectable({ providedIn: 'root' })
export class LoginService {
    constructor(
        private accountService: AccountService,
        private languageService: JhiLanguageService,
        private sessionStorage: SessionStorageService,
        private authServerProvider: AuthServerProvider
    ) {}

    login(credentials, callback?) {
        const cb = callback || function() {};

        return new Promise((resolve, reject) => {
            this.authServerProvider.login(credentials).subscribe(
                data => {
                    this.accountService.identity(true).then(account => {
                        this.setPreferredLanguage(account);
                        resolve(data);
                    });
                    return cb();
                },
                err => {
                    this.logout();
                    reject(err);
                    return cb(err);
                }
            );
        });
    }

    setPreferredLanguage(account: IUser) {
        const langKey = account.langKey || this.sessionStorage.retrieve('locale');
        this.languageService.changeLanguage(langKey);
    }

    logout() {
        if (this.accountService.isAuthenticated()) {
            this.authServerProvider.logout().subscribe(() => this.accountService.authenticate(null));
        } else {
            this.accountService.authenticate(null);
        }
    }
}
