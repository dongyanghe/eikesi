import { browser, by, element } from 'protractor';
import { Page } from './app.po';

export class LoginPage extends Page {
    // todo: figure out why more than one element exists
    username = element.all(by.name('username')).get(1);
    password = element.all(by.name('password')).get(1);
    loginButton = element(by.id('login'));
    signInButton = element(by.id('signIn'));
    logoutButton = element(by.id('logout'));
    header = element.all(by.css('ion-title')).get(1);

    getHeader() {
        return this.header.getText();
    }

    setUserName(username) {
        this.username.sendKeys(username);
    }

    getUserName() {
        return this.username.getAttribute('value');
    }

    clearUserName() {
        this.username.clear();
    }

    setPassword(password) {
        this.password.sendKeys(password);
    }

    getPassword() {
        return this.password.getAttribute('value');
    }

    clearPassword() {
        this.password.clear();
    }

    login(username: string, password: string) {
        this.signInButton.click();
        this.setUserName(username);
        this.setPassword(password);
        browser.driver.sleep(500);
        this.loginButton.click();
    }

    logout() {
        return this.logoutButton.click();
    }
}
