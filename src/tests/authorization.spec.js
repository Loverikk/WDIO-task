import { ForgotPasswordPage } from "../po/pages/forgotPasswordPage"
import { LoginPage } from "../po/pages/loginPage"
import { AccountPage } from "../po/pages/accountPage"
import { PAGE_PATHS, DUMMY_CREDENTIALS, ERROR_MESSAGES, TYPES, TITLES } from "./test-data/data"

describe('Login page', () => {
    let loginPage;
    let forgotPasswordPage;
    let accountPage;

    beforeEach(async () => {
        loginPage = new LoginPage(PAGE_PATHS.LOGIN)
        forgotPasswordPage = new ForgotPasswordPage(PAGE_PATHS.FORGOT_PASSWORD)
        accountPage = new AccountPage(PAGE_PATHS.MY_ACCOUNT)
        loginPage.open()
    })

    it('Should show the error when login with empty fields', async () => {
        await loginPage.login()
        await loginPage.waitForElementsToAppear(loginPage.emailErrorBox, loginPage.passwordErrorBox)
        const emailErrorText = await loginPage.getErrorText(loginPage.emailErrorBox)
        const passwordErrorText = await loginPage.getErrorText(loginPage.passwordErrorBox)
        expect(emailErrorText).to.equal(ERROR_MESSAGES.EMAIL_REQUIRED)
        expect(passwordErrorText).to.equal(ERROR_MESSAGES.PASSWORD_REQUIRED)
    })

    it('Should show the error when login with the invalid email', async () => {
        await loginPage.typeInEmail(DUMMY_CREDENTIALS.EMAIL)
        await loginPage.typeInPassword(process.env.CORRECT_PASSWORD)
        await loginPage.login()
        await loginPage.waitForElementsToAppear(loginPage.loginErrorBox)
        const loginErrorText = await loginPage.getErrorText(loginPage.loginErrorBox)
        loginErrorText.should.equal(ERROR_MESSAGES.INVALID_EMAIL_OR_PASSWORD)
    })

    it('Should show the error when login with the invalid password', async () => {
        await loginPage.typeInEmail(process.env.CORRECT_EMAIL)
        await loginPage.typeInPassword(DUMMY_CREDENTIALS.PASSWORD)
        await loginPage.login()
        await loginPage.waitForElementsToAppear(loginPage.loginErrorBox)
        const errorText = await loginPage.getErrorText(loginPage.loginErrorBox)
        errorText.should.equal(ERROR_MESSAGES.INVALID_EMAIL_OR_PASSWORD)
    })

    it('Should login with the valid credentials', async () => {
        await loginPage.typeInEmail(process.env.CORRECT_EMAIL)
        await loginPage.typeInPassword(process.env.CORRECT_PASSWORD)
        await loginPage.login()
        await accountPage.waitForElementsToAppear(accountPage.pageTitle)
        const pageTitleText = await accountPage.pageTitleText
        const currentUrl = await accountPage.getUrl()
        expect(currentUrl).to.equal(PAGE_PATHS.MY_ACCOUNT_FULL)
        pageTitleText.should.equal(TITLES.MY_ACCOUNT)
    })

    it('Should reveal the password when click the "Eye" icon', async () => {
        await loginPage.typeInPassword(DUMMY_CREDENTIALS.PASSWORD)
        let inputType = await loginPage.emailFieldType
        expect(inputType).to.equal(TYPES.PASSWORD)
        await loginPage.unmaskPassword()
        inputType = await loginPage.emailFieldType
        assert.strictEqual(inputType, TYPES.TEXT)
    })

    it('Should show the error message when restoring the password without the email', async () => {
        await loginPage.goToForgotPasswordPage()
        await forgotPasswordPage.waitForElementsToAppear(forgotPasswordPage.setNewPasswordBtn)
        await forgotPasswordPage.submitNewPassword()
        await forgotPasswordPage.waitForElementsToAppear(forgotPasswordPage.errorBox)
        const errorText = await forgotPasswordPage.getErrorText(forgotPasswordPage.errorBox)
        assert.strictEqual(errorText, ERROR_MESSAGES.EMAIL_REQUIRED)
    })
})  