import { browser, by, element, ExpectedConditions as ec, protractor } from 'protractor';
import { LoginPage } from '../pages/login.po';

describe('Login', () => {

    let loginPage;

    beforeAll(() => {
        loginPage = new LoginPage();
        loginPage.navigateTo('/');
        browser.waitForAngular();
    });

    it('should show a login button', () => {
        expect(loginPage.getHeader()).toMatch(/Welcome, Java Hipster/);
        expect(loginPage.loginButton.isPresent());
    });

    it('should fail to login with bad password', () => {
        loginPage.login('admin', 'foo');
        const error = element(by.css('.toast-message'));
        browser.wait(ec.visibilityOf(error)).then(() => {
            error.getText().then((value) => {
                expect(value).toMatch(/Unable to sign in/);
            });
        });
    });

    it('should login successfully with admin account', () => {
        loginPage.clearUserName();
        loginPage.setUserName('admin'); // use process.env.E2E_USERNAME if you want to use env variables
        loginPage.clearPassword();
        loginPage.setPassword('admin');
        loginPage.loginButton.click();

        browser.waitForAngular();

        const welcome = /Welcome, Administrator/;
        browser.wait(ec.visibilityOf(loginPage.logoutButton), 5000).then(() => {
            expect(element.all(by.css('ion-title')).get(3).getText()).toMatch(welcome);
        });
    });

    it('should logout successfully', () => {
        loginPage.logout();
        browser.wait(ec.urlContains('/#/welcome'), 2000);
        expect(loginPage.signInButton.isPresent());
    })
});
