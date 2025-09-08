import { BasePage } from "./basePage"

export class LoginPage extends BasePage {
    constructor(path) {
        super(path)
    }

    get emailField() {
        return $('input[data-test="email"]')
    }

    get passwordField() {
        return $('input[data-test="password"]')
    }

    get loginBtn() {
        return $('input[data-test="login-submit"]')
    }

    get loginErrorBox() {
        return $('div[data-test="login-error"]')
    }

    get emailErrorBox() {
        return $('div[data-test="email-error"]')
    }

    get passwordErrorBox() {
        return $('div[data-test="password-error"]')
    }

    get eyeIcon() {
        return $('div.input-group button')
    }

    get emailFieldType() {
        return this.passwordField.getAttribute('type')
    }

    getErrorText(element) {
        return element.getText()
    }

    async typeInEmail(email) {
        await this.emailField.setValue(email)
    }

    async typeInPassword(password) {
        await this.passwordField.setValue(password)
    }

    get forgotPaswordLink() {
        return $('a[data-test="forgot-password-link"]')
    }
}